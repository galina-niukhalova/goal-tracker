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
    let item;
    const name = UIController.readInput(type);

    if (name) {

        switch (type) {
            case 'goal':
                // Data controller: add item 
                item = DataController.addItem(name);

                // UI controller: add item
                UIController.addNewItem(item.id, name, type);

                // Set item states
                DataController.setActiveItem(item.id);
                setActiveGoal(item.id);

                setDefaultItemDescriptionSettings();
                updateDescription(item);
                break;

            case 'subgoal':
                // Data controller: add item 
                const parentID = DataController.getActiveItem();
                item = DataController.addItem(name, parentID);

                // UI controller: add item
                UIController.addNewItem(item.id, name, type);

                updateParents(item.id);
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
    const parent = DataController.getItemParent(ID);

    switch (type) {
        case 'goal':
            const activeItem = DataController.getNextItem(ID);
            if (activeItem) {
                DataController.setActiveItem(activeItem.id);
                setActiveGoal(activeItem.id);
                updateDescription(activeItem);
            }
            else {
                ctrInit();
            }
            break;
    }

    DataController.deleteItem(ID);
    UIController.deleteItem(ID);

    if(parent) {
        DataController.calcItemProgress(parent.id);
        DataController.calcItemStatus(parent.id);

        updateParents(parent.id);
    }

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
const ctrCompleteItem = (item) => {
    let id = parseInt(item.id);

    // Data: update status, progress
    DataController.completeItem(id);
    DataController.calcItemProgress(id);

    // UI: update progress
    UIController.updateItemProgress(DataController.getItemByID(id));
    UIController.completeItem(id);

    const parent = DataController.getItemParent(id);
    if (parent) {
        DataController.calcItemProgress(parent.id);
        if (parent.progress === 100) ctrCompleteItem(parent);
    }

    updateDescriptionHeader();
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
    const activeGoal = DataController.getActiveGoal();
    const activeItem = DataController.getItemParent(DataController.getActiveItem());

    DataController.setActiveItem(activeItem.id);
    updateDescription(activeItem);

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

    DataController.setActiveItem(ID);
    updateDescription(item);
};

/**
 *  Update Description Header
 */
const updateDescriptionHeader = () => {
    const item = DataController.getItemByID(DataController.getActiveItem());
    const name = DataController.getBreadCrumbs(item.id);
    const progress = item.progress;

    UIController.updateHeader(name, progress);
}

/**
 *  Update Description
 */
const updateDescription = ({ subItems, comment }) => {
    updateDescriptionHeader();
    UIController.updateSubgoalsList(subItems);
    UIController.updateComment(comment);
}

/**
 *  Change states
 */
const setActiveGoal = id => {
    DataController.setActiveGoal(id);
    UIController.changeActiveGoal(id);
};

const updateParents = id => {
    const activeGoal = DataController.getItemByID(DataController.getActiveGoal());

    // Calc all parents status
    DataController.calcParentsProgress(id);

    // Update Active Goal UI
    if(activeGoal.status) UIController.completeItem(activeGoal.id);

    // Update Header
    updateDescriptionHeader();
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
            if (item) ctrEditItemComplete(item);
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
            if (checkboxStatus) ctrCompleteItem(item);
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