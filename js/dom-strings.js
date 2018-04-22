export const elementStrings = {
    // Item
    item: 'item',
    itemStatus: 'item__status--checkbox',
    itemStatusLabel: 'item__status--label',
    itemName: 'item__name',
    itemProgress: 'item__progress',
    itemContextMenu: 'more-options__btn',

    // Item description
    progressBar: 'item-active__progress',
    breadCrumbs: 'item-active__name',
    itemComment: 'comment',

    // Context menu
    ctxMenu: 'more-options__menu',
    ctxMenuList: 'menu',
    ctxMenuItem: 'menu__item',
    ctxMenuBtnDelete: 'menu__delete',
    ctxMenuBtnEdit: 'menu__edit',
    ctxMenuBtnUncomplete: 'menu__uncomplete',

    // Btns
    btnUp: 'btn-up', 

    // States
    itemCompleted: 'item--completed',
    goalActived: 'item-goal--active',
    btnUpActived: 'btn-up--active',

    // Modal windows
    confirmBox: 'confirm-box',
    confirmBtn: 'confirm-btn',
    confirmBtnClose: 'confirm-btn--close',
    confirmBtnCancel: 'confirm-btn--cancel',
    confirmBtnConfirm: 'confirm-btn--confirm'
};


export const elements = {
    // New item
    inputItemName: type => document.querySelector(`.${type}-add__input`),
    btnAddItem: type => document.querySelector(`.${type}-add__btn`),

    // Item
    itemProgress: document.querySelector(`.${elementStrings.itemProgress}`),
    itemContextMenu: document.querySelector(`.${elementStrings.ctxMenu}`),

    // Item description
    breadCrumbs: document.querySelector(`.${elementStrings.breadCrumbs}`),
    progressBar: document.querySelector(`.${elementStrings.progressBar}`),
    itemComment: document.querySelector(`.${elementStrings.itemComment}`),

    itemsList: type => document.querySelector(`.${type}-list`),

    btnUp: document.querySelector(`.${elementStrings.btnUp}`)
};


