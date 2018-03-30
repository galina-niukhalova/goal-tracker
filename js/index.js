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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _domStrings = __webpack_require__(/*! ./dom-strings */ \"./js/dom-strings.js\");\n\nvar _domStrings2 = _interopRequireDefault(_domStrings);\n\nvar _htmlTempletes = __webpack_require__(/*! ./html-templetes */ \"./js/html-templetes.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar getDOMStrings = function getDOMStrings() {\n    return _domStrings2.default;\n};\n\nvar getNewGoalName = function getNewGoalName() {\n    return document.querySelector(_domStrings2.default.inputNewGoalName).value;\n};\n\nvar getNewSubgoalName = function getNewSubgoalName() {\n    return document.querySelector(_domStrings2.default.inputNewSubgoalName).value;\n};\n\nvar clearFields = function clearFields() {\n    document.querySelector(_domStrings2.default.inputNewGoalName).value = '';\n    document.querySelector(_domStrings2.default.inputNewSubgoalName).value = '';\n};\n\nvar addNewGoal = function addNewGoal(id, name) {\n    document.querySelector(_domStrings2.default.goalsList).insertAdjacentHTML('beforeend', (0, _htmlTempletes.getItemTemplete)(id, name));\n};\n\nvar addNewSubgoal = function addNewSubgoal(id, name) {\n    document.querySelector(_domStrings2.default.subgoalList).insertAdjacentHTML('beforeend', (0, _htmlTempletes.getItemTemplete)(id, name));\n};\n\nvar deleteItem = function deleteItem(id) {\n    var item = document.getElementById(id);\n    item.parentNode.removeChild(item);\n};\n\nvar updateItemProgress = function updateItemProgress(id, progress) {\n    document.getElementById(id).childNodes.forEach(function (element) {\n        if (element.className === _domStrings2.default._itemProgress) element.textContent = progress + '%';\n    });\n};\n\nvar completeItem = function completeItem(item) {\n    item.classList.add(_domStrings2.default._itemStatusCompleted);\n};\n\n// 1. Add new goal\n// 2. Change active item\nvar updateHeader = function updateHeader(name) {\n    var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n    document.querySelector(_domStrings2.default.headerName).textContent = name;\n    document.querySelector(_domStrings2.default.headerProgress).value = progress;\n};\n\n// 1. Add new goal\n// 2. Change active item\n\n// 2. ?? (Add new subgoal\nvar updateSubgoalsList = function updateSubgoalsList() {\n    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    var html = '';\n\n    list.forEach(function (item) {\n        return html += (0, _htmlTempletes.getItemTemplete)(item.id, item.name);\n    });\n\n    document.querySelector(_domStrings2.default.subgoalList).innerHTML = html;\n};\n\nvar updateComment = function updateComment() {\n    var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n    document.querySelector(_domStrings2.default.itemComment).value = comment;\n};\n\nvar getActiveItemID = function getActiveItemID() {\n    var activeItem = document.querySelector(_domStrings2.default.itemStateActive);\n    if (activeItem) return parseInt(activeItem.id);\n\n    return null;\n};\n\nvar changeActiveItem = function changeActiveItem(activeItemID) {\n    var previousItemID = getActiveItemID();\n\n    if (previousItemID != null) {\n        document.getElementById(previousItemID).classList.remove(_domStrings2.default._itemStatusActive);\n    }\n\n    document.getElementById(activeItemID).classList.add(_domStrings2.default._itemStatusActive);\n};\n\nvar setActiveGoal = function setActiveGoal(id) {\n    if (document.querySelector('.item-goal--active')) document.querySelector('.item-goal--active').classList.remove('item-goal--active');\n    document.getElementById(id).classList.add('item-goal--active');\n};\n\nvar toggleContextMenu = function toggleContextMenu(item) {\n    item.querySelector(_domStrings2.default.itemContextMenu).classList.toggle(_domStrings2.default._contextMenuStatusOpen);\n};\n\nexports.default = {\n    getDOMStrings: getDOMStrings,\n    getNewGoalName: getNewGoalName,\n    getNewSubgoalName: getNewSubgoalName,\n    clearFields: clearFields,\n    addNewGoal: addNewGoal,\n    addNewSubgoal: addNewSubgoal,\n    deleteItem: deleteItem,\n    updateItemProgress: updateItemProgress,\n    completeItem: completeItem,\n    updateHeader: updateHeader,\n    updateSubgoalsList: updateSubgoalsList,\n    updateComment: updateComment,\n    getActiveItemID: getActiveItemID,\n    changeActiveItem: changeActiveItem,\n    setActiveGoal: setActiveGoal,\n    toggleContextMenu: toggleContextMenu\n};\n\n//# sourceURL=webpack:///./js/UI-controller.js?");

