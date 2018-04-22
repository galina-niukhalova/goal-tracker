import { elementStrings } from './dom-strings';

export const renderItem = ({ id, name, progress, status }, parent) => {
    progress ? progress = `${progress}%` 
             : progress = '---';

    let classItem;
    status ? classItem = `${elementStrings.item} ${elementStrings.itemCompleted}` 
           : classItem = `${elementStrings.item}`;

    const newItem = `<div class="${classItem}" id=${id}>
                <input type="checkbox" class="${elementStrings.itemStatus}" id="status-${id}">
                <label for="status-${id}" class="${elementStrings.itemStatusLabel}">
                    <i class="icon ion-checkmark"></i>
                </label>
                <input type="text" class="${elementStrings.itemName}" readonly value="${name}">
                <div class="${elementStrings.itemProgress}">
                    ${progress}
                </div>
                <button class="${elementStrings.itemContextMenu}"></button>
            <div>`;

    parent.insertAdjacentHTML('beforeend', newItem);
};

const contextMenuUncomplete = item => {
    if(item.status) return (
        `<li class="${elementStrings.ctxMenuItem} ${elementStrings.ctxMenuBtnUncomplete}">
            <i class="icon ion-ios-circle-outline"></i>Uncomplete
        </li>` );

    return ``;
};

export const renderContextMenu = item => {
    const markup = `
        <div class="${elementStrings.ctxMenu}">
            <ul class="${elementStrings.ctxMenuList}">
                <li class="${elementStrings.ctxMenuItem}  ${elementStrings.ctxMenuBtnEdit}">
                    <i class="icon ion-edit"></i>Edit
                </li>
                <li class="${elementStrings.ctxMenuItem}  ${elementStrings.ctxMenuBtnDelete}">
                    <i class="icon ion-trash-b"></i>Delete
                </li>
                ${contextMenuUncomplete(item)}
            </ul>
        </div>`

    document.getElementById(item.id).insertAdjacentHTML('beforeend', markup);
};

export const renderConfirmWindow = (id, action) => {
    const text = {
        "Delete": 'Are you sure you want to delete item?',
        "Complete": 'Are you sure you want to complete item which contains subitems? All subitems will be completed too.'
    }

    const markup = `
        <div class="${elementStrings.confirmBox}" data-action="${action}" data-item="${id}">
            <button class="${elementStrings.confirmBtnClose} ${elementStrings.confirmBtnCancel}">
                <i class="icon ion-close"></i>
            </button>
        <p class="confirm-text">${text[action]}</p>
        <div class="confirm-btns">
            <button class="${elementStrings.confirmBtn} ${elementStrings.confirmBtnCancel}">Cancel</button>
            <button class="${elementStrings.confirmBtn} ${elementStrings.confirmBtnConfirm}">${action}</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', markup);
}
