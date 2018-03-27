/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/UI-controller.js":
/*!*****************************!*\
  !*** ./js/UI-controller.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar DOMStrings = {\n    // ----ITEM properties----\n    itemProgress: '.item__progress',\n    itemComment: '.comment__text',\n    itemStateActive: '.item--active',\n    itemContextMenu: '.more-options__menu',\n\n    // ----LEFT----\n    btnAdd: '.add__btn',\n    btnAddGoal: '.add-goal__btn',\n    inputNewGoalName: '.add__goal',\n    goalsList: '.goal-list',\n\n    // ----RIGHT----\n    // header\n    headerName: '.active-item__name',\n    headerProgress: '.active-item__progress',\n\n    // subgoals\n    btnAddSubgoal: '.add-subgoal__btn',\n    inputNewSubgoalName: '.add__subgoal',\n    subgoalList: '.subgoal-list',\n\n    //----Names of classes----\n    // item\n    _itemName: 'item__name',\n    _itemStatusActive: 'item--active',\n    _itemStatusCompleted: 'item--completed',\n    _itemProgress: 'item__progress',\n\n    // context menu\n    _btnMoreOptions: 'more-options__btn',\n    _contextMenuStatusOpen: 'menu--active',\n    _btnDeleteItem: 'menu__delete',\n    _btnEditItem: 'menu__edit'\n};\n\nvar getItemTemplete = function getItemTemplete(id, name) {\n    return '<div class=\"item\" id=\"' + id + '\">' + ('<input type=\"checkbox\" class=\"item__status--checkbox\" id=\"status-' + id + '\">') + ('<label for=\"status-' + id + '\" class=\"item__status--label\">') + '<i class=\"icon ion-checkmark\"></i>' + '</label>' + ('<input type=\"text\" class=\"item__name\" readonly value=\"' + name + '\">') + '<div class=\"item__progress\">---</div>' + '<button class=\"more-options__btn\"></button>' + '<div class=\"more-options__menu\">' + '<ul class=\"menu\">' + '   <li class=\"menu__item  menu__edit\">' + '       <i class=\"icon ion-edit\"></i>Edit' + '   </li>' + '   <li class=\"menu__item  menu__delete\">' + '       <i class=\"icon ion-trash-b\"></i>Delete' + '   </li>' + '</ul>' + '</div>' + '</div>';\n};\n\nexports.default = {\n    getDOMStrings: function getDOMStrings() {\n        return DOMStrings;\n    },\n\n    getNewGoalName: function getNewGoalName() {\n        return document.querySelector(DOMStrings.inputNewGoalName).value;\n    },\n\n    getNewSubgoalName: function getNewSubgoalName() {\n        return document.querySelector(DOMStrings.inputNewSubgoalName).value;\n    },\n\n    clearFields: function clearFields() {\n        document.querySelector(DOMStrings.inputNewGoalName).value = '';\n        document.querySelector(DOMStrings.inputNewSubgoalName).value = '';\n    },\n\n    addNewGoal: function addNewGoal(id, name) {\n        document.querySelector(DOMStrings.goalsList).insertAdjacentHTML('beforeend', getItemTemplete(id, name));\n    },\n\n    addNewSubgoal: function addNewSubgoal(id, name) {\n        document.querySelector(DOMStrings.subgoalList).insertAdjacentHTML('beforeend', getItemTemplete(id, name));\n    },\n\n    deleteItem: function deleteItem(id) {\n        var item = document.getElementById(id);\n        item.parentNode.removeChild(item);\n    },\n\n    updateItemProgress: function updateItemProgress(id, progress) {\n        document.getElementById(id).childNodes.forEach(function (element) {\n            if (element.className === DOMStrings._itemProgress) element.textContent = progress + '%';\n        });\n    },\n\n    completeItem: function completeItem(item) {\n        item.classList.add(DOMStrings.itemCompleted_);\n    },\n\n    // 1. Add new goal\n    // 2. Change active item\n    updateHeader: function updateHeader(name) {\n        var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n        document.querySelector(DOMStrings.headerName).textContent = name;\n        document.querySelector(DOMStrings.headerProgress).value = progress;\n    },\n\n    // 1. Add new goal\n    // 2. Change active item\n\n    // 2. ?? (Add new subgoal\n    updateSubgoalsList: function updateSubgoalsList() {\n        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n        var html = '';\n\n        list.forEach(function (item) {\n            return html += getItemTemplete(item.id, item.name);\n        });\n\n        document.querySelector(DOMStrings.subgoalList).innerHTML = html;\n    },\n\n    updateComment: function updateComment() {\n        var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n        document.querySelector(DOMStrings.itemComment).value = comment;\n    },\n\n    getActiveItemID: function getActiveItemID() {\n        var activeItem = document.querySelector(DOMStrings.itemStateActive);\n        if (activeItem) return parseInt(activeItem.id);\n\n        return null;\n    },\n\n    changeActiveItem: function changeActiveItem(activeItemID) {\n        var previousItemID = this.getActiveItemID();\n\n        if (previousItemID != null) {\n            document.getElementById(previousItemID).classList.remove(DOMStrings._itemStatusActive);\n        }\n\n        document.getElementById(activeItemID).classList.add(DOMStrings._itemStatusActive);\n    },\n\n    setActiveGoal: function setActiveGoal(id) {\n        if (document.querySelector('.item-goal--active')) document.querySelector('.item-goal--active').classList.remove('item-goal--active');\n        document.getElementById(id).classList.add('item-goal--active');\n    },\n\n    toggleContextMenu: function toggleContextMenu(item) {\n        item.querySelector(DOMStrings.itemContextMenu).classList.toggle(DOMStrings._contextMenuStatusOpen);\n    }\n};\n\n//# sourceURL=webpack:///./js/UI-controller.js?");

/***/ }),

