// DATA CONTROLLER
const dataController = (function () {
    class Item {
        constructor(id, name) {
            this.id = id;
            this.name = name;

            this.status = false;
            this.progress = 0;
            this.subItems = [];
            this.comment = '';
        }

        complete() {
            this.status = true;
        }

        calcProgress() {
            if (this.status) {
                this.progress = 100;
            }
            else {
                /// 
            }
        }
    }

    let items = [];

    const findItemByID = function (id) {
        function findItemByIDIn(id, list) {
            let target = null;

            for (let el of list) {
                if (el.id === id) return el;

                if (el.subItems.length) {
                    target = findItemByIDIn(id, el.subItems);
                    if (target) return target;
                }
            }
            return null;
        }

        return findItemByIDIn(id, items);
    };

    const findSiblingItem = function (id) {

        function findSiblings(id, list) {
            let target = null;

            for (let el of list) {
                if (el.id === id) return list;

                if (el.subItems.length) {
                    target = findSiblings(id, el.subItems);
                    if (target) return target;
                }
            }
            return null;
        }

        const siblings = findSiblings(id, items);
        if (siblings && siblings.length > 1) {
            const itemIndex = siblings.findIndex(el => el.id === id);
            if (siblings[itemIndex + 1]) return siblings[itemIndex + 1];
            if (siblings[itemIndex - 1]) return siblings[itemIndex - 1];
        }
        return null;
    }

    const renderID = function () {
        if (!items.length) return 0;

        let maxId = 0;

        const findMaxID = items => {
            items.forEach(el => {
                if (maxId < el.id) maxId = el.id;

                if (el.subItems.length) findMaxID(el.subItems);
            });
        }

        findMaxID(items);
        return maxId + 1;
    }


    return {
        addItem: function (name, parent) {
            const id = renderID();
            const newItem = new Item(id, name);

            if (!isNaN(parent))
                findItemByID(parent).subItems.push(newItem);
            else
                items.push(newItem);

            return newItem;
        },

        deleteItem: function (id) {
            items.splice(items.indexOf(findItemByID(id)), 1);
        },

        completeItem: function (id) {
            findItemByID(id).complete();
        },

        calcItemProgress: function (id) {
            findItemByID(id).calcProgress();
        },

        getItemByID: function (id) {
            return findItemByID(id);
        },

        getItemProgress: function (id) {
            return findItemByID(id).progress;
        },

        getNextItem: function (id) {
            return findSiblingItem(id).id;
        },

        setComment: function (id, comment) {
            findItemByID(id).comment = comment;
        },

        test: function () {
            const item1 = new Item(1, 'g1');
            const item2 = new Item(2, 'g2');
            const item3 = new Item(3, 'g3');
            items = [item1, item2, item3];

            const subItem1 = new Item(4, 'sub1');
            const subItem2 = new Item(5, 'sub2');
            const subItem3 = new Item(6, 'sub3');

            const subItem4 = new Item(7, 'subsub1');
            const subItem5 = new Item(8, 'subsub2');
            const subItem6 = new Item(9, 'subsub3');

            item1.subItems.push(subItem1);
            item2.subItems.push(subItem2);
            item2.subItems.push(subItem3);

            subItem3.subItems.push(subItem4);
            subItem3.subItems.push(subItem5);
            subItem3.subItems.push(subItem6);

            console.log(items);
            var item = findItemByID(8);
            return item.name;

        },
        test2: function () {
            return items;
        }
    };

})();