/***/ }),

/***/ "./js/controller.js":
/*!**************************!*\
  !*** ./js/controller.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dataController = __webpack_require__(/*! ./data-controller */ \"./js/data-controller.js\");\n\nvar _dataController2 = _interopRequireDefault(_dataController);\n\nvar _UIController = __webpack_require__(/*! ./UI-controller */ \"./js/UI-controller.js\");\n\nvar _UIController2 = _interopRequireDefault(_UIController);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// ----- LISTENERS ----- //\n(function () {\n    var DOM = _UIController2.default.getDOMStrings();\n\n    var itemListListener = function itemListListener(_ref) {\n        var className = _ref.className,\n            parent = _ref.parentNode;\n\n        // CONTEXT MENU\n        if (className.includes(DOM._btnMoreOptions)) ctrTaggleContextMenu(parent);\n\n        // EDIT item\n        if (className.includes(DOM._btnEditItem)) ctrEditItem(parent.parentNode.parentNode);\n    };\n\n    // ---- Press ENTER ----\n    document.addEventListener('keypress', function (event) {\n        if (event.keyCode === 13 || event.which === 13) {\n            ctrAddGoal();\n            ctrAddSubgoal();\n        }\n        console.log(_dataController2.default.test());\n    });\n\n    // ---- Click on btn <Add new goal>  ----\n    document.querySelector(DOM.btnAddGoal).addEventListener('click', ctrAddGoal);\n\n    // ---- Click on btn <Add new subgoal>  ----\n    document.querySelector(DOM.btnAddSubgoal).addEventListener('click', ctrAddSubgoal);\n\n    document.querySelector(DOM.goalsList).addEventListener('click', function (_ref2) {\n        var target = _ref2.target;\n\n        // ---- Click on <Complete goal>  ----\n        if (target.type === 'checkbox') ctrCompleteGoal(target.parentNode);\n\n        // ---- Click on <another goal>  ----\n        if (target.className.includes(DOM._itemName)) showItem(parseInt(target.parentNode.id));\n\n        // DELETE item\n        if (target.className.includes(DOM._btnDeleteItem)) ctrDeleteGoal(target.parentNode.parentNode.parentNode);\n\n        itemListListener(target);\n    });\n\n    document.querySelector(DOM.subgoalList).addEventListener('click', function (_ref3) {\n        var target = _ref3.target;\n\n        itemListListener(event.target);\n\n        // ---- Click on <another subgoal>  ----\n        if (target.className.includes(DOM._itemName)) updateRightPanel(parseInt(target.parentNode.id));\n\n        // DELETE item\n        if (target.className.includes(DOM._btnDeleteItem)) ctrDeleteItem(event.target.parentNode.parentNode.parentNode);\n    });\n\n    // COMMENT\n    document.querySelector(DOM.itemComment).addEventListener('change', function (_ref4) {\n        var target = _ref4.target;\n\n        ctrUpdateComment(target.value);\n    });\n})();\n\nvar ctrAddGoal = function ctrAddGoal() {\n    // UI: Get goal name\n    var name = _UIController2.default.getNewGoalName();\n\n    if (name) {\n        // Data: Add new item\n        var item = _dataController2.default.addItem(name);\n\n        // UI: Goal list - add new item\n        _UIController2.default.addNewGoal(item.id, name);\n\n        // Change active item\n        showItem(item.id);\n\n        // UI: Clear field\n        _UIController2.default.clearFields();\n    }\n};\n\nvar ctrAddSubgoal = function ctrAddSubgoal() {\n    // UI: Get subgoal name\n    var name = _UIController2.default.getNewSubgoalName();\n\n    // UI: Get active item\n    var parentID = _dataController2.default.getActiveItem();\n\n    if (name) {\n        // Data: add item\n        var item = _dataController2.default.addItem(name, parentID);\n\n        // UI: Subgoal list - add new item\n        _UIController2.default.addNewSubgoal(item.id, name);\n        _UIController2.default.clearFields();\n    }\n};\n\nvar ctrDeleteItem = function ctrDeleteItem(item) {\n    var id = parseInt(item.id);\n\n    // Data: delete item\n    _dataController2.default.deleteItem(id);\n\n    // UI: delete item\n    _UIController2.default.deleteItem(id);\n};\n\nvar ctrDeleteGoal = function ctrDeleteGoal(item) {\n    var id = parseInt(item.id);\n    var activeItem = _dataController2.default.getNextItemID(id);\n\n    ctrDeleteItem(item);\n\n    // change active item\n    if (activeItem != null) updateRightPanel(activeItem);\n};\n\nvar ctrEditItem = function ctrEditItem(item) {\n    //\n};\n\nvar ctrCompleteGoal = function ctrCompleteGoal(item) {\n    var id = parseInt(item.id);\n\n    // Data: complete item\n    _dataController2.default.completeItem(id);\n\n    // Data: update item progress\n    _dataController2.default.calcItemProgress(id);\n    var progress = _dataController2.default.getItemByID(id).progress;\n\n    // UI: update progress\n    _UIController2.default.updateItemProgress(id, progress);\n\n    // UI: update item's visible \n    _UIController2.default.completeItem(item);\n};\n\nvar ctrUpdateComment = function ctrUpdateComment(comment) {\n    _dataController2.default.setComment(_UIController2.default.getActiveItemID(), comment);\n};\n\nvar ctrTaggleContextMenu = function ctrTaggleContextMenu(item) {\n    _UIController2.default.toggleContextMenu(item);\n};\n\nvar showItem = function showItem(id) {\n    // set Active Goal\n    _UIController2.default.setActiveGoal(id);\n\n    updateRightPanel(id);\n};\n\nvar updateRightPanel = function updateRightPanel(id) {\n    // Data get item \n    var item = _dataController2.default.getItemByID(id);\n\n    _dataController2.default.setActiveItem(id);\n\n    // UI: Change active item\n    _UIController2.default.changeActiveItem(id);\n\n    // UI: Header - update name, progress\n    _UIController2.default.updateHeader(item.name, item.progress);\n\n    // UI: Subgoal list - update\n    _UIController2.default.updateSubgoalsList(item.subItems);\n\n    // UI: Comment - update\n    _UIController2.default.updateComment(item.comment);\n};\n\n//# sourceURL=webpack:///./js/controller.js?");

