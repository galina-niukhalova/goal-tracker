// DATA CONTROLLER
class Item {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.status = false;
        this.progress = 0;
        this.subItems = [];
        this.comment = '';
    }

    complete() {
        this.status = true;
    }

    calcProgress() {
        if (this.status) {
            this.progress = 100;
        }
        else {
            const totalSubs = this.subItems.length;

            if (!totalSubs) {
                this.progress = 0;
            }
            else {
                let completedSubs = this.subItems.filter(el => el.status).length;

                this.progress = Math.floor((completedSubs / totalSubs) * 100);
            }
        }
    }

    calcStatus() {
        if (this.progress === 100)
            this.status = true;
    }
};

let items, activeItem, activeGoal;

const initData = () => {
    items = [];
    activeItem = null;
    activeGoal = null;
};

const findItemSubs = parent => {
    return parent ? parent.subItems : items;
};

const findItemByID = (id, parent = null) => {
    let itemList, item;
    
    itemList = findItemSubs(parent);

    for (let itemPosition in itemList) {
        let item = itemList[itemPosition];

        if (item.id === id) 
            return { item, parent, itemPosition };

        if (item.subItems.length) {
            let target = findItemByID(id, item);
            if (target.item) return target;
        }
    };

    return {item: null, parent: null, itemPosition: null};;
};

const findSiblingItem = function (id) {
    const item = findItemByID(id);
    const itemPosition = parseInt(item.itemPosition); 

    let parentSubs = findItemSubs(item.parent);

    if (parentSubs && parentSubs.length > 1) 
        return parentSubs[itemPosition + 1] || parentSubs[itemPosition - 1];

    return null;
};

const renderID = function () {
    if (!items.length) return 1;

    let maxId = 0;

    const findMaxID = items => {
        items.forEach(el => {
            if (maxId < el.id) maxId = el.id;

            if (el.subItems.length) findMaxID(el.subItems);
        });
    };
    findMaxID(items);

    return maxId + 1;
};

const addItem = (name, parent) => {
    const ID = renderID();
    const newItem = new Item(ID, name);

    if (parent) {
        findItemByID(parent)
            .item
            .subItems
            .push(newItem);
    }
    else {
        items.push(newItem);
    }

    return newItem;
};

const deleteItem = id => {
    let { parent, itemPosition } = findItemByID(id);

   
    findItemSubs(parent).splice(itemPosition, 1);
};

const completeItem = id => {
    findItemByID(id).item.complete();
};

const calcItemProgress = id => {
    findItemByID(id).item.calcProgress();
};

const calcItemStatus = id => {
    findItemByID(id).item.calcStatus();
};

const calcParentsProgress = id => {
    let parent = getItemParent(id);
    
    if(parent) {
        calcItemProgress(parent.id);
        calcItemStatus(parent.id);
        calcParentsProgress(parent.id);
    }
};

const getItemByID = id => {
    return findItemByID(id).item;
};

const getItemParent = id => {
    return findItemByID(id).parent;
};

const getActiveItem = id => {
    return activeItem;
};

const getActiveGoal = () => {
    return activeGoal;
};

const getNextItem = id => {
    return findSiblingItem(id);
};

const setComment = (id, comment) => {
    findItemByID(id).item.comment = comment;
};

const setActiveItem = id => {
    activeItem = id;
};

const setActiveGoal = id => {
    activeGoal = id;
};

const getBreadCrumbs = id => {
    window.items = items;
    let itemParam = findItemByID(id);

    let parent = itemParam.parent;
    let name = itemParam.item.name;
    let count = 2;

    while (parent !== null) {
        if (count > 0) name = `${parent.name} / ${name}`;
        else if (count === 0) name = `... / ${name}`;

        id = parent.id;
        parent = findItemByID(id).parent;
        count--;
    }
    return name;
};

export {
    addItem,
    deleteItem,
    completeItem,
    calcItemProgress,
    calcItemStatus,
    calcParentsProgress,
    getItemByID,
    getItemParent,
    getActiveItem,
    getActiveGoal,
    getNextItem,
    setComment,
    setActiveItem,
    setActiveGoal,
    getBreadCrumbs, 
    initData
}


