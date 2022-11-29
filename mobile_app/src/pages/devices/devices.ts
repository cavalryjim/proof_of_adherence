import { Component , ViewChild} from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {
  @ViewChild('weightCanvas') weightCanvas;
  @ViewChild('activityCanvas') activityCanvas;
  @ViewChild('bpCanvas') bpCanvas;
  @ViewChild(Slides) slides: Slides;
  weightChart: any;
  activityChart: any;
  bpChart: any;
  currentSlideIndex = 0;

  constructor(
    /*private navCtrl: NavController,
    private navParams: NavParams*/) {
  }
  
  chartSlideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
    console.log("Current index is", this.currentSlideIndex);
    //currentIndex.classList.add('blue_background');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Devices');
    //this.lineChart = this.getLineChart();
    
    this.weightChart = new Chart(this.weightCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "lbs",
                  fill: false,
                  lineTension: 0.2,
                  backgroundColor: "#4286f4",
                  borderColor: "#4286f4",
                  //borderCapStyle: 'butt',
                  //borderDash: [],
                  //borderDashOffset: 0.0,
                  //borderJoinStyle: 'miter',
                  //pointBorderColor: "rgba(75,192,192,1)",
                  //pointBackgroundColor: "#fff",
                  //pointBorderWidth: 1,
                  //pointHoverRadius: 5,
                  //pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  //pointHoverBorderColor: "rgba(220,220,220,1)",
                  //pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  //pointHitRadius: 30,
                  data: [165, 159, 180, 181, 156, 155, 160],
                  spanGaps: false,
              }
          ]
      }
    });
    
    this.activityChart = new Chart(this.activityCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "calories",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [2000, 2200, 2100, 1900, 2000, 2400, 2300],
                  spanGaps: false,
              }
          ]
      }
    });
    
    this.bpChart = new Chart(this.bpCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "systolic",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "#4286f4",
                  borderColor: "#4286f4",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "#4286f4",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [180, 175, 170, 170, 180, 200, 190],
                  spanGaps: false,
              }, {
                  label: "diastolic",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1, 
                  pointHitRadius: 10,
                  data: [160, 155, 154, 140, 150, 175, 165],
                  spanGaps: false,
              
              }
          ]
      }
    });
  }
  
  onNewDevice() {
    
  }

}
