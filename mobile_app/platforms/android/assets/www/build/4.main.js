webpackJsonp([4],{

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__verification__ = __webpack_require__(776);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationModule", function() { return VerificationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VerificationModule = (function () {
    function VerificationModule() {
    }
    return VerificationModule;
}());
VerificationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__verification__["a" /* VerificationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__verification__["a" /* VerificationPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__verification__["a" /* VerificationPage */]
        ]
    })
], VerificationModule);

//# sourceMappingURL=verification.module.js.map

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_data_app_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_api__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(58);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Http, Response } from "@angular/http";

//import { HTTP } from '@ionic-native/http';


var VerificationPage = (function () {
    function VerificationPage(viewCtrl, storage, appData, http, apiService, events, loadingCtrl) {
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.appData = appData;
        this.http = http;
        this.apiService = apiService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.registration_code = null;
    }
    VerificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerificationPage');
    };
    VerificationPage.prototype.onVerify = function (form) {
        //this.authenticateUser(form.value.email, form.value.password);
        this.registration_code = form.value.registration_code.toUpperCase();
        //this.dismiss(this.registration_code);
        this.verifyCode(this.registration_code);
    };
    VerificationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    VerificationPage.prototype.verifyCode = function (reg_code) {
        var _this = this;
        var path = 'registrations/register_user';
        var headers = this.apiService.headers();
        var body = { reg_code: reg_code };
        var loader = this.loadingCtrl.create({
            content: "Verifying code..."
        });
        loader.present();
        this.http.post(this.apiService.url(path), body, headers)
            .subscribe(function (data) {
            loader.dismiss();
            var reg_data = JSON.parse(data['_body']);
            _this.appData.login(reg_code, reg_data);
            _this.dismiss();
        }, function (err) {
            console.log('error in verifyCode');
            alert("There is a problem with that code. Please try again later.");
            loader.dismiss();
            _this.registration_code = '';
        });
    };
    return VerificationPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */])
], VerificationPage.prototype, "nav", void 0);
VerificationPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-verification',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/verification/verification.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <img alt="logo" height="30"  src="assets/images/health_engagements_logo_icon_horizontal.png" >\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h1 class="center padding_top_50">Let\'s Get Started...</h1>\n  <h5 class="center">Enter your registration code:</h5>\n  \n  <ion-row padding>\n    <ion-col col-12>\n      <form #f="ngForm" (ngSubmit)="onVerify(f)">\n        <ion-list>\n          <ion-item>\n            <ion-label stacked text-uppercase class="light_blue">Registration Code</ion-label>\n            <ion-input\n              type="text"\n              ngModel\n              name="registration_code"\n              text-uppercase\n              required></ion-input>\n          </ion-item>\n        </ion-list>\n        <button ion-button block type="submit" [disabled]="!f.valid">Submit</button>\n      </form>\n    </ion-col>\n  </ion-row>\n  \n  <ion-row padding> \n    <ion-col>\n      <p class="dark_gray">Need a registration code?  Contact james@healthengagements.com</p>\n    </ion-col>\n    \n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/verification/verification.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_data_app_data__["a" /* AppData */],
        __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4__services_api__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */]])
], VerificationPage);

//# sourceMappingURL=verification.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map