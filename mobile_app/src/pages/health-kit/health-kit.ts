import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { HealthService } from '../../services/health';

@IonicPage()
@Component({
  selector: 'page-health-kit',
  templateUrl: 'health-kit.html',
})
export class HealthKitPage {
  //activity_spinner = false;
  step_collection: any;
  steps = 0;
  steps_date: Date;
  
  constructor(
    private healthService: HealthService,
    private loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthKit');
    this.getSteps();
  }
  
  getSteps() {
    let today = new Date()
    let last_month =  new Date();
    last_month.setDate(last_month.getDate()-30);

    //this.activity_spinner = true; // JDavis: start spinner
    this.presentLoading();
    this.healthService.getSteps(last_month, today).then(steps => {
      //console.log("today " + today);
      //console.log("Health Kit result[10] " + steps[10].endDate);
      this.step_collection = steps;
      console.log("step_collection " + this.step_collection);
      //this.activity_spinner = false; // JDavis: stop spinner
    });
    
  }
  
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 1000
    });
    loader.present();
  }

}
