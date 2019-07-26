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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/client.ts":
/*!******************************!*\
  !*** ./client/src/client.ts ***!
  \******************************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Client\", function() { return Client; });\nclass Client {\r\n    constructor() {\r\n        this.showingUI = false;\r\n        this.firstTick = true;\r\n        this.person = -1;\r\n        SetNuiFocus(false, false);\r\n        this.SetupEvents();\r\n        this.setupTick();\r\n        let that = this;\r\n        setTimeout(function () {\r\n            if (GetConvar(\"response_debug\", 'false') === 'true') {\r\n                console.log(\"Response started setting default settings\");\r\n            }\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/SET_RESOURCE_SETTINGS\", data: { name: GetCurrentResourceName(), apiUrl: GetConvar(\"response_api_url\", \"http://localhost:8000\"), debug: GetConvar(\"response_debug\", \"true\") } }));\r\n            SendNuiMessage(JSON.stringify({ type: \"config/SET_STATE_NAME\", data: GetConvar(\"response_config_state_name\", \"sanandreas\") }));\r\n            SendNuiMessage(JSON.stringify({ type: \"config/SET_PLAYER_NAME\", data: GetPlayerName(PlayerId()) }));\r\n            that.SetupNuiCallbacks();\r\n            TriggerServerEvent(\"response:RetrieveLicense\", PlayerId());\r\n        }, 5000);\r\n    }\r\n    SetupEvents() {\r\n        onNet(\"response:ToggleUI\", () => {\r\n            if (GetConvar(\"response_debug\", \"true\") === \"true\") {\r\n                console.log(`Toggling UI ${!this.showingUI}`);\r\n            }\r\n            this.showingUI = !this.showingUI;\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/SET_VISIBILITY\", data: this.showingUI }));\r\n            SetNuiFocus(this.showingUI, this.showingUI);\r\n        });\r\n        onNet(\"response:ShowID\", (player) => {\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/CHANGE_PAGE\", data: \"/id\" }));\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/SHOW_ID\", data: player }));\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n        onNet(\"response:PersonSelect\", () => {\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/CHANGE_PAGE\", data: \"/personselect\" }));\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n        onNet(\"response:SetLicense\", (lic) => {\r\n            SendNuiMessage(JSON.stringify({ type: \"config/SET_LICENSE\", data: lic }));\r\n        });\r\n        on(\"playerSpawned\", () => {\r\n            SendNuiMessage(JSON.stringify({ type: \"nui/CHANGE_PAGE\", data: \"/personselect\" }));\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n    }\r\n    SetupNuiCallbacks() {\r\n        RegisterNuiCallbackType(\"response_showID\");\r\n        on('__cfx_nui:response_showID', (body, cb) => {\r\n            cb(true);\r\n            SendNuiMessage(JSON.stringify({ type: \"CHANGE_PAGE\", data: \"/id\" }));\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n        RegisterNuiCallbackType(\"response_person_selected\");\r\n        on('__cfx_nui:response_person_selected', (body, cb) => {\r\n            cb(true);\r\n            this.person = body.id;\r\n            TriggerServerEvent(\"response:registerPerson\", PlayerId(), this.person);\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n        RegisterNuiCallbackType(\"response_toggle_ui\");\r\n        on('__cfx_nui:response_toggle_ui', (body, cb) => {\r\n            cb(true);\r\n            TriggerEvent(\"response:ToggleUI\");\r\n        });\r\n    }\r\n    setupTick() {\r\n        setTick(function () {\r\n            if (this.firstTick) {\r\n                console.log('Running first tick');\r\n                this.firstTick = false;\r\n            }\r\n        });\r\n    }\r\n}\r\nlet client = new Client();\r\n\n\n//# sourceURL=webpack:///./client/src/client.ts?");

/***/ })

/******/ });