import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
//import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-personalize',
  templateUrl: 'personalize.html',
})
export class PersonalizePage {

  constructor(private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Personalize');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