/***/ }),

/***/ "./js/data-controller.js":
/*!*******************************!*\
  !*** ./js/data-controller.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// DATA CONTROLLER\nvar Item = function () {\n    function Item(id, name) {\n        _classCallCheck(this, Item);\n\n        this.id = id;\n        this.name = name;\n\n        this.status = false;\n        this.progress = 0;\n        this.subItems = [];\n        this.comment = '';\n    }\n\n    _createClass(Item, [{\n        key: 'complete',\n        value: function complete() {\n            this.status = true;\n        }\n    }, {\n        key: 'calcProgress',\n        value: function calcProgress() {\n            if (this.status) {\n                this.progress = 100;\n            } else {\n                /// \n            }\n        }\n    }]);\n\n    return Item;\n}();\n\nvar items = [];\nvar activeItem = void 0;\nvar activeGoal = void 0;\n\nvar findItemByID = function findItemByID(id) {\n    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : items;\n\n    var target = void 0;\n\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n        for (var _iterator = parent[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var item = _step.value;\n\n            if (item.id === id) return { item: item, parent: parent };\n\n            if (item.subItems.length) {\n                target = findItemByID(id, item.subItems);\n                if (target.item) return { item: target.item, parent: target.parent };\n            }\n        }\n    } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n            }\n        } finally {\n            if (_didIteratorError) {\n                throw _iteratorError;\n            }\n        }\n    }\n\n    return null;\n};\n\nvar findSiblingItem = function findSiblingItem(id) {\n    var parent = findItemByID(id).parent;\n\n    if (parent && parent.length > 1) {\n        var itemIndex = parent.findIndex(function (item) {\n            return item.id === id;\n        });\n\n        if (parent[itemIndex + 1]) return parent[itemIndex + 1];else return parent[itemIndex - 1];\n    }\n    return null;\n};\n\nvar renderID = function renderID() {\n    if (!items.length) return 1;\n\n    var maxId = 0;\n\n    var findMaxID = function findMaxID(items) {\n        items.forEach(function (el) {\n            if (maxId < el.id) maxId = el.id;\n\n            if (el.subItems.length) findMaxID(el.subItems);\n        });\n    };\n\n    findMaxID(items);\n    return maxId + 1;\n};\n\nvar addItem = function addItem(name, parent) {\n    console.log(parent);\n    var id = renderID();\n    var newItem = new Item(id, name);\n\n    if (parent) {\n        console.log('return: ', findItemByID(parent));\n        console.log('el: ', findItemByID(parent).item);\n        findItemByID(parent).item.subItems.push(newItem);\n    } else {\n        items.push(newItem);\n    }\n\n    return newItem;\n};\n\nvar deleteItem = function deleteItem(id) {\n    var _findItemByID = findItemByID(id),\n        item = _findItemByID.item,\n        parent = _findItemByID.parent;\n\n    parent.splice(parent.indexOf(item), 1);\n};\n\nvar completeItem = function completeItem(id) {\n    findItemByID(id).item.complete();\n};\n\nvar calcItemProgress = function calcItemProgress(id) {\n    findItemByID(id).item.calcProgress();\n};\n\nvar getItemByID = function getItemByID(id) {\n    return findItemByID(id).item;\n};\n\nvar getActiveItem = function getActiveItem(id) {\n    return activeItem;\n};\n\nvar getActiveGoal = function getActiveGoal() {\n    return activeGoal;\n};\n\nvar getNextItemID = function getNextItemID(id) {\n    if (findSiblingItem(id)) return findSiblingItem(id).id;\n\n    return null;\n};\n\nvar setComment = function setComment(id, comment) {\n    findItemByID(id).item.comment = comment;\n};\n\nvar setActiveItem = function setActiveItem(id) {\n    activeItem = id;\n};\n\nvar setActiveGoal = function setActiveGoal(id) {\n    activeGoal = id;\n};\n\nexports.default = {\n    addItem: addItem,\n    deleteItem: deleteItem,\n    completeItem: completeItem,\n    calcItemProgress: calcItemProgress,\n    getItemByID: getItemByID,\n    getActiveItem: getActiveItem,\n    getActiveGoal: getActiveGoal,\n    getNextItemID: getNextItemID,\n    setComment: setComment,\n    setActiveItem: setActiveItem,\n    setActiveGoal: setActiveGoal,\n    test: function test() {\n        return items;\n    }\n\n    // test: function () {\n    //     const item1 = new Item(1, 'g1');\n    //     const item2 = new Item(2, 'g2');\n    //     const item3 = new Item(3, 'g3');\n    //     items = [item1, item2, item3];\n\n    //     const subItem1 = new Item(4, 'sub1');\n    //     const subItem2 = new Item(5, 'sub2');\n    //     const subItem3 = new Item(6, 'sub3');\n\n    //     const subItem4 = new Item(7, 'subsub1');\n    //     const subItem5 = new Item(8, 'subsub2');\n    //     const subItem6 = new Item(9, 'subsub3');\n\n    //     item1.subItems.push(subItem1);\n    //     item2.subItems.push(subItem2);\n    //     item2.subItems.push(subItem3);\n\n    //     subItem3.subItems.push(subItem4);\n    //     subItem3.subItems.push(subItem5);\n    //     subItem3.subItems.push(subItem6);\n\n    //     console.log(items);\n    //     var item = findItemByID(8);\n    //     return item.name;\n\n    // },\n\n};\n\n//# sourceURL=webpack:///./js/data-controller.js?");

/***/ }),

