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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.activeChangeName = exports.activeAddSubgoal = exports.hideUpButton = exports.showUpButton = exports.closeContextMenu = exports.toggleContextMenu = exports.changeActiveGoal = exports.updateComment = exports.updateSubgoalsList = exports.updateHeader = exports.completeItem = exports.updateItemStatus = exports.updateItemProgress = exports.deleteItem = exports.addNewItem = exports.clearFields = exports.getItemName = exports.getNewItemName = undefined;\n\nvar _domStrings = __webpack_require__(/*! ./dom-strings */ \"./js/dom-strings.js\");\n\nvar _htmlTempletes = __webpack_require__(/*! ./html-templetes */ \"./js/html-templetes.js\");\n\nvar getNewItemName = function getNewItemName(type) {\n    return _domStrings.elements.inputNewItemName(type).value;\n};\n\nvar getItemName = function getItemName(id) {\n    return Array.from(document.getElementById(id).childNodes).find(function (el) {\n        return el.className === _domStrings.elementStrings.itemName;\n    }).value;\n};\n\nvar clearFields = function clearFields() {\n    _domStrings.elements.inputNewItemName('goal').value = '';\n    _domStrings.elements.inputNewItemName('subgoal').value = '';\n};\n\nvar addNewItem = function addNewItem(id, name, type) {\n    (0, _htmlTempletes.renderItem)({ id: id, name: name }, _domStrings.elements.itemsList(type));\n};\n\nvar deleteItem = function deleteItem(id) {\n    var item = document.getElementById(id);\n    item.parentNode.removeChild(item);\n};\n\nvar updateItemProgress = function updateItemProgress(id, progress) {\n    if (!progress) progress = '---';else progress = progress + '%';\n\n    document.getElementById(id).childNodes.forEach(function (element) {\n        if (element.className === _domStrings.elementStrings.itemProgress) element.textContent = progress;\n    });\n};\n\nvar updateItemStatus = function updateItemStatus(id, status) {\n    document.getElementById(id).childNodes.forEach(function (element) {\n        if (element.className === _domStrings.elementStrings.itemStatus) element.checked = status;\n    });\n};\n\nvar completeItem = function completeItem(id) {\n    document.getElementById(id).classList.add(_domStrings.elementStrings.itemStatusCompleted);\n};\n\nvar updateHeader = function updateHeader(name) {\n    var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n    _domStrings.elements.headerName.textContent = name;\n    _domStrings.elements.headerProgress.value = progress;\n};\n\nvar updateSubgoalsList = function updateSubgoalsList() {\n    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    _domStrings.elements.itemsList('subgoal').innerHTML = '';\n    list.forEach(function (item) {\n        return (0, _htmlTempletes.renderItem)(item, _domStrings.elements.itemsList('subgoal'));\n    });\n};\n\nvar updateComment = function updateComment() {\n    var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n    _domStrings.elements.itemComment.value = comment;\n};\n\nvar changeActiveGoal = function changeActiveGoal(id) {\n    var previousItem = document.querySelector('.' + _domStrings.elementStrings.stateGoalActive);\n\n    if (previousItem) {\n        previousItem.classList.remove(_domStrings.elementStrings.stateGoalActive);\n    }\n\n    document.getElementById(id).classList.add(_domStrings.elementStrings.stateGoalActive);\n};\n\nvar toggleContextMenu = function toggleContextMenu(item) {\n    if (item.querySelector('.' + _domStrings.elementStrings.contextMenu)) closeContextMenu();else (0, _htmlTempletes.renderContextMenu)(item);\n};\n\nvar closeContextMenu = function closeContextMenu() {\n    var contextMenu = document.querySelector('.' + _domStrings.elementStrings.contextMenu);\n    contextMenu.parentNode.removeChild(contextMenu);\n};\n\nvar showUpButton = function showUpButton() {\n    _domStrings.elements.btnUp.classList.add(_domStrings.elementStrings.btnUpActive);\n};\n\nvar hideUpButton = function hideUpButton() {\n    _domStrings.elements.btnUp.classList.remove(_domStrings.elementStrings.btnUpActive);\n};\n\nvar activeAddSubgoal = function activeAddSubgoal(isActive) {\n    _domStrings.elements.inputNewItemName('subgoal').readOnly = !isActive;\n};\n\nvar activeChangeName = function activeChangeName(item, isActive) {\n\n    var itemName = Array.from(item.childNodes).find(function (el) {\n        return el.className === _domStrings.elementStrings.itemName;\n    });\n\n    itemName.readOnly = !isActive;\n\n    if (isActive) itemName.focus();\n};\n\nexports.getNewItemName = getNewItemName;\nexports.getItemName = getItemName;\nexports.clearFields = clearFields;\nexports.addNewItem = addNewItem;\nexports.deleteItem = deleteItem;\nexports.updateItemProgress = updateItemProgress;\nexports.updateItemStatus = updateItemStatus;\nexports.completeItem = completeItem;\nexports.updateHeader = updateHeader;\nexports.updateSubgoalsList = updateSubgoalsList;\nexports.updateComment = updateComment;\nexports.changeActiveGoal = changeActiveGoal;\nexports.toggleContextMenu = toggleContextMenu;\nexports.closeContextMenu = closeContextMenu;\nexports.showUpButton = showUpButton;\nexports.hideUpButton = hideUpButton;\nexports.activeAddSubgoal = activeAddSubgoal;\nexports.activeChangeName = activeChangeName;\n\n//# sourceURL=webpack:///./js/UI-controller.js?");

