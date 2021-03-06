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
const setDefaultDescriptionProps = () => {
    UIController.activeAddSubgoalBlock(true);
    UIController.hideUpButton();
};

/**
 *  Add a new ITEM
 */
const ctrAddItem = type => {
    let item;
    const name = UIController.readInput(type);

    if (name) {

        // Data controller: add item 
        type === 'goal' ? item = DataController.addItem(name)
            : item = DataController.addItem(name, DataController.getActiveItem());

        // UI controller: add item
        UIController.addNewItem(item.id, name, type);

        switch (type) {
            case 'goal':
                // Set item states
                setActiveItem(item);
                setActiveGoal(item.id);
                setDefaultDescriptionProps();
                break;

            case 'subgoal':
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
const ctrDeleteItem = (id, type) => {
    const parent = DataController.getItemParent(id);

    switch (type) {
        case 'goal':
            const activeItem = DataController.getNextItem(id);
            if (activeItem) {
                setActiveItem(activeItem);
                setActiveGoal(activeItem.id);
            }
            else {
                ctrInit();
            }
            break;
    }

    DataController.deleteItem(id);
    UIController.deleteItem(id);

    if (parent) {
        parent.calcProgress();
        parent.calcStatus();

        updateParents(parent.id);
    }
};

/**
 *  Edit ITEM
 */
const ctrEditItem = item => {
    UIController.activeChangeName(item, true);
    UIController.closeContextMenu(item);
};

const ctrEditItemComplete = itemDOM => {
    const ID = parseInt(itemDOM.id);

    const name = UIController.getItemName(ID);
    const item = DataController.getItemByID(ID);
    item.name = name;

    UIController.activeChangeName(itemDOM, false);

    if (ID === DataController.getActiveItem())
        UIController.updateHeader(name, item.progress)
};

/**
 *  Complete ITEM
 */
const ctrCompleteItem = id => {
    const item = DataController.getItemByID(id);

    // Data: update status, progress
    item.complete();
    updateParents(item.id);
    updateSubs(item.id);

    // calc item progress
    item.calcProgress();

    // UI: update progress
    UIController.updateItemProgress(item);
    UIController.completeItem(item.id);
    updateDescriptionHeader();
};

/**
 *  Uncomplete ITEM
 */
const ctrUncompleteItem = item => {
    item = DataController.getItemByID(item.id);

    if (DataController.getItemByID(item.id).subItems.length > 0) {
        UIController.openAlertWindow('Uncomplete');
    }
    else {
        item.uncomplete();
        item.calcProgress();

        UIController.uncompleteItem(item.id);

        updateParents(item.id);
    }

    UIController.closeContextMenu();
};

/**
 *  Add a COMMENT
 */
const ctrUpdateComment = comment => {
    DataController.setComment(DataController.getActiveItem(), comment);
};


/**
 *  Open or Close a CONTEXT MENU
 */
const ctrToggleContextMenu = item => {
    UIController.toggleContextMenu(DataController.getItemByID(item.id));
};


/**
 * Come back to a parent (Go up BTN)
 */
const ctrGoUp = () => {
    const activeGoal = DataController.getActiveGoal();
    const activeItem = DataController.getItemParent(DataController.getActiveItem());

    if(activeItem) {
        setActiveItem(activeItem);
        if (activeGoal === activeItem.id) {
            UIController.hideUpButton();
        }
    }
    else {
        activeGoalContainer();
    }
};

/**
 *  View item description
 */
const ctrClickOn = (item, block) => {
    item = DataController.getItemByID(item.id);

    switch (block) {
        case 'goal':
            setActiveGoal(item.id);
            UIController.hideUpButton();
            activeSubgoalContainer();
            break;
        case 'subgoal':
            UIController.showUpButton();
            break;
    }

    setActiveItem(item);
};

const activeSubgoalContainer = () => {
    elements.goalContainer.classList.remove(elementStrings.visibleContainer);
    elements.goalContainer.classList.add(elementStrings.hiddenContainer);
    
    elements.subgoalContainer.classList.add(elementStrings.visibleContainer);
    elements.subgoalContainer.classList.remove(elementStrings.hiddenContainer);
};

const activeGoalContainer = () => {
    elements.goalContainer.classList.add(elementStrings.visibleContainer);
    elements.goalContainer.classList.remove(elementStrings.hiddenContainer);
    
    elements.subgoalContainer.classList.remove(elementStrings.visibleContainer);
    elements.subgoalContainer.classList.add(elementStrings.hiddenContainer);
};

/**
 *  Update Description Header
 */
const updateDescriptionHeader = () => {
    const item = DataController.getItemByID(DataController.getActiveItem());
    const name = DataController.getBreadCrumbs(item.id);
    const progress = item.progress;

    UIController.updateHeader(name, progress);
};

/**
 *  Update Description
 */
const updateDescription = ({ subItems, comment }) => {
    updateDescriptionHeader();
    UIController.updateSubgoalsList(subItems);
    UIController.updateComment(comment);
};

/**
 *  Change states
 */
const setActiveGoal = id => {
    DataController.setActiveGoal(id);
    UIController.changeActiveGoal(id);
};

const setActiveItem = item => {
    DataController.setActiveItem(item.id);
    updateDescription(item);
};

const updateParents = id => {
    const activeGoal = DataController.getItemByID(DataController.getActiveGoal());

    // Calc all parents status
    DataController.calcParentsProgress(id);

    // Update Active Goal UI
    if (activeGoal.status) {
        UIController.completeItem(activeGoal.id);
    }
    else {
        UIController.updateItemProgress(activeGoal);
        UIController.uncompleteItem(activeGoal.id, activeGoal.progress);
    }

    // Update Header
    updateDescriptionHeader();
};

const updateSubs = id => {
    DataController.completeSubs(id);

    DataController.getItemByID(DataController.getActiveItem()).subItems.forEach(sub => {
        UIController.updateItemProgress(sub);
        if (sub.status) UIController.completeItem(sub.id);
    });
};

const ctrOpenConfirmWindow = (id, action) => {
    const item = DataController.getItemByID(id);
    if (action === 'Complete' && item.subItems.length === 0) {
        ctrCompleteItem(id);
        return;
    }

    UIController.openConfirmWindow(id, action);
    if (action === 'Delete') UIController.closeContextMenu();
};

const ctrConfirm = (id, action) => {
    switch (action) {
        case 'Delete':
            ctrDeleteItem(id, DataController.getItemParent(id) ? 'subgoal' : 'goal');
            break;

        case 'Complete':
            ctrCompleteItem(id);
            break;
    }

    UIController.closeModalWindow();
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

    document.addEventListener('click', ({ target }) => {
        // CONTEXT MENU
        const btnMoreOptions = target.closest(`.${elementStrings.ctxMenuBtn}`);
        if (!btnMoreOptions) UIController.closeContextMenu();

        const bntCancel = target.closest(`.${elementStrings.modalBtnCancel}`);
        if (bntCancel) UIController.closeModalWindow();

        const btnConfirm = target.closest(`.${elementStrings.confirmBtnConfirm}`);
        if (btnConfirm) {
            const box = target.closest(`.${elementStrings.modalBox}`);
            ctrConfirm(box.dataset.item, box.dataset.action);
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
            if (className.includes(elementStrings.itemName))
                ctrClickOn(item, type);

            // EDIT item
            if (className.includes(elementStrings.ctxMenuBtnEdit)) ctrEditItem(item);

            // DELETE item
            if (className.includes(elementStrings.ctxMenuBtnDelete))
                ctrOpenConfirmWindow(item.id, 'Delete');

            // CONTEXT MENU 
            const btnMoreOptions = target.closest(`.${elementStrings.ctxMenuBtn}`);
            if (btnMoreOptions) ctrToggleContextMenu(item);

            // COMPLETE ITEM
            const checkboxStatus = target.closest(`.${elementStrings.itemStatus}`);
            if (checkboxStatus) ctrOpenConfirmWindow(item.id, 'Complete');

            // UNCOMPLETE ITEM
            if (className.includes(elementStrings.ctxMenuBtnUncomplete)) ctrUncompleteItem(item);
        });
    });

    // comment
    elements.itemComment.addEventListener('change', ({ target }) => {
        ctrUpdateComment(target.value);
    });

    // Return to parent item
    elements.btnUp.addEventListener('click', ctrGoUp);
    elements.btnGoBack.addEventListener('click', ctrGoUp);

    ctrInit();

})();