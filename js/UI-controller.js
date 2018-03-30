import DOMStrings from './dom-strings';
import { getItemTemplete } from './html-templetes';

const getDOMStrings = () => {
    return DOMStrings;
};

const getNewItemName = (type) => {
    return document.querySelector(DOMStrings.inputNewItemName(type)).value;
};

const clearFields = () => {
    document.querySelector(DOMStrings.inputNewItemName('goal')).value = '';
    document.querySelector(DOMStrings.inputNewItemName('subgoal')).value = '';
};

const addNewItem = (id, name, type) => {
    document.querySelector(DOMStrings.itemsList(type))
        .insertAdjacentHTML('beforeend', getItemTemplete({ id, name }));
};

const deleteItem = (id) => {
    const item = document.getElementById(id);
    item.parentNode.removeChild(item);
};

const updateItemProgress = (id, progress) => {
    if (!progress)
        progress = '---';
    else progress =
        `${progress}%`;

    document.getElementById(id)
        .childNodes
        .forEach(element => {
            if (element.className === DOMStrings._itemProgress)
                element.textContent = progress;
        });
};

const updateItemStatus = (id, status) => {
    document.getElementById(id)
        .childNodes
        .forEach(element => {
            if (element.className === DOMStrings._itemStatus)
                element.checked = status;
        });
}

const completeItem = (id) => {
    document.getElementById(id).classList.add(DOMStrings._itemStatusCompleted);
};

// 1. Add new goal
// 2. Change active item
const updateHeader = (name, progress = 0) => {
    document.querySelector(DOMStrings.headerName).textContent = name;
    document.querySelector(DOMStrings.headerProgress).value = progress;
};

// 1. Add new goal
// 2. Change active item

// 2. ?? (Add new subgoal
const updateSubgoalsList = (list = []) => {
    let html = '';

    list.forEach(item => html += getItemTemplete(item));

    document.querySelector(DOMStrings.itemsList('subgoal'))
        .innerHTML = html;
};

const updateComment = (comment = '') => {
    document.querySelector(DOMStrings.itemComment).value = comment;
};

const changeActiveGoal = (id) => {
    const previousItem = document.querySelector(DOMStrings.stateGoalActive);

    if (previousItem) {
        previousItem
            .classList
            .remove(DOMStrings._stateGoalActive);
    }

    document.getElementById(id).classList.add(DOMStrings._stateGoalActive);
};

const toggleContextMenu = (item) => {
    item.querySelector(DOMStrings.itemContextMenu).classList.toggle(DOMStrings._contextMenuStatusOpen);
};

const showUpButton = () => {
    document.querySelector(DOMStrings.btnUp).classList.add(DOMStrings._btnUpActive);
}

const hideUpButton = () => {
    document.querySelector(DOMStrings.btnUp).classList.remove(DOMStrings._btnUpActive);
}


export default {
    getDOMStrings,
    getNewItemName,
    clearFields,
    addNewItem,
    deleteItem,
    updateItemProgress,
    updateItemStatus,
    completeItem,
    updateHeader,
    updateSubgoalsList,
    updateComment,
    changeActiveGoal,
    toggleContextMenu,
    showUpButton,
    hideUpButton
}
