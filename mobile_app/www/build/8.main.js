webpackJsonp([8],{

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__behaviors_menu__ = __webpack_require__(773);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehaviorsMenuModule", function() { return BehaviorsMenuModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BehaviorsMenuModule = (function () {
    function BehaviorsMenuModule() {
    }
    return BehaviorsMenuModule;
}());
BehaviorsMenuModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__behaviors_menu__["a" /* BehaviorsMenuPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__behaviors_menu__["a" /* BehaviorsMenuPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__behaviors_menu__["a" /* BehaviorsMenuPage */]
        ]
    })
], BehaviorsMenuModule);

//# sourceMappingURL=behaviors-menu.module.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BehaviorsMenuPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BehaviorsMenuPage = (function () {
    function BehaviorsMenuPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    BehaviorsMenuPage.prototype.ngOnInit = function () {
        console.log("Init Behavior Menu");
    };
    BehaviorsMenuPage.prototype.behaviorAction = function (action) {
        if (action == "mood") {
            this.viewCtrl.dismiss({ action: 'mood' });
        }
    };
    return BehaviorsMenuPage;
}());
BehaviorsMenuPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-behaviors-menu',
        template: "\n    <ion-list  >\n      <button ion-item >\n        <ion-icon name=\"body\" item-left></ion-icon>\n        Monitor Weight\n      </button>\n      <button ion-item >\n        <ion-icon name=\"pint\" item-left></ion-icon>\n        Track Hydration\n      </button>     \n      <button ion-item >\n        <ion-icon name=\"heart\" item-left></ion-icon>\n        Monitor BP\n      </button>\n      <button ion-item >\n        <ion-icon name=\"walk\" item-left></ion-icon>\n        Track Activity\n      </button>\n      <button ion-item >\n        <ion-icon name=\"medical\" item-left></ion-icon>\n        Monitor Blood Glucose\n      </button>\n      <button ion-item (click)=\"behaviorAction('mood')\">\n        <ion-icon name=\"happy\" item-left></ion-icon>\n        Track Mood\n      </button>\n      <button ion-item >\n        <ion-icon name=\"beaker\" item-left></ion-icon>\n        Take Medication\n      </button>\n    </ion-list>\n  ",
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
], BehaviorsMenuPage);

//# sourceMappingURL=behaviors-menu.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map