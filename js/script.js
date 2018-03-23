// DATA CONTROLLER
var dataController = (function () {
    var Item = function (id, name) {
        this.id = id;
        this.name = name;
        this.status = false;

        this.progress = 0;
        this.subItems = [];
    };

    var items = [];

    var findItemByID = function (id) {
        var ids = [];

        items.forEach(element => {
            ids.push(element.id);
        });

        return {
            item: items[ids.indexOf(id)],
            index: ids.indexOf(id)
        }
    };


    var getID = function () {
        if (items.length === 0) return 0;

        var maxId = 0;

        var findMaxID = function (items) {
            for (var item of items) {
                if (maxId < item.id) maxId = item.id;

                if (item.subItems.length > 0) findMaxID(item.subItems);
            }
        }

        findMaxID(items);
        return maxId + 1;
    }

    return {
        addItem: function (name) {
            var id = getID();
            var newItem = new Item(id, name);

            items.push(newItem);
            return newItem;
        },

        deleteItem: function (id) {
            items.splice(findItemByID(id).index, 1);
        },

        getItems__test: function () {
            return items;
        },

        completeItem: function (id) {
            findItemByID(id).item.status = true;
        },

        calcItemProgress: function (id) {
            var item;

            item = findItemByID(id).item;

            if (item.status) {
                item.progress = 100;
            }
            else {
                // calc progress, dependes of childs status
            }

            return item.progress;
        }
    };

})();



// UI CONTROLLER
var UIController = (function () {
    var DOMStrings = {
        addButton: '.add__btn',
        newItemName: '.add__name',
        goalList: '.goal-list',
        itemProgress: '.item__progress'
    };

    return {
        getDOMStrings: function () {
            return DOMStrings;
        },

        getNewGoal: function () {
            return document.querySelector(DOMStrings.newItemName).value;
        },

        addNewGoal: function (item) {
            var html;

            html = '<div class="item" id="%id%">'
                + '<input type="checkbox" class="item__status--checkbox" id="status-%id%">'
                + '<label for="status-%id%" class="item__status--label">'
                + '<i class="icon ion-checkmark"></i>'
                + '</label>'
                + '<input type="text" class="item__name" readonly value="%name%">'
                + '<div class="item__progress">---</div>'
                + '<button class="delete__btn">'
                + '<i class="icon ion-trash-b"></i>'
                + '</button>'
                + '</div>'

            html = html.replace(/%id%/g, item.id);
            html = html.replace(/%name%/g, item.name);

            document.querySelector(DOMStrings.goalList).insertAdjacentHTML('beforeend', html);
        },

        deleteItem: function (id) {
            var item = document.getElementById(id);
            item.parentNode.removeChild(item);
        },

        clearFields: function () {
            document.querySelector(DOMStrings.newItemName).value = '';
            document.querySelector(DOMStrings.newItemName).focus();
        },

        updateItemProgress: function (id, progress) {

            document.getElementById(id).childNodes.forEach(element => {
                if (element.className === 'item__progress')
                    element.textContent = progress + '%';
            });
        },

        completeItem: function (id) {
            document.getElementById(id).classList.add('item--completed');
        }
    };

})();



// GLOBAL APP CONTROLLER
var controller = (function (dataCtrl, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13)
                ctrAddGoal();
        });

        document.querySelector(DOM.addButton).addEventListener('click', ctrAddGoal);

        document.querySelector(DOM.goalList).addEventListener('click', function (event) {
            if (event.target.type === 'checkbox') ctrCompleteGoal(event.target.parentNode);

            if (event.target.classList.contains('ion-trash-b'))
                ctrDeleteGoal(event.target.parentNode.parentNode);
        });
    };

    var ctrAddGoal = function () {
        // UI: Get goal name
        var name = UIController.getNewGoal();

        if (name) {
            // Data: Add new item
            var item = dataCtrl.addItem(name);

            // UI: Add new item to Goals list
            UICtrl.addNewGoal(item);

            // UI: Clear field
            UICtrl.clearFields();
        }
    };

    var ctrDeleteGoal = function (item) {

        var id;

        id = parseInt(item.id);
        // Data: delete item
        dataCtrl.deleteItem(id);

        // UI: delete item
        UICtrl.deleteItem(id);
    };

    var ctrCompleteGoal = function (item) {
        var id, progress;

        id = parseInt(item.id);

        // Data: complete item
        dataCtrl.completeItem(id);

        // Data: update item progress
        progress = dataCtrl.calcItemProgress(id);

        // UI: update progress
        UICtrl.updateItemProgress(id, progress);

        // UI: update item's visible 
        UICtrl.completeItem(id);
    }

    return {
        init: function () {
            setUpEventListeners();
        }
    };
})(dataController, UIController);

controller.init();