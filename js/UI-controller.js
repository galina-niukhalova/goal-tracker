import { elements, elementStrings } from './dom-strings';
import { renderItem, renderContextMenu } from './html-templetes';

const getNewItemName = (type) => {
    return elements.inputNewItemName(type).value;
};

const getItemName = (id) => {
    return Array.from(document.getElementById(id).childNodes)
        .find(el => el.className === elementStrings.itemName).value;
}

const clearFields = () => {
    elements.inputNewItemName('goal').value = '';
    elements.inputNewItemName('subgoal').value = '';
};

const addNewItem = (id, name, type) => {
    renderItem({ id, name }, elements.itemsList(type));
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
            if (element.className === elementStrings.itemProgress)
                element.textContent = progress;
        });
};

const updateItemStatus = (id, status) => {
    document.getElementById(id)
        .childNodes
        .forEach(element => {
            if (element.className === elementStrings.itemStatus)
                element.checked = status;
        });
}

const completeItem = (id) => {
    document.getElementById(id).classList.add(elementStrings.itemStatusCompleted);
};

const updateHeader = (name, progress = 0) => {
    elements.headerName.textContent = name;
    elements.headerProgress.value = progress;
};

const updateSubgoalsList = (list = []) => {
    elements.itemsList('subgoal').innerHTML = '';
    list.forEach(item => renderItem(item, elements.itemsList('subgoal')));
};

const updateComment = (comment = '') => {
    elements.itemComment.value = comment;
};

const changeActiveGoal = (id) => {
    const previousItem = document.querySelector(`.${elementStrings.stateGoalActive}`);

    if (previousItem) {
        previousItem
            .classList
            .remove(elementStrings.stateGoalActive);
    }

    document.getElementById(id).classList.add(elementStrings.stateGoalActive);
};

const toggleContextMenu = (item) => {
    if(item.querySelector(`.${elementStrings.contextMenu}`)) closeContextMenu();
    else renderContextMenu(item);
};

const closeContextMenu = () => {
    const contextMenu = document.querySelector(`.${elementStrings.contextMenu}`);
    contextMenu.parentNode.removeChild(contextMenu);
}

const showUpButton = () => {
    elements.btnUp.classList.add(elementStrings.btnUpActive);
}

const hideUpButton = () => {
    elements.btnUp.classList.remove(elementStrings.btnUpActive);
}

const activeAddSubgoal = (isActive) => {
    elements.inputNewItemName('subgoal').readOnly = !isActive;
}

const activeChangeName = (item, isActive) => {

    const itemName = Array.from(item.childNodes)
        .find(el => el.className === elementStrings.itemName);

    itemName.readOnly = !isActive;

    if (isActive) itemName.focus();
}


export {
    getNewItemName,
    getItemName,
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
    closeContextMenu,
    showUpButton,
    hideUpButton,
    activeAddSubgoal,
    activeChangeName
}