/***/ "./js/dom-strings.js":
/*!***************************!*\
  !*** ./js/dom-strings.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = {\n    // ----ITEM properties----\n    itemProgress: '.item__progress',\n    itemComment: '.comment',\n    itemStateActive: '.item--active',\n    itemContextMenu: '.more-options__menu',\n\n    // ----LEFT----\n    btnAdd: '.item-add__btn',\n    btnAddGoal: '.goal-add__btn',\n    inputNewGoalName: '.goal-add__input',\n    goalsList: '.goal-list',\n\n    // ----RIGHT----\n    // header\n    headerName: '.item-active__name',\n    headerProgress: '.item-active__progress',\n\n    // subgoals\n    btnAddSubgoal: '.subgoal-add__btn',\n    inputNewSubgoalName: '.subgoal-add__input',\n    subgoalList: '.subgoal-list',\n\n    //----Names of classes----\n    // item\n    _itemName: 'item__name',\n    _itemStatusActive: 'item--active',\n    _itemStatusCompleted: 'item--completed',\n    _itemProgress: 'item__progress',\n\n    // context menu\n    _btnMoreOptions: 'more-options__btn',\n    _contextMenuStatusOpen: 'menu--active',\n    _btnDeleteItem: 'menu__delete',\n    _btnEditItem: 'menu__edit'\n};\n\n//# sourceURL=webpack:///./js/dom-strings.js?");

/***/ }),

