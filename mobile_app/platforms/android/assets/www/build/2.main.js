webpackJsonp([2],{

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walk2__ = __webpack_require__(778);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Walk2PageModule", function() { return Walk2PageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Walk2PageModule = (function () {
    function Walk2PageModule() {
    }
    return Walk2PageModule;
}());
Walk2PageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__walk2__["a" /* Walk2Page */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__walk2__["a" /* Walk2Page */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__walk2__["a" /* Walk2Page */]
        ]
    })
], Walk2PageModule);

//# sourceMappingURL=walk2.module.js.map

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Walk2Page; });
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
 * Generated class for the Walk2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Walk2Page = (function () {
    function Walk2Page(viewCtrl, navCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.walk3Page = 'Walk3Page';
    }
    Walk2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Walk2Page');
    };
    Walk2Page.prototype.nextPage = function () {
        this.navCtrl.push('Walk3Page');
        /*let modal = this.modalCtrl.create('Walk3Page');
        modal.present();
        this.dismiss();*/
    };
    Walk2Page.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return Walk2Page;
}());
Walk2Page = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-walk2',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/walk2/walk2.html"*/'<!--\n  Generated template for the Walk2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar [hideBackButton]="false">\n    <ion-title>\n      <img alt="logo" height="30"  src="assets/images/health_engagements_logo_icon_horizontal.png" >\n    </ion-title>\n  </ion-navbar>\n  \n  \n\n</ion-header>\n\n\n<ion-content >\n  <ion-row class="pad_top_third_screen">\n    <ion-col col-12 text-center>\n      <ion-icon name="md-phone-portrait" class="walk_through_icon" ></ion-icon>\n    </ion-col>\n  </ion-row>\n\n  <ion-row justify-content-center>\n    <ion-col col-12 text-center class="light_blue">\n      <h1>Pair Your Device</h1>\n    </ion-col>\n  </ion-row>\n\n  <ion-row justify-content-center>\n    <ion-col col-12 text-center>\n      <button ion-button (click)="nextPage()" icon-only clear class="walk_through_next"> \n        <ion-icon name="ios-arrow-forward" class="light_gray"></ion-icon>\n      </button>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/walk2/walk2.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], Walk2Page);

//# sourceMappingURL=walk2.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map