/***/ "./js/controller.js":
/*!**************************!*\
  !*** ./js/controller.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dataController = __webpack_require__(/*! ./data-controller */ \"./js/data-controller.js\");\n\nvar _dataController2 = _interopRequireDefault(_dataController);\n\nvar _UIController = __webpack_require__(/*! ./UI-controller */ \"./js/UI-controller.js\");\n\nvar _UIController2 = _interopRequireDefault(_UIController);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n    console.log('set up...');\n    var DOM = _UIController2.default.getDOMStrings();\n\n    var itemListListener = function itemListListener(target) {\n        // CONTEXT MENU\n        if (target.className.includes(DOM._btnMoreOptions)) ctrTaggleContextMenu(event.target.parentNode);\n\n        // EDIT item\n        if (target.className.includes(DOM._btnEditItem)) ctrEditItem(target.parentNode.parentNode.parentNode);\n    };\n\n    // ---- Press ENTER ----\n    document.addEventListener('keypress', function (event) {\n        if (event.keyCode === 13 || event.which === 13) {\n            ctrAddGoal();\n            ctrAddSubgoal();\n        }\n        // console.log(DataController.test2());\n    });\n\n    // ---- Click on btn <Add new goal>  ----\n    document.querySelector(DOM.btnAddGoal).addEventListener('click', ctrAddGoal);\n\n    // ---- Click on btn <Add new subgoal>  ----\n    document.querySelector(DOM.btnAddSubgoal).addEventListener('click', ctrAddSubgoal);\n\n    document.querySelector(DOM.goalsList).addEventListener('click', function (event) {\n        var target = event.target;\n        var className = target.className;\n\n        // ---- Click on <Complete goal>  ----\n        if (target.type === 'checkbox') ctrCompleteGoal(target.parentNode);\n\n        // ---- Click on <another goal>  ----\n        if (className.includes(DOM._itemName)) showItem(parseInt(target.parentNode.id));\n\n        // DELETE item\n        if (className.includes(DOM._btnDeleteItem)) ctrDeleteGoal(target.parentNode.parentNode.parentNode);\n\n        itemListListener(target);\n    });\n\n    document.querySelector(DOM.subgoalList).addEventListener('click', function (event) {\n        var target = event.target;\n        var className = target.className;\n\n        itemListListener(event.target);\n\n        // ---- Click on <another subgoal>  ----\n        if (className.includes(DOM._itemName)) updateRightPanel(parseInt(target.parentNode.id));\n\n        // DELETE item\n        if (className.includes(DOM._btnDeleteItem)) ctrDeleteItem(event.target.parentNode.parentNode.parentNode);\n    });\n\n    // COMMENT\n    document.querySelector(DOM.itemComment).addEventListener('change', function (event) {\n        ctrUpdateComment(event.target.value);\n    });\n})();\n\nvar ctrAddGoal = function ctrAddGoal() {\n    // UI: Get goal name\n    var name = _UIController2.default.getNewGoalName();\n\n    if (name) {\n        // Data: Add new item\n        var item = _dataController2.default.addItem(name);\n\n        // UI: Goal list - add new item\n        _UIController2.default.addNewGoal(item.id, name);\n\n        // Change active item\n        showItem(item.id);\n\n        // UI: Clear field\n        _UIController2.default.clearFields();\n    }\n};\n\nvar ctrAddSubgoal = function ctrAddSubgoal() {\n    // UI: Get subgoal name\n    var name = _UIController2.default.getNewSubgoalName();\n\n    // UI: Get active item\n    var parentID = _UIController2.default.getActiveItemID();\n\n    if (name) {\n        // Data: add item\n        var item = _dataController2.default.addItem(name, parentID);\n\n        // UI: Subgoal list - add new item\n        _UIController2.default.addNewSubgoal(item.id, name);\n        _UIController2.default.clearFields();\n    }\n};\n\nvar ctrDeleteItem = function ctrDeleteItem(item) {\n    var id = parseInt(item.id);\n\n    // Data: delete item\n    _dataController2.default.deleteItem(id);\n\n    // UI: delete item\n    _UIController2.default.deleteItem(id);\n};\n\nvar ctrDeleteGoal = function ctrDeleteGoal(item) {\n    var id = parseInt(item.id);\n    var activeItem = _dataController2.default.getNextItem(id);\n\n    ctrDeleteItem(item);\n\n    // change active item\n    if (activeItem != null) updateRightPanel(activeItem);\n};\n\nvar ctrEditItem = function ctrEditItem(item) {\n    //\n};\n\nvar ctrCompleteGoal = function ctrCompleteGoal(item) {\n    var id = parseInt(item.id);\n\n    // Data: complete item\n    _dataController2.default.completeItem(id);\n\n    // Data: update item progress\n    _dataController2.default.calcItemProgress(id);\n    var progress = _dataController2.default.getItemProgress(id);\n\n    // UI: update progress\n    _UIController2.default.updateItemProgress(id, progress);\n\n    // UI: update item's visible \n    _UIController2.default.completeItem(item);\n};\n\nvar ctrUpdateComment = function ctrUpdateComment(comment) {\n    _dataController2.default.setComment(_UIController2.default.getActiveItemID(), comment);\n};\n\nvar ctrTaggleContextMenu = function ctrTaggleContextMenu(item) {\n    _UIController2.default.toggleContextMenu(item);\n};\n\nvar showItem = function showItem(id) {\n    // set Active Goal\n    _UIController2.default.setActiveGoal(id);\n\n    updateRightPanel(id);\n};\n\nvar updateRightPanel = function updateRightPanel(id) {\n    // Data get item \n    var item = _dataController2.default.getItemByID(id);\n\n    // UI: Change active item\n    _UIController2.default.changeActiveItem(id);\n\n    // UI: Header - update name, progress\n    _UIController2.default.updateHeader(item.name, item.progress);\n\n    // UI: Subgoal list - update\n    _UIController2.default.updateSubgoalsList(item.subItems);\n\n    // UI: Comment - update\n    _UIController2.default.updateComment(item.comment);\n};\n\n//# sourceURL=webpack:///./js/controller.js?");

