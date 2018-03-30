exports.getItemTemplete = ({ id, name, progress, status }) => {
    let className;
    progress ? progress = `${progress}%` : progress = '---';
    status ? className = "item item--completed" : className = "item";

    return `<div class="${className}" id="${id}">`
        + `<input type="checkbox" class="item__status--checkbox" id="status-${id}">`
        + `<label for="status-${id}" class="item__status--label">`
        + `<i class="icon ion-checkmark"></i>`
        + `</label>`
        + `<input type="text" class="item__name" readonly value="${name}">`
        + `<div class="item__progress">${progress}</div>`
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