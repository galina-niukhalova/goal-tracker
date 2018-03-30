import DataController from './data-controller';
import UIController from './UI-controller';


const ctrAddItem = (type) => {
    let item, parentID;
    const name = UIController.getNewItemName(type);

    if (name) {
        switch (type) {
            case 'goal':
                item = DataController.addItem(name);
                UIController.addNewItem(item.id, name, type);
                ctrChangeActiveItem(item);
                ctrSetActiveGoal(item.id);
                UIController.activeAddSubgoal(true);
                break;

            case 'subgoal':
                parentID = DataController.getActiveItem();
                item = DataController.addItem(name, parentID);
                UIController.addNewItem(item.id, name, type);

                ctrUpdateParents(item.id);
                let breadCrumbs = DataController.getBreadCrumbs(parentID);
                UIController.updateHeader(breadCrumbs, DataController.getItemByID(parentID).progress);
                break;
        }

        // UI: Clear field
        UIController.clearFields();
    }
};

const ctrGoUp = () => {
    let activeItem = DataController.getActiveItem();
    const activeGoal = DataController.getActiveGoal();

    activeItem = DataController.getItemParent(activeItem);
    ctrChangeActiveItem(activeItem);

    if (activeGoal === activeItem.id) UIController.hideUpButton();
};

const ctrInit = () => {
    UIController.updateHeader('Welcome');
    UIController.updateSubgoalsList();
    UIController.updateComment();

    // Add subgoal = Read Only
    UIController.activeAddSubgoal(false);
};

// ----- LISTENERS ----- //
(function () {
    const DOM = UIController.getDOMStrings();

    // ---- Press ENTER ----
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrAddItem('goal');
            ctrAddItem('subgoal');

            if(event.target.className.includes(DOM._itemName)) ctrSaveItem(event.target.parentNode);
        }
        // console.log(DataController.test());
    });

    const setListeners = type => {
        // ---- Click on btn <Add new ...>  ----
        document.querySelector(DOM.btnAddItem(type))
            .addEventListener('click', ctrAddItem.bind(null, type));


        document.querySelector(DOM.itemsList(type)).addEventListener('click', ({ target }) => {
            const { className, parentNode: parent } = target;

            // ---- Click on <another item>  ----
            if (className.includes(DOM._itemName))
                ctrClickOn(type, parent);

            // CONTEXT MENU
            if (className.includes(DOM._btnMoreOptions))
                ctrTaggleContextMenu(parent);

            // EDIT item
            if (className.includes(DOM._btnEditItem))
                ctrEditItem(parent.parentNode.parentNode);

            // DELETE item
            if (className.includes(DOM._btnDeleteItem))
                ctrDeleteItem(parent.parentNode.parentNode, type);

            // COMPLETE ITEM
            if (target.type === 'checkbox')
                ctrCompleteItem(target.parentNode, type);
        });

    };

    // COMMENT
    document.querySelector(DOM.itemComment).addEventListener('change', ({ target }) => {
        ctrUpdateComment(target.value);
    });

    document.querySelector(DOM.btnUp).addEventListener('click', ctrGoUp);

    setListeners('goal');
    setListeners('subgoal');
    ctrInit();

})();

const ctrChangeActiveItem = ({ id, name, progress, subItems, comment }) => {
    DataController.setActiveItem(id);

    name = DataController.getBreadCrumbs(id);
    UIController.updateHeader(name, progress);
    UIController.updateSubgoalsList(subItems);
    UIController.updateComment(comment);
};

const ctrSetActiveGoal = id => {
    DataController.setActiveGoal(id);
    UIController.changeActiveGoal(id);
};

const ctrClickOn = (block, itemDOM) => {
    const ID = parseInt(itemDOM.id);
    const item = DataController.getItemByID(ID);

    switch (block) {
        case 'goal':
            ctrSetActiveGoal(ID);
            break;
        case 'subgoal':
            UIController.showUpButton();
            break;
    }

    ctrChangeActiveItem(item);
};

const ctrDeleteItem = (item, type) => {
    const ID = parseInt(item.id);

    switch (type) {
        case 'goal':
            const activeItem = DataController.getNextItem(ID);
            if (activeItem != null) {
                ctrChangeActiveItem(activeItem);
                ctrSetActiveGoal(activeItem.id);
            }
            else {
                ctrInit();
            }
            break;
    }

    DataController.deleteItem(ID);
    UIController.deleteItem(ID);
};

const ctrEditItem = (item) => {
    UIController.activeChangeName(item, true);
    UIController.toggleContextMenu(item);
};

const ctrSaveItem = (itemDOM) => {
    const ID = parseInt(itemDOM.id);

    const name = UIController.getItemName(ID);
    const item = DataController.getItemByID(ID);
    item.name = name;

    UIController.activeChangeName(itemDOM, false);

    if(ID === DataController.getActiveItem())
        UIController.updateHeader(name, item.progress)
}

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
            ctrUpdateParents(id);
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

const ctrUpdateParents = id => {
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
    UIController.updateHeader(activeItem.name, activeItem.progress);

}

const ctrUpdateComment = (comment) => {
    DataController.setComment(DataController.getActiveItem(), comment);
};

const ctrTaggleContextMenu = (item) => {
    UIController.toggleContextMenu(item);
};

