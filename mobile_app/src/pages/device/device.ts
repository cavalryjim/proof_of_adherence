import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { DeviceModel } from '../../models/device';
import { Reading } from '../../models/reading';
import { ReadingsService } from '../../services/readings';

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
  //pipes: ReversePipe
})
export class DevicePage implements OnInit {
  device: DeviceModel;
  title: string;
  model: string;
  readings: Reading[] = [];
  //peripheral_type = '';
  reading_label = 'lbs';
  @ViewChild('weightCanvas') weightCanvas;
  @ViewChild('bpCanvas') bpCanvas;
  @ViewChild('pulseOxCanvas') pulseOxCanvas;
  @ViewChild('temperatureCanvas') temperatureCanvas;
  weightChart: any;
  bpChart: any;
  pulseOxChart: any;
  temperatureChart: any;
  weightData = [];
  systolicData = [];
  diastolicData = [];
  temperatureData = [];
  pulseOxData = [];
  peripheral_type = "";

  constructor( private navCtrl: NavController, 
               private navParams: NavParams,
               private storage: Storage,
               private readingsService: ReadingsService,
               private events: Events ) {
                 
    events.subscribe('readings:updated' , () => {
      this.loadReadings();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
    
  } 
    
  ngOnInit() {
    this.device = this.navParams.data;
    this.peripheral_type = this.device.peripheral_type;
    this.title = this.device.name; 
    this.model = this.device.model;
    this.loadReadings();
  }
  
  loadReadings() {
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
  }
  
  drawPulseOxChart() {
    this.pulseOxData = this.readingsService.getPulseOxData();
    
    // JDavis: graph weight readings for the past three months.
    this.pulseOxChart = new Chart(this.pulseOxCanvas.nativeElement, {
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
            time: { unit: 'week',round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
          }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  }
  
  drawWeightChart() {
    this.weightData = this.readingsService.getWeightData();
    
    // JDavis: graph weight readings for the past three months.
    this.weightChart = new Chart(this.weightCanvas.nativeElement, {
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
            time: { unit: 'week',round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
          }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  }
  
  drawTemperatureChart() {
    this.temperatureData = this.readingsService.getTemperatureData();
    
    // JDavis: graph weight readings for the past three months.
    this.temperatureChart = new Chart(this.temperatureCanvas.nativeElement, {
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
            time: { unit: 'week',round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
          }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  }
  
  drawBPChart() {
    this.systolicData = this.readingsService.getSystolicData();
    this.diastolicData = this.readingsService.getDiastolicData();
    
    this.bpChart = new Chart(this.bpCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: 
        [{
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
            time: { unit: 'week',round: 'day', displayFormats: { day: 'MMM D', week: 'MMM D' } }
          }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  }

}
