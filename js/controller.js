import DataController from './data-controller';
import UIController from './UI-controller';


(function () {
    console.log('set up...');
    const DOM = UIController.getDOMStrings();

    const itemListListener = function (target) {
        // CONTEXT MENU
        if (target.className.includes(DOM._btnMoreOptions))
            ctrTaggleContextMenu(event.target.parentNode);

        // EDIT item
        if (target.className.includes(DOM._btnEditItem))
            ctrEditItem(target.parentNode.parentNode.parentNode);
    }

    // ---- Press ENTER ----
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrAddGoal();
            ctrAddSubgoal();
        }
        // console.log(DataController.test2());
    });

    // ---- Click on btn <Add new goal>  ----
    document.querySelector(DOM.btnAddGoal).addEventListener('click', ctrAddGoal);

    // ---- Click on btn <Add new subgoal>  ----
    document.querySelector(DOM.btnAddSubgoal).addEventListener('click', ctrAddSubgoal);

    document.querySelector(DOM.goalsList).addEventListener('click', event => {
        const target = event.target;
        const className = target.className;

        // ---- Click on <Complete goal>  ----
        if (target.type === 'checkbox') ctrCompleteGoal(target.parentNode);

        // ---- Click on <another goal>  ----
        if (className.includes(DOM._itemName))
            showItem(parseInt(target.parentNode.id));

        // DELETE item
        if (className.includes(DOM._btnDeleteItem))
            ctrDeleteGoal(target.parentNode.parentNode.parentNode);

        itemListListener(target);
    });

    document.querySelector(DOM.subgoalList).addEventListener('click', event => {
        const target = event.target;
        const className = target.className;

        itemListListener(event.target);

        // ---- Click on <another subgoal>  ----
        if (className.includes(DOM._itemName))
            updateRightPanel(parseInt(target.parentNode.id));

        // DELETE item
        if (className.includes(DOM._btnDeleteItem))
            ctrDeleteItem(event.target.parentNode.parentNode.parentNode);
    });

    // COMMENT
    document.querySelector(DOM.itemComment).addEventListener('change', event => {
        ctrUpdateComment(event.target.value);
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
    const parentID = UIController.getActiveItemID();

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
    const activeItem = DataController.getNextItem(id);

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
    const progress = DataController.getItemProgress(id);

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

    // UI: Change active item
    UIController.changeActiveItem(id);

    // UI: Header - update name, progress
    UIController.updateHeader(item.name, item.progress);

    // UI: Subgoal list - update
    UIController.updateSubgoalsList(item.subItems);

    // UI: Comment - update
    UIController.updateComment(item.comment);
}
