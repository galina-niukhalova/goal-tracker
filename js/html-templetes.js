import { elementStrings } from './dom-strings';

export const renderItem = ({ id, name, progress, status }, parent) => {
    let className = elementStrings.item;
    progress ? progress = `${progress}%` : progress = '---';
    if(status) className += ` ${elementStrings.itemStatusCompleted}`;

    const newItem = `<div class="${className}" id="${id}">
                <input type="checkbox" class="${elementStrings.itemStatus}" id="status-${id}">
                <label for="status-${id}" class="${elementStrings.itemStatusLabel}">
                    <i class="icon ion-checkmark"></i>
                </label>
                <input type="text" class="${elementStrings.itemName}" readonly value="${name}">
                <div class="${elementStrings.itemProgress}">
                    ${progress}
                </div>
                <button class="${elementStrings.btnMoreOptions}"></button>
            <div>`;

    parent.insertAdjacentHTML('beforeend', newItem);
    
};

export const renderContextMenu = (parent) => {
    const html = `
        <div class="${elementStrings.contextMenu}">
            <ul class="${elementStrings.contextMenuList}">
                <li class="${elementStrings.contextMenuItem}  ${elementStrings.btnEditItem}">
                    <i class="icon ion-edit"></i>Edit
                </li>
                <li class="${elementStrings.contextMenuItem}  ${elementStrings.btnDeleteItem}">
                    <i class="icon ion-trash-b"></i>Delete
                </li>
            </ul>
        </div>`

    parent.insertAdjacentHTML('beforeend', html);
};
