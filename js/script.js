// DATA CONTROLLER
const dataController = (function () {
    const Item = function (id, name) {
        this.id = id;
        this.name = name;
        this.status = false;

        this.progress = 0;
        this.subItems = [];
    };

    Item.prototype.complete = function () {
        this.status = true;
    };

    Item.prototype.calcProgress = function () {
        if(this.status) {
            this.progress = 100;
        }
        else { 
            /// 
        }
    };

    let items = [];

    const findItemByID = function (id) {
        let ids = [];

        items.forEach(element => ids.push(element.id));

        return items[ids.indexOf(id)];
    };


    const renderID = function () {
        if (!items.length) return 0;

        let maxId = 0;

        const findMaxID = items => {
            for (let item of items) {
                if (maxId < item.id) maxId = item.id;

                if (item.subItems.length) findMaxID(item.subItems);
            }
        }

        findMaxID(items);
        return maxId + 1;
    }

    return {
        addItem: function (name) {
            const id = renderID();
            const newItem = new Item(id, name);

            items.push(newItem);
            return newItem;
        },

        deleteItem: function (id) {
            items.splice(items.indexOf(findItemByID(id)), 1);
        },

        completeItem: function (id) {
            findItemByID(id).complete();
        },

        calcItemProgress: function (id) {
            findItemByID(id).calcProgress();
        },

        getItemProgress: function (id) {
            return findItemByID(id).progress;
        }
    };

})();



// UI CONTROLLER
const UIController = (function () {
    const DOMStrings = {
        addButton: '.add__btn',
        inputAddGoalName: '.add__name',
        goalsList: '.goal-list',
        itemProgress: '.item__progress', 
        itemProgress_: 'item__progress', 
        itemCompleted_: 'item--completed'
    };

    return {
        getDOMStrings: function () {
            return DOMStrings;
        },

        getNewGoalName: function () {
            return document.querySelector(DOMStrings.inputAddGoalName).value;
        },

        clearFields: function () {
            document.querySelector(DOMStrings.inputAddGoalName).value = '';
            document.querySelector(DOMStrings.inputAddGoalName).focus();
        },

        addNewGoal: function (item) {

            const html = `<div class="item" id="${item.id}">`
                + `<input type="checkbox" class="item__status--checkbox" id="status-${item.id}">`
                + `<label for="status-${item.id}" class="item__status--label">`
                + `<i class="icon ion-checkmark"></i>`
                + `</label>`
                + `<input type="text" class="item__name" readonly value="${item.name}">`
                + `<div class="item__progress">---</div>`
                + `<button class="delete__btn">`
                + `<i class="icon ion-trash-b"></i>`
                + `</button>`
                + `</div>`;

            document.querySelector(DOMStrings.goalsList).insertAdjacentHTML('beforeend', html);
        },

        deleteItem: function (id) {
            const item = document.getElementById(id);
            item.parentNode.removeChild(item);
        },

        updateItemProgress: function (id, progress) {

            document.getElementById(id).childNodes.forEach(element => {
                if (element.className === DOMStrings.itemProgress_)
                    element.textContent = `${progress}%`;
            });
        },

        completeItem: function (id) {
            document.getElementById(id).classList.add(DOMStrings.itemCompleted_);
        }
    };

})();



// GLOBAL APP CONTROLLER
const controller = (function (dataCtrl, UICtrl) {

    const setUpEventListeners = function () {
        const DOM = UICtrl.getDOMStrings();

        document.addEventListener('keypress', event => {
            if (event.keyCode === 13 || event.which === 13)
                ctrAddGoal();
        });

        document.querySelector(DOM.addButton).addEventListener('click', ctrAddGoal);

        document.querySelector(DOM.goalsList).addEventListener('click', event => {
            if (event.target.type === 'checkbox') ctrCompleteGoal(event.target.parentNode);

            if (event.target.classList.contains('ion-trash-b'))
                ctrDeleteGoal(event.target.parentNode.parentNode);
        });
    };

    const ctrAddGoal = function () {
        // UI: Get goal name
        const name = UIController.getNewGoalName();

        if (name) {
            // Data: Add new item
            const item = dataCtrl.addItem(name);

            // UI: Add new item to Goals list
            UICtrl.addNewGoal(item);

            // UI: Clear field
            UICtrl.clearFields();
        }
    };

    const ctrDeleteGoal = function (item) {

        const id = parseInt(item.id);

        // Data: delete item
        dataCtrl.deleteItem(id);

        // UI: delete item
        UICtrl.deleteItem(id);
    };

    const ctrCompleteGoal = function (item) {
        const id = parseInt(item.id);

        // Data: complete item
        dataCtrl.completeItem(id);

        // Data: update item progress
        dataCtrl.calcItemProgress(id);
        const progress = dataCtrl.getItemProgress(id);

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