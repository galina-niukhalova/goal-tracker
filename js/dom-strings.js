export const elementStrings = {
    item: 'item',
    itemName: 'item__name',
    itemProgress: 'item__progress',
    itemStatus: 'item__status--checkbox',
    itemStatusLabel: 'item__status--label',
    itemStatusCompleted: 'item--completed',
    stateGoalActive: 'item-goal--active',
    btnUpActive: 'btn-up--active',

    btnMoreOptions: 'more-options__btn',
    contextMenu: 'more-options__menu',
    contextMenuList: 'menu',
    contextMenuItem: 'menu__item',
    btnDeleteItem: 'menu__delete',
    btnEditItem: 'menu__edit',
};

export const elements = {
    // ----ITEM properties----
    itemProgress: document.querySelector(`.${elementStrings.itemProgress}`),
    itemComment: document.querySelector('.comment'),
    itemContextMenu: document.querySelector(`.${elementStrings.contextMenu}`),

    // goals
    btnAdd: document.querySelector('.item-add__btn'),
    btnAddItem: type => document.querySelector(`.${type}-add__btn`),
    inputNewItemName: type => document.querySelector(`.${type}-add__input`),
    itemsList: type => document.querySelector(`.${type}-list`),
    
    // header
    headerName: document.querySelector('.item-active__name'),
    headerProgress: document.querySelector('.item-active__progress'),

    btnUp: document.querySelector('.btn-up')
};