/***/ }),

/***/ "./js/controller.js":
/*!**************************!*\
  !*** ./js/controller.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dataController = __webpack_require__(/*! ./data-controller */ \"./js/data-controller.js\");\n\nvar DataController = _interopRequireWildcard(_dataController);\n\nvar _UIController = __webpack_require__(/*! ./UI-controller */ \"./js/UI-controller.js\");\n\nvar UIController = _interopRequireWildcard(_UIController);\n\nvar _domStrings = __webpack_require__(/*! ./dom-strings */ \"./js/dom-strings.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar ctrAddItem = function ctrAddItem(type) {\n    var item = void 0,\n        parentID = void 0;\n    var name = UIController.getNewItemName(type);\n\n    if (name) {\n        switch (type) {\n            case 'goal':\n                item = DataController.addItem(name);\n                UIController.addNewItem(item.id, name, type);\n                ctrChangeActiveItem(item);\n                ctrSetActiveGoal(item.id);\n                UIController.activeAddSubgoal(true);\n                UIController.hideUpButton();\n                break;\n\n            case 'subgoal':\n                parentID = DataController.getActiveItem();\n                item = DataController.addItem(name, parentID);\n                UIController.addNewItem(item.id, name, type);\n\n                ctrUpdateParents(item.id);\n                var breadCrumbs = DataController.getBreadCrumbs(parentID);\n                UIController.updateHeader(breadCrumbs, DataController.getItemByID(parentID).progress);\n                break;\n        }\n\n        // UI: Clear field\n        UIController.clearFields();\n    }\n};\n\nvar ctrGoUp = function ctrGoUp() {\n    var activeItem = DataController.getActiveItem();\n    var activeGoal = DataController.getActiveGoal();\n\n    activeItem = DataController.getItemParent(activeItem);\n    ctrChangeActiveItem(activeItem);\n\n    if (activeGoal === activeItem.id) UIController.hideUpButton();\n};\n\nvar ctrInit = function ctrInit() {\n    DataController.setDefaultSettings();\n    UIController.updateHeader('Welcome');\n    UIController.updateSubgoalsList();\n    UIController.updateComment();\n\n    // Add subgoal = Read Only\n    UIController.activeAddSubgoal(false);\n};\n\n// ----- LISTENERS ----- //\n(function () {\n    // ---- Press ENTER ----\n    document.addEventListener('keypress', function (event) {\n        if (event.keyCode === 13 || event.which === 13) {\n            ctrAddItem('goal');\n            ctrAddItem('subgoal');\n\n            if (event.target.className.includes(_domStrings.elementStrings.itemName)) ctrSaveItem(event.target.parentNode);\n        }\n    });\n\n    var setListeners = function setListeners(type) {\n        // ---- Click on btn <Add new ...>  ----\n        _domStrings.elements.btnAddItem(type).addEventListener('click', ctrAddItem.bind(null, type));\n\n        _domStrings.elements.itemsList(type).addEventListener('click', function (_ref) {\n            var target = _ref.target;\n            var className = target.className;\n\n            var item = target.closest('.' + _domStrings.elementStrings.item);\n\n            // ---- Click on <another item>  ----\n            if (className.includes(_domStrings.elementStrings.itemName)) ctrClickOn(item, type);\n\n            // CONTEXT MENU\n            var btnMoreOptions = target.closest('.' + _domStrings.elementStrings.btnMoreOptions);\n            if (btnMoreOptions) ctrToggleContextMenu(item);\n\n            // EDIT item\n            if (className.includes(_domStrings.elementStrings.btnEditItem)) ctrEditItem(item);\n\n            // DELETE item\n            if (className.includes(_domStrings.elementStrings.btnDeleteItem)) ctrDeleteItem(item, type);\n\n            // COMPLETE ITEM\n            var checkboxStatus = target.closest('.' + _domStrings.elementStrings.itemStatus);\n            if (checkboxStatus) ctrCompleteItem(item, type);\n        });\n    };\n\n    // COMMENT\n    _domStrings.elements.itemComment.addEventListener('change', function (_ref2) {\n        var target = _ref2.target;\n\n        ctrUpdateComment(target.value);\n    });\n\n    _domStrings.elements.btnUp.addEventListener('click', ctrGoUp);\n\n    setListeners('goal');\n    setListeners('subgoal');\n    ctrInit();\n})();\n\nvar ctrChangeActiveItem = function ctrChangeActiveItem(_ref3) {\n    var id = _ref3.id,\n        name = _ref3.name,\n        progress = _ref3.progress,\n        subItems = _ref3.subItems,\n        comment = _ref3.comment;\n\n    DataController.setActiveItem(id);\n\n    name = DataController.getBreadCrumbs(id);\n    UIController.updateHeader(name, progress);\n    UIController.updateSubgoalsList(subItems);\n    UIController.updateComment(comment);\n};\n\nvar ctrSetActiveGoal = function ctrSetActiveGoal(id) {\n    DataController.setActiveGoal(id);\n    UIController.changeActiveGoal(id);\n};\n\nvar ctrClickOn = function ctrClickOn(itemDOM, block) {\n    var ID = parseInt(itemDOM.id);\n    var item = DataController.getItemByID(ID);\n\n    switch (block) {\n        case 'goal':\n            ctrSetActiveGoal(ID);\n            UIController.hideUpButton();\n            break;\n        case 'subgoal':\n            UIController.showUpButton();\n            break;\n    }\n\n    ctrChangeActiveItem(item);\n};\n\nvar ctrDeleteItem = function ctrDeleteItem(item, type) {\n    var ID = parseInt(item.id);\n\n    switch (type) {\n        case 'goal':\n            var activeItem = DataController.getNextItem(ID);\n            if (activeItem != null) {\n                ctrChangeActiveItem(activeItem);\n                ctrSetActiveGoal(activeItem.id);\n            } else {\n                ctrInit();\n            }\n            break;\n    }\n\n    DataController.deleteItem(ID);\n    UIController.deleteItem(ID);\n};\n\nvar ctrEditItem = function ctrEditItem(item) {\n    UIController.activeChangeName(item, true);\n    UIController.closeContextMenu(item);\n};\n\nvar ctrSaveItem = function ctrSaveItem(itemDOM) {\n    var ID = parseInt(itemDOM.id);\n\n    var name = UIController.getItemName(ID);\n    var item = DataController.getItemByID(ID);\n    item.name = name;\n\n    UIController.activeChangeName(itemDOM, false);\n\n    if (ID === DataController.getActiveItem()) UIController.updateHeader(name, item.progress);\n};\n\nvar ctrCompleteItem = function ctrCompleteItem(item, type) {\n    var id = parseInt(item.id);\n\n    // Data: update status, progress\n    DataController.completeItem(id);\n    DataController.calcItemProgress(id);\n\n    // UI: update progress\n\n    var _DataController$getIt = DataController.getItemByID(id),\n        name = _DataController$getIt.name,\n        progress = _DataController$getIt.progress;\n\n    UIController.updateItemProgress(id, progress);\n\n    //calc Progress of parents, update progress \n    switch (type) {\n        case 'subgoal':\n            // calc parent progress\n            ctrUpdateParents(id);\n            break;\n        case 'goal':\n            // update Header\n            if (DataController.getActiveItem() === id) UIController.updateHeader(name, progress);\n            break;\n    };\n\n    // Update item's visible \n    UIController.completeItem(id);\n};\n\nvar ctrUpdateParents = function ctrUpdateParents(id) {\n    var activeGoal = DataController.getActiveGoal();\n    var parentID = null,\n        parent = void 0;\n\n    // CALC ALL PARENT'S PROGRESS\n    while (parentID !== activeGoal) {\n        parent = DataController.getItemParent(id);\n        parentID = parent.id;\n        DataController.calcItemProgress(parentID);\n        DataController.calcItemStatus(parentID);\n        id = parentID;\n    }\n\n    // UPDATE GOAL\n    UIController.updateItemProgress(parentID, parent.progress);\n    if (parent.progress === 100) UIController.completeItem(parentID);\n\n    // UPDATE HEADER\n    var activeItem = DataController.getItemByID(DataController.getActiveItem());\n    var breadCrumbs = DataController.getBreadCrumbs(activeItem.id);\n    UIController.updateHeader(breadCrumbs, activeItem.progress);\n};\n\nvar ctrUpdateComment = function ctrUpdateComment(comment) {\n    DataController.setComment(DataController.getActiveItem(), comment);\n};\n\nvar ctrToggleContextMenu = function ctrToggleContextMenu(item) {\n    UIController.toggleContextMenu(item);\n};\n\n//# sourceURL=webpack:///./js/controller.js?");