// UI CONTROLLER
const UIController = (function () {
    const DOMStrings = {
        // ----ITEM properties----
        itemProgress: '.item__progress',
        itemComment: '.comment__text',
        itemStateActive: '.item--active',
        itemContextMenu: '.more-options__menu',

        // ----LEFT----
        btnAdd: '.add__btn',
        btnAddGoal: '.add-goal__btn',
        inputNewGoalName: '.add__goal',
        goalsList: '.goal-list',

        // ----RIGHT----
        // header
        headerName: '.active-item__name',
        headerProgress: '.active-item__progress',

        // subgoals
        btnAddSubgoal: '.add-subgoal__btn',
        inputNewSubgoalName: '.add__subgoal',
        subgoalList: '.subgoal-list',


        //----Names of classes----
        // item
        _itemName: 'item__name',
        _itemStatusActive: 'item--active',
        _itemStatusCompleted: 'item--completed',
        _itemProgress: 'item__progress',

        // context menu
        _btnMoreOptions: 'more-options__btn',
        _contextMenuStatusOpen: 'menu--active',
        _btnDeleteItem: 'menu__delete',
        _btnEditItem: 'menu__edit'
    };

    const getItemTemplete = function (id, name) {
        return `<div class="item" id="${id}">`
            + `<input type="checkbox" class="item__status--checkbox" id="status-${id}">`
            + `<label for="status-${id}" class="item__status--label">`
            + `<i class="icon ion-checkmark"></i>`
            + `</label>`
            + `<input type="text" class="item__name" readonly value="${name}">`
            + `<div class="item__progress">---</div>`
            + `<button class="more-options__btn"></button>`
            + `<div class="more-options__menu">`
            + `<ul class="menu">`
            + `   <li class="menu__item  menu__edit">`
            + `       <i class="icon ion-edit"></i>Edit`
            + `   </li>`
            + `   <li class="menu__item  menu__delete">`
            + `       <i class="icon ion-trash-b"></i>Delete`
            + `   </li>`
            + `</ul>`
            + `</div>`
            + `</div>`;
    }

    return {
        getDOMStrings: function () {
            return DOMStrings;
        },

        getNewGoalName: function () {
            return document.querySelector(DOMStrings.inputNewGoalName).value;
        },

        getNewSubgoalName: function () {
            return document.querySelector(DOMStrings.inputNewSubgoalName).value;
        },

        clearFields: function () {
            document.querySelector(DOMStrings.inputNewGoalName).value = '';
            document.querySelector(DOMStrings.inputNewSubgoalName).value = '';
        },

        addNewGoal: function (id, name) {
            document.querySelector(DOMStrings.goalsList)
                .insertAdjacentHTML('beforeend', getItemTemplete(id, name));
        },

        addNewSubgoal: function (id, name) {
            document.querySelector(DOMStrings.subgoalList)
                .insertAdjacentHTML('beforeend', getItemTemplete(id, name));
        },

        deleteItem: function (id) {
            const item = document.getElementById(id);
            item.parentNode.removeChild(item);
        },

        updateItemProgress: function (id, progress) {
            document.getElementById(id)
                .childNodes
                .forEach(element => {
                    if (element.className === DOMStrings._itemProgress)
                        element.textContent = `${progress}%`;
                });
        },

        completeItem: function (item) {
            item.classList.add(DOMStrings.itemCompleted_);
        },

        // 1. Add new goal
        // 2. Change active item
        updateHeader: function (name, progress = 0) {
            document.querySelector(DOMStrings.headerName).textContent = name;
            document.querySelector(DOMStrings.headerProgress).value = progress;
        },

        // 1. Add new goal
        // 2. Change active item

        // 2. ?? (Add new subgoal
        updateSubgoalsList: function (list = []) {
            let html = '';

            list.forEach(item => html += getItemTemplete(item.id, item.name));

            document.querySelector(DOMStrings.subgoalList)
                .innerHTML = html;
        },

        updateComment: function (comment = '') {
            document.querySelector(DOMStrings.itemComment).value = comment;
        },

        getActiveItemID: function () {
            const activeItem = document.querySelector(DOMStrings.itemStateActive);
            if (activeItem) return parseInt(activeItem.id);

            return null;
        },

        changeActiveItem: function (activeItemID) {
            const previousItemID = this.getActiveItemID();

            if (previousItemID != null) {
                document.getElementById(previousItemID)
                    .classList
                    .remove(DOMStrings._itemStatusActive);
            }

            document.getElementById(activeItemID).classList.add(DOMStrings._itemStatusActive);
        },

        setActiveGoal: function (id) {
            if (document.querySelector('.item-goal--active'))
                document.querySelector('.item-goal--active').classList.remove('item-goal--active');
            document.getElementById(id).classList.add('item-goal--active');
        },

        toggleContextMenu: function (item) {
            item.querySelector(DOMStrings.itemContextMenu).classList.toggle(DOMStrings._contextMenuStatusOpen);
        }
    };

})();



