import DOMStrings from './dom-strings';
import { getItemTemplete } from './html-templetes';

const getDOMStrings = () => {
    return DOMStrings;
};

const getNewGoalName = () => {
    return document.querySelector(DOMStrings.inputNewGoalName).value;
};

const getNewSubgoalName = () => {
    return document.querySelector(DOMStrings.inputNewSubgoalName).value;
};

const clearFields = () => {
    document.querySelector(DOMStrings.inputNewGoalName).value = '';
    document.querySelector(DOMStrings.inputNewSubgoalName).value = '';
};

const addNewGoal = (id, name) => {
    document.querySelector(DOMStrings.goalsList)
        .insertAdjacentHTML('beforeend', getItemTemplete(id, name));
};

const addNewSubgoal = (id, name) => {
    document.querySelector(DOMStrings.subgoalList)
        .insertAdjacentHTML('beforeend', getItemTemplete(id, name));
};

const deleteItem = (id) => {
    const item = document.getElementById(id);
    item.parentNode.removeChild(item);
};

const updateItemProgress = (id, progress) => {
    document.getElementById(id)
        .childNodes
        .forEach(element => {
            if (element.className === DOMStrings._itemProgress)
                element.textContent = `${progress}%`;
        });
};

const completeItem = (item) => {
    item.classList.add(DOMStrings._itemStatusCompleted);
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

    list.forEach(item => html += getItemTemplete(item.id, item.name));

    document.querySelector(DOMStrings.subgoalList)
        .innerHTML = html;
};

const updateComment = (comment = '') => {
    document.querySelector(DOMStrings.itemComment).value = comment;
};

const getActiveItemID = () => {
    const activeItem = document.querySelector(DOMStrings.itemStateActive);
    if (activeItem) return parseInt(activeItem.id);

    return null;
};

const changeActiveItem = (activeItemID) => {
    const previousItemID = getActiveItemID();

    if (previousItemID != null) {
        document.getElementById(previousItemID)
            .classList
            .remove(DOMStrings._itemStatusActive);
    }

    document.getElementById(activeItemID).classList.add(DOMStrings._itemStatusActive);
};

const setActiveGoal = (id) => {
    if (document.querySelector('.item-goal--active'))
        document.querySelector('.item-goal--active').classList.remove('item-goal--active');
    document.getElementById(id).classList.add('item-goal--active');
};

const toggleContextMenu = (item) => {
    item.querySelector(DOMStrings.itemContextMenu).classList.toggle(DOMStrings._contextMenuStatusOpen);
};


export default {
    getDOMStrings,
    getNewGoalName,
    getNewSubgoalName,
    clearFields,
    addNewGoal,
    addNewSubgoal,
    deleteItem,
    updateItemProgress,
    completeItem,
    updateHeader,
    updateSubgoalsList,
    updateComment,
    getActiveItemID,
    changeActiveItem,
    setActiveGoal,
    toggleContextMenu
}
