import { elements, elementStrings } from './dom-strings';
import { renderItem, renderContextMenu } from './html-templetes';

/**
 *  Inputs: add new goal, add new subgoal
 */
const readInput = (type) => {
    return elements.inputItemName(type).value;
};

const clearInputs = () => {
    elements.inputItemName('goal').value = '';
    elements.inputItemName('subgoal').value = '';
};

const getItemName = (id) => {
    return Array.from(document.getElementById(id).childNodes)
        .find(el => el.className === elementStrings.itemName).value;
};

const addNewItem = (id, name, type) => {
    renderItem({ id, name }, elements.itemsList(type));
};

const deleteItem = (id) => {
    const item = document.getElementById(id);
    if(item)
        item.parentNode.removeChild(item);
};

const updateItemProgress = ({id, progress}) => {
    if (!progress)
        progress = '---';
    else progress =
        `${progress}%`;

    const item = document.getElementById(id);
    if(item) 
        item
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

const completeItem = id => {
    const item = document.getElementById(id);
    if(item) item.classList.add(elementStrings.itemCompleted);

    updateItemStatus(id, true);
    updateItemProgress({id, progress:100});
};

const uncompleteItem = ( id, progress=0 ) => {
    const item = document.getElementById(id);
    if(item) item.classList.remove(elementStrings.itemCompleted);

    updateItemStatus(id, false);
    updateItemProgress({id, progress});
};

const updateHeader = (name, progress = 0) => {
    elements.breadCrumbs.textContent = name;
    elements.progressBar.value = progress;
};

const updateSubgoalsList = (list = []) => {
    elements.itemsList('subgoal').innerHTML = '';
    list.forEach(item => renderItem(item, elements.itemsList('subgoal')));
};

const updateComment = (comment = '') => {
    elements.itemComment.value = comment;
};

const changeActiveGoal = (id) => {
    const previousItem = document.querySelector(`.${elementStrings.goalActived}`);

    if (previousItem) {
        previousItem
            .classList
            .remove(elementStrings.goalActived);
    }

    document.getElementById(id).classList.add(elementStrings.goalActived);
};

const toggleContextMenu = item => {
    if(document.getElementById(item.id).querySelector(`.${elementStrings.ctxMenu}`)) closeContextMenu();
    else renderContextMenu(item);
};

const closeContextMenu = () => {
    const contextMenu = document.querySelector(`.${elementStrings.ctxMenu}`);
    contextMenu.parentNode.removeChild(contextMenu);
};

const showUpButton = () => {
    elements.btnUp.classList.add(elementStrings.btnUpActived);
};

const hideUpButton = () => {
    elements.btnUp.classList.remove(elementStrings.btnUpActived);
};

const activeAddSubgoalBlock = (isActive) => {
    elements.inputItemName('subgoal').readOnly = !isActive;
};

const activeChangeName = (item, isActive) => {

    const itemName = Array.from(item.childNodes)
        .find(el => el.className === elementStrings.itemName);

    itemName.readOnly = !isActive;

    if (isActive) itemName.focus();
};


export {
    readInput,
    getItemName,
    clearInputs,
    addNewItem,
    deleteItem,
    updateItemProgress,
    completeItem,
    uncompleteItem,
    updateHeader,
    updateSubgoalsList,
    updateComment,
    changeActiveGoal,
    toggleContextMenu,
    closeContextMenu,
    showUpButton,
    hideUpButton,
    activeAddSubgoalBlock,
    activeChangeName
}
