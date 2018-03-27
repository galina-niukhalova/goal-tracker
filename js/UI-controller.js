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

export default {
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
