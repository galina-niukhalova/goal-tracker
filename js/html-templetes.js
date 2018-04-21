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

export const renderContextMenu = (item) => {
    const markup = `
        <div class="${elementStrings.ctxMenu}">
            <ul class="${elementStrings.ctxMenuList}">
                <li class="${elementStrings.ctxMenuItem}  ${elementStrings.ctxMenuBtnEdit}">
                    <i class="icon ion-edit"></i>Edit
                </li>
                <li class="${elementStrings.ctxMenuItem}  ${elementStrings.ctxMenuBtnDelete}">
                    <i class="icon ion-trash-b"></i>Delete
                </li>
            </ul>
        </div>`

    item.insertAdjacentHTML('beforeend', markup);
};
