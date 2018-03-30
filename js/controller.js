import DataController from './data-controller';
import UIController from './UI-controller';


// ----- LISTENERS ----- //
(function () {
    const DOM = UIController.getDOMStrings();

    const itemListListener = function ({className, parentNode: parent}) {
        // CONTEXT MENU
        if (className.includes(DOM._btnMoreOptions))
            ctrTaggleContextMenu(parent);

        // EDIT item
        if (className.includes(DOM._btnEditItem))
            ctrEditItem(parent.parentNode.parentNode);
    }

    // ---- Press ENTER ----
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrAddGoal();
            ctrAddSubgoal();
        }
        console.log(DataController.test());
    });

    // ---- Click on btn <Add new goal>  ----
    document.querySelector(DOM.btnAddGoal).addEventListener('click', ctrAddGoal);

    // ---- Click on btn <Add new subgoal>  ----
    document.querySelector(DOM.btnAddSubgoal).addEventListener('click', ctrAddSubgoal);

    document.querySelector(DOM.goalsList).addEventListener('click', ({target}) => {
        // ---- Click on <Complete goal>  ----
        if (target.type === 'checkbox') ctrCompleteGoal(target.parentNode);

        // ---- Click on <another goal>  ----
        if (target.className.includes(DOM._itemName))
            showItem(parseInt(target.parentNode.id));

        // DELETE item
        if (target.className.includes(DOM._btnDeleteItem))
            ctrDeleteGoal(target.parentNode.parentNode.parentNode);

        itemListListener(target);
    });

    document.querySelector(DOM.subgoalList).addEventListener('click', ({target}) => {
        itemListListener(event.target);

        // ---- Click on <another subgoal>  ----
        if (target.className.includes(DOM._itemName))
            updateRightPanel(parseInt(target.parentNode.id));

        // DELETE item
        if (target.className.includes(DOM._btnDeleteItem))
            ctrDeleteItem(event.target.parentNode.parentNode.parentNode);
    });

    // COMMENT
    document.querySelector(DOM.itemComment).addEventListener('change', ({target}) => {
        ctrUpdateComment(target.value);
    });

})();

const ctrAddGoal = function () {
    // UI: Get goal name
    const name = UIController.getNewGoalName();

    if (name) {
        // Data: Add new item
        const item = DataController.addItem(name);

        // UI: Goal list - add new item
        UIController.addNewGoal(item.id, name);

        // Change active item
        showItem(item.id);

        // UI: Clear field
        UIController.clearFields();
    }
};

const ctrAddSubgoal = function () {
    // UI: Get subgoal name
    const name = UIController.getNewSubgoalName();

    // UI: Get active item
    const parentID = DataController.getActiveItem();

    if (name) {
        // Data: add item
        const item = DataController.addItem(name, parentID);

        // UI: Subgoal list - add new item
        UIController.addNewSubgoal(item.id, name);
        UIController.clearFields();
    }
}

const ctrDeleteItem = function (item) {
    const id = parseInt(item.id);

    // Data: delete item
    DataController.deleteItem(id);

    // UI: delete item
    UIController.deleteItem(id);
}

const ctrDeleteGoal = function (item) {
    const id = parseInt(item.id);
    const activeItem = DataController.getNextItemID(id);

    ctrDeleteItem(item);

    // change active item
    if (activeItem != null) updateRightPanel(activeItem);
};

const ctrEditItem = function (item) {
    //
}

const ctrCompleteGoal = function (item) {
    const id = parseInt(item.id);

    // Data: complete item
    DataController.completeItem(id);

    // Data: update item progress
    DataController.calcItemProgress(id);
    const progress = DataController.getItemByID(id).progress;

    // UI: update progress
    UIController.updateItemProgress(id, progress);

    // UI: update item's visible 
    UIController.completeItem(item);
}

const ctrUpdateComment = function (comment) {
    DataController.setComment(UIController.getActiveItemID(), comment);
}

const ctrTaggleContextMenu = function (item) {
    UIController.toggleContextMenu(item);
}


const showItem = function (id) {
    // set Active Goal
    UIController.setActiveGoal(id);

    updateRightPanel(id);
}

const updateRightPanel = function (id) {
    // Data get item 
    const item = DataController.getItemByID(id);

    DataController.setActiveItem(id);

    // UI: Change active item
    UIController.changeActiveItem(id);

    // UI: Header - update name, progress
    UIController.updateHeader(item.name, item.progress);

    // UI: Subgoal list - update
    UIController.updateSubgoalsList(item.subItems);

    // UI: Comment - update
    UIController.updateComment(item.comment);
}