/***/ }),

/***/ "./js/data-controller.js":
/*!*******************************!*\
  !*** ./js/data-controller.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// DATA CONTROLLER\nvar Item = function () {\n    function Item(id, name) {\n        _classCallCheck(this, Item);\n\n        this.id = id;\n        this.name = name;\n\n        this.status = false;\n        this.progress = 0;\n        this.subItems = [];\n        this.comment = '';\n    }\n\n    _createClass(Item, [{\n        key: 'complete',\n        value: function complete() {\n            this.status = true;\n        }\n    }, {\n        key: 'calcProgress',\n        value: function calcProgress() {\n            if (this.status) {\n                this.progress = 100;\n            } else {\n                /// \n            }\n        }\n    }]);\n\n    return Item;\n}();\n\nvar items = [];\n\nvar findItemByID = function findItemByID(id) {\n    function findItemByIDIn(id, list) {\n        var target = null;\n\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n            for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                var el = _step.value;\n\n                if (el.id === id) return el;\n\n                if (el.subItems.length) {\n                    target = findItemByIDIn(id, el.subItems);\n                    if (target) return target;\n                }\n            }\n        } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n        } finally {\n            try {\n                if (!_iteratorNormalCompletion && _iterator.return) {\n                    _iterator.return();\n                }\n            } finally {\n                if (_didIteratorError) {\n                    throw _iteratorError;\n                }\n            }\n        }\n\n        return null;\n    }\n\n    return findItemByIDIn(id, items);\n};\n\nvar findParent = function findParent(id) {\n    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : items;\n\n    var target = null;\n\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n        for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n            var el = _step2.value;\n\n            if (el.id === id) return list;\n\n            if (el.subItems.length) {\n                target = findParent(id, el.subItems);\n                if (target) return target;\n            }\n        }\n    } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n            }\n        } finally {\n            if (_didIteratorError2) {\n                throw _iteratorError2;\n            }\n        }\n    }\n\n    return null;\n};\n\nvar findSiblingItem = function findSiblingItem(id) {\n    var parent = findParent(id);\n\n    if (parent && parent.length > 1) {\n        var itemIndex = parent.findIndex(function (el) {\n            return el.id === id;\n        });\n        if (parent[itemIndex + 1]) return parent[itemIndex + 1];\n        if (parent[itemIndex - 1]) return parent[itemIndex - 1];\n    }\n    return null;\n};\n\nvar renderID = function renderID() {\n    if (!items.length) return 0;\n\n    var maxId = 0;\n\n    var findMaxID = function findMaxID(items) {\n        items.forEach(function (el) {\n            if (maxId < el.id) maxId = el.id;\n\n            if (el.subItems.length) findMaxID(el.subItems);\n        });\n    };\n\n    findMaxID(items);\n    return maxId + 1;\n};\n\nexports.default = {\n    addItem: function addItem(name, parent) {\n        var id = renderID();\n        var newItem = new Item(id, name);\n\n        if (!isNaN(parent)) findItemByID(parent).subItems.push(newItem);else items.push(newItem);\n\n        return newItem;\n    },\n\n    deleteItem: function deleteItem(id) {\n        var parent = findParent(id);\n\n        parent.splice(findParent(id).indexOf(findItemByID(id)), 1);\n    },\n\n    completeItem: function completeItem(id) {\n        findItemByID(id).complete();\n    },\n\n    calcItemProgress: function calcItemProgress(id) {\n        findItemByID(id).calcProgress();\n    },\n\n    getItemByID: function getItemByID(id) {\n        return findItemByID(id);\n    },\n\n    getItemProgress: function getItemProgress(id) {\n        return findItemByID(id).progress;\n    },\n\n    getNextItem: function getNextItem(id) {\n        if (findSiblingItem(id)) return findSiblingItem(id).id;\n\n        return null;\n    },\n\n    setComment: function setComment(id, comment) {\n        findItemByID(id).comment = comment;\n    },\n\n    test: function test() {\n        var item1 = new Item(1, 'g1');\n        var item2 = new Item(2, 'g2');\n        var item3 = new Item(3, 'g3');\n        items = [item1, item2, item3];\n\n        var subItem1 = new Item(4, 'sub1');\n        var subItem2 = new Item(5, 'sub2');\n        var subItem3 = new Item(6, 'sub3');\n\n        var subItem4 = new Item(7, 'subsub1');\n        var subItem5 = new Item(8, 'subsub2');\n        var subItem6 = new Item(9, 'subsub3');\n\n        item1.subItems.push(subItem1);\n        item2.subItems.push(subItem2);\n        item2.subItems.push(subItem3);\n\n        subItem3.subItems.push(subItem4);\n        subItem3.subItems.push(subItem5);\n        subItem3.subItems.push(subItem6);\n\n        console.log(items);\n        var item = findItemByID(8);\n        return item.name;\n    },\n    test2: function test2() {\n        return items;\n    }\n};\n\n//# sourceURL=webpack:///./js/data-controller.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./js/controller.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/controller.js */\"./js/controller.js\");\n\n\n//# sourceURL=webpack:///multi_./js/controller.js?");

/***/ })

/******/ });