// GLOBAL APP CONTROLLER
const controller = (function (dataCtrl, UICtrl) {

    const setUpEventListeners = function () {
        const DOM = UICtrl.getDOMStrings();

        // ---- Press ENTER ----
        document.addEventListener('keypress', event => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrAddGoal();
                ctrAddSubgoal();
            }
        });

        // ---- Click on btn <Add new goal>  ----
        document.querySelector(DOM.btnAddGoal).addEventListener('click', ctrAddGoal);

        // ---- Click on btn <Add new subgoal>  ----
        document.querySelector(DOM.btnAddSubgoal).addEventListener('click', ctrAddSubgoal);

        document.querySelector(DOM.goalsList).addEventListener('click', event => {
            // ---- Click on <Complete goal>  ----
            if (event.target.type === 'checkbox') ctrCompleteGoal(event.target.parentNode);

            // ---- Click on <another goal>  ----
            if (event.target.className.includes(DOM._itemName))
                showItem(parseInt(event.target.parentNode.id));

            itemListListener(event.target);
        });

        document.querySelector(DOM.subgoalList).addEventListener('click', event => {
            itemListListener(event.target);

            // ---- Click on <another subgoal>  ----
            if (event.target.className.includes(DOM._itemName))
                updateRightPanel(parseInt(target.parentNode.id));
        });

        // COMMENT
        document.querySelector(DOM.itemComment).addEventListener('change', event => {
            ctrUpdateComment(event.target.value);
        });

        itemListListener = function (target) {
            // CONTEXT MENU
            if (target.className.includes(DOM._btnMoreOptions))
                ctrTaggleContextMenu(event.target.parentNode);

            // DELETE item
            if (target.className.includes(DOM._btnDeleteItem))
                ctrDeleteItem(target.parentNode.parentNode.parentNode);

            // EDIT item
            if (target.className.includes(DOM._btnEditItem))
                ctrEditItem(target.parentNode.parentNode.parentNode);
        }

    };

    const ctrAddGoal = function () {
        // UI: Get goal name
        const name = UIController.getNewGoalName();

        if (name) {
            // Data: Add new item
            const item = dataCtrl.addItem(name);

            // UI: Goal list - add new item
            UICtrl.addNewGoal(item.id, name);

            // Change active item
            showItem(item.id);

            // UI: Clear field
            UICtrl.clearFields();
        }
    };

    const ctrAddSubgoal = function () {
        // UI: Get subgoal name
        const name = UIController.getNewSubgoalName();

        // UI: Get active item
        const parentID = UIController.getActiveItemID();

        if (name) {
            // Data: add item
            const item = dataCtrl.addItem(name, parentID);

            // UI: Subgoal list - add new item
            UICtrl.addNewSubgoal(item.id, name);
            UICtrl.clearFields();
        }
    }

    const ctrDeleteItem = function (item) {
        const id = parseInt(item.id);
        const activeItem = dataCtrl.getNextItem(id);

        // Data: delete item
        dataCtrl.deleteItem(id);

        // UI: delete item
        UICtrl.deleteItem(id);

        // change active item
        if (!isNaN(activeItem)) updateRightPanel(activeItem);
    };

    const ctrEditItem = function (item) {
        //
    }

    const ctrCompleteGoal = function (item) {
        const id = parseInt(item.id);

        // Data: complete item
        dataCtrl.completeItem(id);

        // Data: update item progress
        dataCtrl.calcItemProgress(id);
        const progress = dataCtrl.getItemProgress(id);

        // UI: update progress
        UICtrl.updateItemProgress(id, progress);

        // UI: update item's visible 
        UICtrl.completeItem(item);
    }

    const ctrUpdateComment = function (comment) {
        dataCtrl.setComment(UIController.getActiveItemID(), comment);
    }

    const ctrTaggleContextMenu = function (item) {
        UICtrl.toggleContextMenu(item);
    }


    const showItem = function (id) {
        // set Active Goal
        UICtrl.setActiveGoal(id);

        updateRightPanel(id);
    }

    const updateRightPanel = function (id) {
        // Data get item 
        const item = dataController.getItemByID(id);

        // UI: Change active item
        UICtrl.changeActiveItem(id);

        // UI: Header - update name, progress
        UICtrl.updateHeader(item.name, item.progress);

        // UI: Subgoal list - update
        UICtrl.updateSubgoalsList(item.subItems);

        // UI: Comment - update
        UICtrl.updateComment(item.comment);
    }

    return {
        init: function () {
            setUpEventListeners();
        }
    };
})(dataController, UIController);

controller.init();