/***/ }),

/***/ "./js/data-controller.js":
/*!*******************************!*\
  !*** ./js/data-controller.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// DATA CONTROLLER\nvar Item = function () {\n    function Item(id, name) {\n        _classCallCheck(this, Item);\n\n        this.id = id;\n        this.name = name;\n\n        this.status = false;\n        this.progress = 0;\n        this.subItems = [];\n        this.comment = '';\n    }\n\n    _createClass(Item, [{\n        key: 'complete',\n        value: function complete() {\n            this.status = true;\n        }\n    }, {\n        key: 'calcProgress',\n        value: function calcProgress() {\n            if (this.status) {\n                this.progress = 100;\n            } else {\n                var totalSubs = this.subItems.length;\n\n                if (!totalSubs) {\n                    this.progress = 0;\n                } else {\n                    var completedSubs = this.subItems.filter(function (el) {\n                        return el.status;\n                    }).length;\n\n                    this.progress = Math.floor(completedSubs / totalSubs * 100);\n                }\n            }\n        }\n    }, {\n        key: 'calcStatus',\n        value: function calcStatus() {\n            if (this.progress === 100) this.status = true;\n        }\n    }]);\n\n    return Item;\n}();\n\nvar items = void 0,\n    activeItem = void 0,\n    activeGoal = void 0;\n\nvar setDefaultSettings = function setDefaultSettings() {\n    items = [];\n    activeItem = null;\n    activeGoal = null;\n};\n\nvar getItems = function getItems() {\n    return items;\n};\n\nvar findItemSubs = function findItemSubs(parent) {\n    return parent ? parent.subItems : items;\n};\n\nvar findItemByID = function findItemByID(id) {\n    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n    var itemList = void 0,\n        item = void 0;\n\n    itemList = findItemSubs(parent);\n\n    for (var itemPosition in itemList) {\n        var _item = itemList[itemPosition];\n\n        if (_item.id === id) return { item: _item, parent: parent, itemPosition: itemPosition };\n\n        if (_item.subItems.length) {\n            var target = findItemByID(id, _item);\n            if (target.item) return target;\n        }\n    };\n\n    return { item: null, parent: null, itemPosition: null };;\n};\n\nvar findSiblingItem = function findSiblingItem(id) {\n    var item = findItemByID(id);\n    var itemPosition = parseInt(item.itemPosition);\n\n    var parentSubs = findItemSubs(item.parent);\n\n    if (parentSubs && parentSubs.length > 1) return parentSubs[itemPosition + 1] || parentSubs[itemPosition - 1];\n\n    return null;\n};\n\nvar renderID = function renderID() {\n    if (!items.length) return 1;\n\n    var maxId = 0;\n\n    var findMaxID = function findMaxID(items) {\n        items.forEach(function (el) {\n            if (maxId < el.id) maxId = el.id;\n\n            if (el.subItems.length) findMaxID(el.subItems);\n        });\n    };\n    findMaxID(items);\n\n    return maxId + 1;\n};\n\nvar addItem = function addItem(name, parent) {\n    var ID = renderID();\n    var newItem = new Item(ID, name);\n\n    if (parent) {\n        findItemByID(parent).item.subItems.push(newItem);\n    } else {\n        items.push(newItem);\n    }\n\n    return newItem;\n};\n\nvar deleteItem = function deleteItem(id) {\n    var _findItemByID = findItemByID(id),\n        parent = _findItemByID.parent,\n        itemPosition = _findItemByID.itemPosition;\n\n    findItemSubs(parent).splice(itemPosition, 1);\n};\n\nvar completeItem = function completeItem(id) {\n    findItemByID(id).item.complete();\n};\n\nvar calcItemProgress = function calcItemProgress(id) {\n    findItemByID(id).item.calcProgress();\n};\n\nvar calcItemStatus = function calcItemStatus(id) {\n    findItemByID(id).item.calcStatus();\n};\n\nvar getItemByID = function getItemByID(id) {\n    return findItemByID(id).item;\n};\n\nvar getItemParent = function getItemParent(id) {\n    return findItemByID(id).parent;\n};\n\nvar getAllItemParents = function getAllItemParents(id) {\n    var parents = [];\n\n    while (id) {\n        parent = getItemParent(id);\n        if (parent) parents.push(parent);\n\n        id = parent;\n    }\n    return parents;\n};\n\nvar getActiveItem = function getActiveItem(id) {\n    return activeItem;\n};\n\nvar getActiveGoal = function getActiveGoal() {\n    return activeGoal;\n};\n\nvar getNextItem = function getNextItem(id) {\n    return findSiblingItem(id);\n};\n\nvar setComment = function setComment(id, comment) {\n    findItemByID(id).item.comment = comment;\n};\n\nvar setActiveItem = function setActiveItem(id) {\n    activeItem = id;\n};\n\nvar setActiveGoal = function setActiveGoal(id) {\n    activeGoal = id;\n};\n\nvar getBreadCrumbs = function getBreadCrumbs(id) {\n    var itemParam = findItemByID(id);\n\n    var parent = itemParam.parent;\n    var name = itemParam.item.name;\n    var count = 2;\n\n    while (parent !== null) {\n        if (count > 0) name = parent.name + ' / ' + name;else if (count === 0) name = '... / ' + name;\n\n        id = parent.id;\n        parent = findItemByID(id).parent;\n        count--;\n    }\n    return name;\n};\n\nexports.addItem = addItem;\nexports.deleteItem = deleteItem;\nexports.completeItem = completeItem;\nexports.calcItemProgress = calcItemProgress;\nexports.calcItemStatus = calcItemStatus;\nexports.getItemByID = getItemByID;\nexports.getItemParent = getItemParent;\nexports.getAllItemParents = getAllItemParents;\nexports.getActiveItem = getActiveItem;\nexports.getActiveGoal = getActiveGoal;\nexports.getNextItem = getNextItem;\nexports.setComment = setComment;\nexports.setActiveItem = setActiveItem;\nexports.setActiveGoal = setActiveGoal;\nexports.getBreadCrumbs = getBreadCrumbs;\nexports.setDefaultSettings = setDefaultSettings;\nexports.getItems = getItems;\n\n//# sourceURL=webpack:///./js/data-controller.js?");

/***/ }),

