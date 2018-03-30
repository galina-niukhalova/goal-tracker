export default {
    // ----ITEM properties----
    itemProgress: '.item__progress',
    itemComment: '.comment',
    itemContextMenu: '.more-options__menu',

    // goals
    btnAdd: '.item-add__btn',
    btnAddItem: type => `.${type}-add__btn`,
    stateGoalActive: '.item-goal--active',
    inputNewItemName: type => `.${type}-add__input`,
    itemsList: type => `.${type}-list`,
    
    // header
    headerName: '.item-active__name',
    headerProgress: '.item-active__progress',

    btnUp: '.btn-up',
    _btnUpActive: 'btn-up--active',

    //----Names of classes----
    // item
    _itemName: 'item__name',
    _itemStatusCompleted: 'item--completed',
    _itemProgress: 'item__progress',
    _itemStatus: 'item__status--checkbox',
    _stateGoalActive: 'item-goal--active',

    // context menu
    _btnMoreOptions: 'more-options__btn',
    _contextMenuStatusOpen: 'menu--active',
    _btnDeleteItem: 'menu__delete',
    _btnEditItem: 'menu__edit'
};