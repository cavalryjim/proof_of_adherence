webpackJsonp([0],{

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(780);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceModule", function() { return DeviceModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DeviceModule = (function () {
    function DeviceModule() {
    }
    return DeviceModule;
}());
DeviceModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__device__["a" /* DevicePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__device__["a" /* DevicePage */]),
            __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__device__["a" /* DevicePage */]
        ]
    })
], DeviceModule);

//# sourceMappingURL=device.module.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_readings__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DevicePage = (function () {
    function DevicePage(navCtrl, navParams, storage, readingsService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.readingsService = readingsService;
        this.events = events;
        this.readings = [];
        //peripheral_type = '';
        this.reading_label = 'lbs';
        this.weightData = [];
        this.systolicData = [];
        this.diastolicData = [];
        this.temperatureData = [];
        this.pulseOxData = [];
        this.peripheral_type = "";
        events.subscribe('readings:updated', function () {
            _this.loadReadings();
        });
    }
    DevicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DevicePage');
    };
    DevicePage.prototype.ngOnInit = function () {
        this.device = this.navParams.data;
        this.peripheral_type = this.device.peripheral_type;
        this.title = this.device.name;
        this.model = this.device.model;
        this.loadReadings();
    };
    DevicePage.prototype.loadReadings = function () {
        console.log(this.device.peripheral_type);
        switch (this.device.peripheral_type) {
            case ('thermometer'):
                this.reading_label = 'F';
                this.readings = this.readingsService.getThermometerReadings();
                this.drawTemperatureChart();
                break;
            case ('blood_pressure'):
                this.reading_label = 'bp';
                this.readings = this.readingsService.getBPReadings();
                this.drawBPChart();
                break;
            case ('heart_rate'):
                this.reading_label = 'bpm';
                break;
            case ('glucose'):
                this.reading_label = 'level';
                break;
            case ('weight'):
                this.reading_label = 'lbs';
                this.readings = this.readingsService.getWeightReadings();
                this.drawWeightChart();
                break;
            case ('pulse_oximeter'):
                this.reading_label = '%';
                this.readings = this.readingsService.getPulseOxReadings();
                this.drawPulseOxChart();
                break;
            case ('fitness_tracker'):
                this.reading_label = 'level';
                break;
        }
    };
    DevicePage.prototype.drawPulseOxChart = function () {
        this.pulseOxData = this.readingsService.getPulseOxData();
        // JDavis: graph weight readings for the past three months.
        this.pulseOxChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.pulseOxCanvas.nativeElement, {
            type: 'line',
            data: {
                //labels: [new Date("2017-03-25"), new Date("2017-03-26"), new Date("2017-05-22")],
                datasets: [{
                        label: "%",
                        data: this.pulseOxData,
                        borderColor: "#8BA6C1",
                        fill: false
                        //backgroundColor: "#579ADD"
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                            type: "time",
                            time: { unit: 'week', round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
                        }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    };
    DevicePage.prototype.drawWeightChart = function () {
        this.weightData = this.readingsService.getWeightData();
        // JDavis: graph weight readings for the past three months.
        this.weightChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.weightCanvas.nativeElement, {
            type: 'line',
            data: {
                //labels: [new Date("2017-03-25"), new Date("2017-03-26"), new Date("2017-05-22")],
                datasets: [{
                        label: "lbs",
                        data: this.weightData,
                        borderColor: "#8BA6C1",
                        fill: false
                        //backgroundColor: "#579ADD"
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                            type: "time",
                            time: { unit: 'week', round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
                        }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    };
    DevicePage.prototype.drawTemperatureChart = function () {
        this.temperatureData = this.readingsService.getTemperatureData();
        // JDavis: graph weight readings for the past three months.
        this.temperatureChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.temperatureCanvas.nativeElement, {
            type: 'line',
            data: {
                //labels: [new Date("2017-03-25"), new Date("2017-03-26"), new Date("2017-05-22")],
                datasets: [{
                        label: "lbs",
                        data: this.temperatureData,
                        borderColor: "#8BA6C1",
                        fill: false
                        //backgroundColor: "#579ADD"
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                            type: "time",
                            time: { unit: 'week', round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
                        }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    };
    DevicePage.prototype.drawBPChart = function () {
        this.systolicData = this.readingsService.getSystolicData();
        this.diastolicData = this.readingsService.getDiastolicData();
        this.bpChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.bpCanvas.nativeElement, {
            type: 'line',
            data: {
                datasets: [{
                        label: "systolic",
                        data: this.systolicData,
                        borderColor: "#8BA6C1",
                        fill: false
                        //backgroundColor: "#579ADD"
                    }, {
                        label: "diastolic",
                        data: this.diastolicData,
                        borderColor: "#80C038",
                        fill: false
                        //backgroundColor: "#BCE194"
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                            type: "time",
                            time: { unit: 'week', round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
                        }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
    };
    return DevicePage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('weightCanvas'),
    __metadata("design:type", Object)
], DevicePage.prototype, "weightCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('bpCanvas'),
    __metadata("design:type", Object)
], DevicePage.prototype, "bpCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('pulseOxCanvas'),
    __metadata("design:type", Object)
], DevicePage.prototype, "pulseOxCanvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('temperatureCanvas'),
    __metadata("design:type", Object)
], DevicePage.prototype, "temperatureCanvas", void 0);
DevicePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-device',template:/*ion-inline-start:"/Users/james/Projects/ccm_mobile/src/pages/device/device.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title >\n      <img alt="logo" height="30"  src="assets/images/health_engagements_logo_icon_horizontal.png" >\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <h3 class="center">{{ title }}</h3>\n  <h6 class="center">{{ model }}</h6>\n  \n  <ion-card>\n    <ion-card-content >\n      <canvas #weightCanvas [hidden]="!(peripheral_type==\'weight\')"></canvas>\n      <canvas #bpCanvas [hidden]="!(peripheral_type==\'blood_pressure\')" ></canvas>\n      <canvas #pulseOxCanvas [hidden]="!(peripheral_type==\'pulse_oximeter\')"></canvas>\n      <canvas #temperatureCanvas [hidden]="!(peripheral_type==\'thermometer\')"></canvas>\n    </ion-card-content>\n  </ion-card> \n  <ion-row padding>\n    <ion-col col-6 text-uppercase class="center reading_th_label">{{ reading_label }}</ion-col>\n    <ion-col col-6 text-uppercase class="center reading_th_date">Date</ion-col>\n  </ion-row>\n  <ion-row *ngFor="let reading of readings | reverse">\n    <ion-col col-6 class="reading_col center"> \n      <span *ngIf="peripheral_type==\'blood_pressure\'">\n        {{ reading.value1 }} / {{ reading.value2 }}\n      </span>\n      <span *ngIf="peripheral_type==\'weight\'">\n        {{ reading.value1 }}\n      </span>\n      <span *ngIf="peripheral_type==\'pulse_oximeter\'">\n        {{ reading.value1 }}\n      </span>\n      <span *ngIf="peripheral_type==\'thermometer\'">\n        {{ reading.value1 }}\n      </span>\n    </ion-col>\n    \n    <ion-col col-6 class="date_col center"> \n      {{ reading.date | date: \'shortDate\' }}\n    </ion-col>\n    \n  </ion-row>\n  <!-- <ion-list>\n    <ion-list-header>\n      <ion-row>\n        <ion-col col-6 text-uppercase class="center reading_th_label">{{ reading_label }}</ion-col>\n        <ion-col col-6 text-uppercase class="center reading_th_date">Date</ion-col>\n      </ion-row>\n    </ion-list-header>\n    <ion-item *ngFor="let reading of readings | reverse">\n\n          <span *ngIf="peripheral_type==\'blood_pressure\'">\n            {{ reading.value1 }} / {{ reading.value2 }}\n          </span>\n          <span *ngIf="peripheral_type==\'weight\'">\n            {{ reading.value1 }}\n          </span>\n\n      <ion-note item-end>{{ reading.date | date: \'shortDate\' }}</ion-note>\n    </ion-item>\n  </ion-list> -->\n</ion-content>\n'/*ion-inline-end:"/Users/james/Projects/ccm_mobile/src/pages/device/device.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__services_readings__["a" /* ReadingsService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], DevicePage);

//# sourceMappingURL=device.js.map

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reverse_pipe__ = __webpack_require__(781);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__reverse_pipe__["a" /* ReversePipe */]
        ],
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__reverse_pipe__["a" /* ReversePipe */]
        ]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReversePipe; });
//import { NgModule }      from '@angular/core';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReversePipe = (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (value) {
        if (!value)
            return;
        return value.reverse();
    };
    return ReversePipe;
}());
ReversePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */])({
        name: 'reverse'
    })
], ReversePipe);

//# sourceMappingURL=reverse-pipe.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map