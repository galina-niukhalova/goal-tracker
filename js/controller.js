import * as DataController from './data-controller';
import * as UIController from './UI-controller';
import { elements, elementStrings } from './dom-strings';

/**
 *  Init
 */
const ctrInit = () => {
    DataController.initData();
    UIController.updateHeader('Welcome');
    UIController.updateSubgoalsList();
    UIController.updateComment();

    // Hide / deactive description properties
    UIController.activeAddSubgoalBlock(false);
    UIController.hideUpButton();
};

/**
 *  Add new subItem: active
 *  BtnUp: hide
 */
const setDefaultItemDescriptionSettings = () => {
    UIController.activeAddSubgoalBlock(true);
    UIController.hideUpButton();
}

/**
 *  Add a new ITEM
 */
const ctrAddItem = (type) => {
    let item, parentID;
    const name = UIController.readInput(type);

    if (name) {
        switch (type) {
            case 'goal':
                // Data controller: add item 
                item = DataController.addItem(name);

                // UI controller: add item
                UIController.addNewItem(item.id, name, type);

                setDefaultItemDescriptionSettings();

                // Set item states
                changeActiveItem(item);
                setActiveGoal(item.id);
                break;

            case 'subgoal':
                parentID = DataController.getActiveItem();
                item = DataController.addItem(name, parentID);
                UIController.addNewItem(item.id, name, type);

                updateParents(item.id);
                let breadCrumbs = DataController.getBreadCrumbs(parentID);
                UIController.updateHeader(breadCrumbs, DataController.getItemByID(parentID).progress);
                break;
        }

        // UI: Clear inputs
        UIController.clearInputs();
    }
};

/**
 *  Delete ITEM
 */
const ctrDeleteItem = (item, type) => {
    const ID = parseInt(item.id);

    switch (type) {
        case 'goal':
            const activeItem = DataController.getNextItem(ID);
            if (activeItem != null) {
                changeActiveItem(activeItem);
                setActiveGoal(activeItem.id);
            }
            else {
                ctrInit();
            }
            break;
    }

    DataController.deleteItem(ID);
    UIController.deleteItem(ID);
};

/**
 *  Edit ITEM
 */
const ctrEditItem = (item) => {
    UIController.activeChangeName(item, true);
    UIController.closeContextMenu(item);
};

const ctrEditItemComplete = (itemDOM) => {
    const ID = parseInt(itemDOM.id);

    const name = UIController.getItemName(ID);
    const item = DataController.getItemByID(ID);
    item.name = name;

    UIController.activeChangeName(itemDOM, false);

    if (ID === DataController.getActiveItem())
        UIController.updateHeader(name, item.progress)
}

/**
 *  Complete ITEM
 */
const ctrCompleteItem = (item, type) => {
    let id = parseInt(item.id);

    // Data: update status, progress
    DataController.completeItem(id);
    DataController.calcItemProgress(id);


    // UI: update progress
    const { name, progress } = DataController.getItemByID(id);
    UIController.updateItemProgress(id, progress);

    //calc Progress of parents, update progress 
    switch (type) {
        case 'subgoal':
            // calc parent progress
            updateParents(id);
            break;
        case 'goal':
            // update Header
            if (DataController.getActiveItem() === id)
                UIController.updateHeader(name, progress);
            break;
    };

    // Update item's visible 
    UIController.completeItem(id);
};

/**
 *  Add a COMMENT
 */
const ctrUpdateComment = (comment) => {
    DataController.setComment(DataController.getActiveItem(), comment);
};


/**
 *  Open or Close a CONTEXT MENU
 */
const ctrToggleContextMenu = (item) => {
    UIController.toggleContextMenu(item);
};


/**
 * Come back to a parent (Go up BTN)
 */
const ctrGoUp = () => {
    let activeItem = DataController.getActiveItem();
    const activeGoal = DataController.getActiveGoal();

    activeItem = DataController.getItemParent(activeItem);
    changeActiveItem(activeItem);

    if (activeGoal === activeItem.id) UIController.hideUpButton();
};

/**
 *  View item description
 */
const ctrClickOn = (item, block) => {
    const ID = parseInt(item.id);
    item = DataController.getItemByID(ID);

    switch (block) {
        case 'goal':
            setActiveGoal(ID);
            UIController.hideUpButton();
            break;
        case 'subgoal':
            UIController.showUpButton();
            break;
    }

    changeActiveItem(item);
};



/**
 *  Change states
 */
const changeActiveItem = ({ id, name, progress, subItems, comment }) => {
    DataController.setActiveItem(id);

    // update description
    UIController.updateHeader(DataController.getBreadCrumbs(id), progress);
    UIController.updateSubgoalsList(subItems);
    UIController.updateComment(comment);
};

const setActiveGoal = id => {
    DataController.setActiveGoal(id);
    UIController.changeActiveGoal(id);
};


/**
 * Update parent's progress
 */
const updateParents = id => {
    const activeGoal = DataController.getActiveGoal();
    let parentID = null, parent;

    // CALC ALL PARENT'S PROGRESS
    while (parentID !== activeGoal) {
        parent = DataController.getItemParent(id);
        parentID = parent.id;
        DataController.calcItemProgress(parentID);
        DataController.calcItemStatus(parentID);
        id = parentID;
    }

    // UPDATE GOAL
    UIController.updateItemProgress(parentID, parent.progress);
    if (parent.progress === 100) UIController.completeItem(parentID);

    // UPDATE HEADER
    const activeItem = DataController.getItemByID(DataController.getActiveItem());
    let breadCrumbs = DataController.getBreadCrumbs(activeItem.id);
    UIController.updateHeader(breadCrumbs, activeItem.progress);

}


/**
 *  Listeners
 */
(function () {
    // Press ENTER 
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 || event.which === 13) {
            ['goal', 'subgoal'].forEach(type => ctrAddItem(type));

            // Save a new item name
            const item = event.target.closest(`.${elementStrings.item}`);
            if (item) ctrEditItemComplete(event.target.parentNode);
        }
    });

    ['goal', 'subgoal'].forEach(type => {
        // Click on btn <Add new ...> 
        elements.btnAddItem(type).addEventListener('click', ctrAddItem.bind(null, type));

        // Click in Item's list area
        elements.itemsList(type).addEventListener('click', ({ target }) => {
            const { className } = target;
            const item = target.closest(`.${elementStrings.item}`);

            // Click on <another item>
            if (className.includes(elementStrings.itemName)) ctrClickOn(item, type);

            // CONTEXT MENU
            const btnMoreOptions = target.closest(`.${elementStrings.itemContextMenu}`);
            if (btnMoreOptions) ctrToggleContextMenu(item);

            // EDIT item
            if (className.includes(elementStrings.ctxMenuBtnEdit)) ctrEditItem(item);

            // DELETE item
            if (className.includes(elementStrings.ctxMenuBtnDelete)) ctrDeleteItem(item, type);

            // COMPLETE ITEM
            const checkboxStatus = target.closest(`.${elementStrings.itemStatus}`);
            if (checkboxStatus) ctrCompleteItem(item, type);
        });
    });

    // comment
    elements.itemComment.addEventListener('change', ({ target }) => {
        ctrUpdateComment(target.value);
    });

    // Return to parent item
    elements.btnUp.addEventListener('click', ctrGoUp);

    ctrInit();

})();