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


const findItemByID = function (id) {
    function findItemByIDIn(id, list) {
        let target = null;

        for (let el of list) {
            if (el.id === id) return el;

            if (el.subItems.length) {
                target = findItemByIDIn(id, el.subItems);
                if (target) return target;
            }
        }
        return null;
    }

    return findItemByIDIn(id, items);
};

const findParent = function (id, list = items) {
    let target = null;

    for (let el of list) {
        if (el.id === id) return list;

        if (el.subItems.length) {
            target = findParent(id, el.subItems);
            if (target) return target;
        }
    }
    return null;
}

const findSiblingItem = function (id) {
    const parent = findParent(id);

    if (parent && parent.length > 1) {
        const itemIndex = parent.findIndex(el => el.id === id);
        if (parent[itemIndex + 1]) return parent[itemIndex + 1];
        if (parent[itemIndex - 1]) return parent[itemIndex - 1];
    }
    return null;
}

const renderID = function () {
    if (!items.length) return 0;

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


export default {
    addItem: function (name, parent) {
        const id = renderID();
        const newItem = new Item(id, name);

        if (!isNaN(parent))
            findItemByID(parent).subItems.push(newItem);
        else
            items.push(newItem);

        return newItem;
    },

    deleteItem: function (id) {
        const parent = findParent(id);

        parent.splice(findParent(id).indexOf(findItemByID(id)), 1);
    },

    completeItem: function (id) {
        findItemByID(id).complete();
    },

    calcItemProgress: function (id) {
        findItemByID(id).calcProgress();
    },

    getItemByID: function (id) {
        return findItemByID(id);
    },

    getItemProgress: function (id) {
        return findItemByID(id).progress;
    },

    getNextItem: function (id) {
        if (findSiblingItem(id))
            return findSiblingItem(id).id;

        return null;
    },

    setComment: function (id, comment) {
        findItemByID(id).comment = comment;
    },

    test: function () {
        const item1 = new Item(1, 'g1');
        const item2 = new Item(2, 'g2');
        const item3 = new Item(3, 'g3');
        items = [item1, item2, item3];

        const subItem1 = new Item(4, 'sub1');
        const subItem2 = new Item(5, 'sub2');
        const subItem3 = new Item(6, 'sub3');

        const subItem4 = new Item(7, 'subsub1');
        const subItem5 = new Item(8, 'subsub2');
        const subItem6 = new Item(9, 'subsub3');

        item1.subItems.push(subItem1);
        item2.subItems.push(subItem2);
        item2.subItems.push(subItem3);

        subItem3.subItems.push(subItem4);
        subItem3.subItems.push(subItem5);
        subItem3.subItems.push(subItem6);

        console.log(items);
        var item = findItemByID(8);
        return item.name;

    },
    test2: function () {
        return items;
    }
};