webpackJsonp([3],{

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walk1__ = __webpack_require__(779);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Walk1PageModule", function() { return Walk1PageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Walk1PageModule = (function () {
    function Walk1PageModule() {
    }
    return Walk1PageModule;
}());
Walk1PageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__walk1__["a" /* Walk1Page */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__walk1__["a" /* Walk1Page */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__walk1__["a" /* Walk1Page */]
        ]
    })
], Walk1PageModule);

//# sourceMappingURL=walk1.module.js.map

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Walk1Page; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the Walk1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Walk1Page = (function () {
    function Walk1Page(navCtrl, viewCtrl, navParams, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.events = events;
        this.walk2Page = 'Walk2Page';
        events.subscribe('walk_through:completed', function () {
            _this.dismiss();
        });
    }
    Walk1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Walk1Page');
    };
    Walk1Page.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter Walk1Page');
        console.log(this.navParams);
    };
    Walk1Page.prototype.nextPage = function () {
        this.navCtrl.push('Walk2Page');
        /*    let modal = this.modalCtrl.create('Walk2Page');
            modal.present();
            this.dismiss();*/
    };
    Walk1Page.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return Walk1Page;
}());
Walk1Page = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-walk1',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/walk1/walk1.html"*/'<!--\n  Generated template for the Walk1Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      <img alt="logo" height="30"  src="assets/images/health_engagements_logo_icon_horizontal.png" >\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content center>\n  <ion-row class="pad_top_third_screen">\n    <ion-col col-12 text-center>\n      <ion-icon name="md-keypad" class="walk_through_icon" ></ion-icon>\n    </ion-col>\n  </ion-row>\n\n  <ion-row justify-content-center>\n    <ion-col col-12 text-center class="light_blue">\n      <h1>Enter Your Pin</h1>\n    </ion-col>\n  </ion-row>\n  \n  <ion-row justify-content-center>\n    <ion-col col-12 text-center>\n      <button ion-button (click)="nextPage()" icon-only clear class="walk_through_next"> \n        <ion-icon name="ios-arrow-forward" class="light_gray"></ion-icon>\n      </button>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/walk1/walk1.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], Walk1Page);

//# sourceMappingURL=walk1.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map