/***/ "./js/dom-strings.js":
/*!***************************!*\
  !*** ./js/dom-strings.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar elementStrings = exports.elementStrings = {\n    item: 'item',\n    itemName: 'item__name',\n    itemProgress: 'item__progress',\n    itemStatus: 'item__status--checkbox',\n    itemStatusLabel: 'item__status--label',\n    itemStatusCompleted: 'item--completed',\n    stateGoalActive: 'item-goal--active',\n    btnUpActive: 'btn-up--active',\n\n    btnMoreOptions: 'more-options__btn',\n    contextMenu: 'more-options__menu',\n    contextMenuList: 'menu',\n    contextMenuItem: 'menu__item',\n    btnDeleteItem: 'menu__delete',\n    btnEditItem: 'menu__edit'\n};\n\nvar elements = exports.elements = {\n    // ----ITEM properties----\n    itemProgress: document.querySelector('.' + elementStrings.itemProgress),\n    itemComment: document.querySelector('.comment'),\n    itemContextMenu: document.querySelector('.' + elementStrings.contextMenu),\n\n    // goals\n    btnAdd: document.querySelector('.item-add__btn'),\n    btnAddItem: function btnAddItem(type) {\n        return document.querySelector('.' + type + '-add__btn');\n    },\n    inputNewItemName: function inputNewItemName(type) {\n        return document.querySelector('.' + type + '-add__input');\n    },\n    itemsList: function itemsList(type) {\n        return document.querySelector('.' + type + '-list');\n    },\n\n    // header\n    headerName: document.querySelector('.item-active__name'),\n    headerProgress: document.querySelector('.item-active__progress'),\n\n    btnUp: document.querySelector('.btn-up')\n};\n\n//# sourceURL=webpack:///./js/dom-strings.js?");

/***/ }),

