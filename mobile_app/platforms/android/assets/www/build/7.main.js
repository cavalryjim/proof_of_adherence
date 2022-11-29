webpackJsonp([7],{

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__behaviors__ = __webpack_require__(772);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehaviorsModule", function() { return BehaviorsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BehaviorsModule = (function () {
    function BehaviorsModule() {
    }
    return BehaviorsModule;
}());
BehaviorsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__behaviors__["a" /* BehaviorsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__behaviors__["a" /* BehaviorsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__behaviors__["a" /* BehaviorsPage */]
        ]
    })
], BehaviorsModule);

//# sourceMappingURL=behaviors.module.js.map

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BehaviorsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { BehaviorsMenuPage } from '../behaviors/behaviors-menu';
var BehaviorsPage = (function () {
    function BehaviorsPage(navCtrl, navParams, popoverCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
    }
    BehaviorsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Behaviors');
    };
    BehaviorsPage.prototype.presentPopover = function (ev) {
        var _this = this;
        var popover = this.popoverCtrl.create('BehaviorsMenuPage', {}, { cssClass: 'behaviors-menu' });
        popover.present({ ev: ev });
        popover.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            if (data.action == "mood") {
                _this.getMood();
            }
            console.log('trying to: ' + data.action);
        });
    };
    BehaviorsPage.prototype.addBehavior = function () {
    };
    BehaviorsPage.prototype.getMood = function () {
        var alert = this.alertCtrl.create();
        alert.setTitle('What is your mood?');
        alert.addInput({
            type: 'radio',
            label: 'Really Good',
            value: '5',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Good',
            value: '4'
        });
        alert.addInput({
            type: 'radio',
            label: 'Mediocre',
            value: '3'
        });
        alert.addInput({
            type: 'radio',
            label: 'Bad',
            value: '2'
        });
        alert.addInput({
            type: 'radio',
            label: 'Really Bad',
            value: '1'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: function (data) {
                console.log('Checkbox data:', data);
                //this.testCheckboxOpen = false;
                //this.testCheckboxResult = data;
            }
        });
        alert.present();
    };
    return BehaviorsPage;
}());
BehaviorsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-behaviors',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/behaviors/behaviors.html"*/'\n<ion-header>\n  \n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Behaviors</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <!-- <button ion-button full outline>Add a behavior</button> -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/behaviors/behaviors.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* AlertController */]])
], BehaviorsPage);

//# sourceMappingURL=behaviors.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map