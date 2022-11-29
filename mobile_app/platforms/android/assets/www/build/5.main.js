webpackJsonp([5],{

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__system__ = __webpack_require__(775);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemModule", function() { return SystemModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SystemModule = (function () {
    function SystemModule() {
    }
    return SystemModule;
}());
SystemModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__system__["a" /* SystemPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__system__["a" /* SystemPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__system__["a" /* SystemPage */]
        ]
    })
], SystemModule);

//# sourceMappingURL=system.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_data_app_data__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_readings__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_devices__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SystemPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Device } from '@ionic-native/device';
//import { AppVersion } from '@ionic-native/app-version';



var SystemPage = (function () {
    //patient_sfid = "not available";
    function SystemPage(viewCtrl, alertCtrl, readingsService, devicesService, 
        //private events: Events,
        //private device: Device,
        //private appVersion: AppVersion,
        appData) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.readingsService = readingsService;
        this.devicesService = devicesService;
        this.appData = appData;
        this.device_model = "not available";
        this.device_platform = "not available";
        this.device_version = "not available";
        this.device_manufacturer = "not available";
        this.device_uuid = "not avaialble";
        this.app_version = "unknown";
        this.app_name = "Health Engagements";
        this.validic_id = "not available";
        this.validic_token = "not available";
        this.he_id = 0;
        this.auth_token = "not available";
        this.reg_code = "not available";
        this.app_uuid = "not available";
    }
    SystemPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad System');
        //console.log(this.device.isVirtual);
        this.setDeviceInfo();
        this.getAppInfo();
        this.getSystemInfo();
    };
    SystemPage.prototype.dismiss = function (action) {
        if (action === void 0) { action = null; }
        this.viewCtrl.dismiss({ action: action });
        //this.viewCtrl.dismiss({action: action});
    };
    SystemPage.prototype.setDeviceInfo = function () {
        this.device_model = this.appData.device_model;
        this.device_platform = this.appData.device_platform;
        this.device_version = this.appData.device_version;
        this.device_manufacturer = this.appData.device_manufacturer;
        this.device_uuid = this.appData.device_uuid;
    };
    SystemPage.prototype.getAppInfo = function () {
        this.app_version = this.appData.app_version;
        this.app_name = this.appData.app_name;
    };
    SystemPage.prototype.getSystemInfo = function () {
        this.reg_code = this.appData.reg_code;
        this.validic_id = this.appData.validic_id;
        this.validic_token = this.appData.validic_token;
        this.he_id = this.appData.he_id;
        //this.patient_sfid = this.appData.patient_sfid;
        this.auth_token = this.appData.auth_token;
        this.app_uuid = this.appData.APP_UUID;
    };
    SystemPage.prototype.fetchDevices = function () {
        this.devicesService.fetchDevices();
    };
    SystemPage.prototype.post_readings = function () {
        //this.readingsService.postReadings();
        this.readingsService.postReadings().subscribe(function (value) { console.log(value); }, function (err) { console.log(err); });
    };
    SystemPage.prototype.populate_test_data = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Test Data",
            //subTitle: "Are you sure?",
            message: "Populating with test data will overwrite current readings on this device.",
            buttons: [
                {
                    text: "Yes, I know what I'm doing.",
                    handler: function () {
                        _this.readingsService.populate_test_readings();
                        _this.dismiss(); // JDavis: show login screen;
                        //this.events.publish("application:logout");
                    }
                },
                {
                    text: 'No, leave my data alone.',
                    role: 'cancel',
                    handler: function () {
                        console.log('cancelled');
                    }
                }
            ]
        });
        alert.present();
    };
    SystemPage.prototype.confirm_logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Log out",
            subTitle: "Are you sure?",
            message: "Logging out will require your registration code (" + this.reg_code + ") to use the app again.",
            buttons: [
                {
                    text: 'Yes, log me out',
                    handler: function () {
                        _this.appData.logout();
                        _this.dismiss("logout"); // JDavis: show login screen;
                        //this.events.publish("application:logout");
                    }
                },
                {
                    text: 'No, keep me logged in',
                    role: 'cancel',
                    handler: function () {
                        console.log('cancelled');
                    }
                }
            ]
        });
        alert.present();
    };
    return SystemPage;
}());
SystemPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-system',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/system/system.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Close</button>\n    </ion-buttons>\n    <ion-title class="center">\n      <img alt="logo" height="30"  src="assets/images/health_engagements_logo_icon_horizontal.png" >\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <h4 text-uppercase class="center">System Info</h4>\n  \n  <ion-list>\n    <ion-list-header>Your Device</ion-list-header>\n    <ion-item>Manufacturer: {{ device_manufacturer }}</ion-item>\n    <ion-item>Model: {{ device_model }}</ion-item>\n    <ion-item>Platform: {{ device_platform }} {{ device_version }}</ion-item>\n    <ion-item>Device ID: {{ device_uuid }}</ion-item>\n  </ion-list>\n  \n  <ion-list>\n    <ion-list-header>This App</ion-list-header>\n    <ion-item>Name: {{ app_name }}</ion-item>\n    <ion-item>Version: {{ app_version}}</ion-item>\n  </ion-list>\n  \n  <ion-list>\n    <ion-list-header>Temp Testing Info</ion-list-header>\n    <ion-item>Validic ID: {{ validic_id }}</ion-item>\n    <ion-item>Validic Token: {{ validic_token }}</ion-item>\n    <ion-item>Auth Token: {{ auth_token }}</ion-item>\n    <ion-item>HE ID: {{ he_id }}</ion-item>\n    <ion-item>Registration Code: {{ reg_code }}</ion-item>\n    <ion-item>App UUID: {{ app_uuid }}</ion-item>\n  </ion-list>\n  <!-- <h6>Your Device</h6>\n  <p>Manufacturer: {{ device_manufacturer }}</p>\n  <p>Model: {{ device_model }}</p>\n  <p>Platform: {{ device_platform }} {{ device_version }}</p>\n  <p>Device ID: {{ device_uuid }} </p> -->\n  \n  <!-- <hr>\n  <h6>This App</h6>\n  <p>Name: {{ app_name }} </p>\n  <p>Version: {{ app_version}} </p> -->\n  \n  <!-- <hr>\n  <h6>Temp Testing Info</h6>\n  <p>Validic ID: {{ validic_id }} </p>\n  <p>Validic Token: {{ validic_token }} </p>\n  <p>Auth Token: {{ auth_token }} </p>\n  <p>HE ID: {{ he_id }} </p>\n  <p>Registration Code: {{ reg_code }} </p>\n  <p>App UUID: {{ app_uuid }} <p> -->\n  <ion-row>\n    <ion-col col-6 class="center">\n      <button ion-button (click)="confirm_logout()">Logout </button>\n    </ion-col>\n    \n    <ion-col col-6 class="center">\n      <button ion-button (click)="populate_test_data()">Test Data </button>\n    </ion-col>\n  </ion-row>\n  \n  <ion-row>\n    <ion-col col-6 class="center">\n      <button ion-button (click)="fetchDevices()">Update Devices </button>\n    </ion-col>\n    \n    <ion-col col-6 class="center">\n      <button ion-button (click)="post_readings()">Post Readings </button>\n    </ion-col>\n    \n  </ion-row>\n  \n</ion-content>\n\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/system/system.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services_readings__["a" /* ReadingsService */],
        __WEBPACK_IMPORTED_MODULE_4__services_devices__["a" /* DevicesService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_app_data_app_data__["a" /* AppData */]])
], SystemPage);

//# sourceMappingURL=system.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map