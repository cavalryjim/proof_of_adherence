webpackJsonp([6],{

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__health_kit__ = __webpack_require__(774);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthKitModule", function() { return HealthKitModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HealthKitModule = (function () {
    function HealthKitModule() {
    }
    return HealthKitModule;
}());
HealthKitModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__health_kit__["a" /* HealthKitPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__health_kit__["a" /* HealthKitPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__health_kit__["a" /* HealthKitPage */]
        ]
    })
], HealthKitModule);

//# sourceMappingURL=health-kit.module.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_health__ = __webpack_require__(138);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HealthKitPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HealthKitPage = (function () {
    function HealthKitPage(healthService, loadingCtrl) {
        this.healthService = healthService;
        this.loadingCtrl = loadingCtrl;
        this.steps = 0;
    }
    HealthKitPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HealthKit');
        this.getSteps();
    };
    HealthKitPage.prototype.getSteps = function () {
        var _this = this;
        var today = new Date();
        var last_month = new Date();
        last_month.setDate(last_month.getDate() - 30);
        //this.activity_spinner = true; // JDavis: start spinner
        this.presentLoading();
        this.healthService.getSteps(last_month, today).then(function (steps) {
            //console.log("today " + today);
            //console.log("Health Kit result[10] " + steps[10].endDate);
            _this.step_collection = steps;
            console.log("step_collection " + _this.step_collection);
            //this.activity_spinner = false; // JDavis: stop spinner
        });
    };
    HealthKitPage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Loading...",
            duration: 1000
        });
        loader.present();
    };
    return HealthKitPage;
}());
HealthKitPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-health-kit',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/health-kit/health-kit.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Health Kit</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-list-header>steps</ion-list-header>\n    <ion-item *ngFor="let reading of step_collection " >\n      {{ reading.value }}\n    <ion-note item-end> {{ reading.endDate | date: "MM/dd/yyyy" }} </ion-note>\n      \n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/health-kit/health-kit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_health__["a" /* HealthService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */]])
], HealthKitPage);

//# sourceMappingURL=health-kit.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map