/***/ "./js/html-templetes.js":
/*!******************************!*\
  !*** ./js/html-templetes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.getItemTemplete = function (id, name) {\n    return \"<div class=\\\"item\\\" id=\\\"\" + id + \"\\\">\" + (\"<input type=\\\"checkbox\\\" class=\\\"item__status--checkbox\\\" id=\\\"status-\" + id + \"\\\">\") + (\"<label for=\\\"status-\" + id + \"\\\" class=\\\"item__status--label\\\">\") + \"<i class=\\\"icon ion-checkmark\\\"></i>\" + \"</label>\" + (\"<input type=\\\"text\\\" class=\\\"item__name\\\" readonly value=\\\"\" + name + \"\\\">\") + \"<div class=\\\"item__progress\\\">---</div>\" + \"<button class=\\\"more-options__btn\\\"></button>\" + \"<div class=\\\"more-options__menu\\\">\" + \"<ul class=\\\"menu\\\">\" + \"   <li class=\\\"menu__item  menu__edit\\\">\" + \"       <i class=\\\"icon ion-edit\\\"></i>Edit\" + \"   </li>\" + \"   <li class=\\\"menu__item  menu__delete\\\">\" + \"       <i class=\\\"icon ion-trash-b\\\"></i>Delete\" + \"   </li>\" + \"</ul>\" + \"</div>\" + \"</div>\";\n};\n\n//# sourceURL=webpack:///./js/html-templetes.js?");

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