/***/ "./js/html-templetes.js":
/*!******************************!*\
  !*** ./js/html-templetes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.renderContextMenu = exports.renderItem = undefined;\n\nvar _domStrings = __webpack_require__(/*! ./dom-strings */ \"./js/dom-strings.js\");\n\nvar renderItem = exports.renderItem = function renderItem(_ref, parent) {\n    var id = _ref.id,\n        name = _ref.name,\n        progress = _ref.progress,\n        status = _ref.status;\n\n    var className = _domStrings.elementStrings.item;\n    progress ? progress = progress + '%' : progress = '---';\n    if (status) className += ' ' + _domStrings.elementStrings.itemStatusCompleted;\n\n    var newItem = '<div class=\"' + className + '\" id=\"' + id + '\">\\n                <input type=\"checkbox\" class=\"' + _domStrings.elementStrings.itemStatus + '\" id=\"status-' + id + '\">\\n                <label for=\"status-' + id + '\" class=\"' + _domStrings.elementStrings.itemStatusLabel + '\">\\n                    <i class=\"icon ion-checkmark\"></i>\\n                </label>\\n                <input type=\"text\" class=\"' + _domStrings.elementStrings.itemName + '\" readonly value=\"' + name + '\">\\n                <div class=\"' + _domStrings.elementStrings.itemProgress + '\">\\n                    ' + progress + '\\n                </div>\\n                <button class=\"' + _domStrings.elementStrings.btnMoreOptions + '\"></button>\\n            <div>';\n\n    parent.insertAdjacentHTML('beforeend', newItem);\n};\n\nvar renderContextMenu = exports.renderContextMenu = function renderContextMenu(parent) {\n    var html = '\\n        <div class=\"' + _domStrings.elementStrings.contextMenu + '\">\\n            <ul class=\"' + _domStrings.elementStrings.contextMenuList + '\">\\n                <li class=\"' + _domStrings.elementStrings.contextMenuItem + '  ' + _domStrings.elementStrings.btnEditItem + '\">\\n                    <i class=\"icon ion-edit\"></i>Edit\\n                </li>\\n                <li class=\"' + _domStrings.elementStrings.contextMenuItem + '  ' + _domStrings.elementStrings.btnDeleteItem + '\">\\n                    <i class=\"icon ion-trash-b\"></i>Delete\\n                </li>\\n            </ul>\\n        </div>';\n\n    parent.insertAdjacentHTML('beforeend', html);\n};\n\n//# sourceURL=webpack:///./js/html-templetes.js?");

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