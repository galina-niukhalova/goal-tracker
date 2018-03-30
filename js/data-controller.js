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
            /// 
        }
    }
}

let items = [];
let activeItem;
let activeGoal;

const findItemByID = (id, parent = items) => {
    let target;

    for (let item of parent) {
        if (item.id === id) return { item, parent };

        if (item.subItems.length) {
            target = findItemByID(id, item.subItems);
            if (target.item) return { item: target.item, parent: target.parent };
        }
    }
    return null;
}

const findSiblingItem = function (id) {
    const parent = findItemByID(id).parent;

    if (parent && parent.length > 1) {
        const itemIndex = parent.findIndex(item => item.id === id);

        if (parent[itemIndex + 1])
            return parent[itemIndex + 1];
        else
            return parent[itemIndex - 1];
    }
    return null;
}

const renderID = function () {
    if (!items.length) return 1;

    let maxId = 0;

    const findMaxID = items => {
        items.forEach(el => {
            if (maxId < el.id) maxId = el.id;

            if (el.subItems.length) findMaxID(el.subItems);
        });
    }

    findMaxID(items);
    return maxId + 1;
}

const addItem = (name, parent) => {
    console.log(parent);
    const id = renderID();
    const newItem = new Item(id, name);

    if (parent) {
        console.log('return: ', findItemByID(parent));
        console.log('el: ', findItemByID(parent).item);
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

const deleteItem = (id) => {
    let {item, parent} = findItemByID(id);

    parent.splice(parent.indexOf(item), 1);
};

const completeItem = (id) => {
    findItemByID(id).item.complete();
};

const calcItemProgress = (id) => {
    findItemByID(id).item.calcProgress();
};

const getItemByID = (id) => {
    return findItemByID(id).item;
};

const getActiveItem = (id) => {
    return activeItem;
};

const getActiveGoal = () => {
    return activeGoal;
}

const getNextItemID = (id) => {
    if (findSiblingItem(id))
        return findSiblingItem(id).id;

    return null;
};

const setComment = (id, comment) => {
    findItemByID(id).item.comment = comment;
};

const setActiveItem = (id) => {
    activeItem = id;
};

const setActiveGoal = (id) => {
    activeGoal = id;
};

export default {
    addItem,
    deleteItem,
    completeItem,
    calcItemProgress,
    getItemByID,
    getActiveItem,
    getActiveGoal,
    getNextItemID,
    setComment,
    setActiveItem,
    setActiveGoal,
    test: function () {
        return items;
    }
}



    // test: function () {
    //     const item1 = new Item(1, 'g1');
    //     const item2 = new Item(2, 'g2');
    //     const item3 = new Item(3, 'g3');
    //     items = [item1, item2, item3];

    //     const subItem1 = new Item(4, 'sub1');
    //     const subItem2 = new Item(5, 'sub2');
    //     const subItem3 = new Item(6, 'sub3');

    //     const subItem4 = new Item(7, 'subsub1');
    //     const subItem5 = new Item(8, 'subsub2');
    //     const subItem6 = new Item(9, 'subsub3');

    //     item1.subItems.push(subItem1);
    //     item2.subItems.push(subItem2);
    //     item2.subItems.push(subItem3);

    //     subItem3.subItems.push(subItem4);
    //     subItem3.subItems.push(subItem5);
    //     subItem3.subItems.push(subItem6);

    //     console.log(items);
    //     var item = findItemByID(8);
    //     return item.name;

    // },

