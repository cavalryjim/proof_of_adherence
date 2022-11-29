import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, Events } from 'ionic-angular';

/**
 * Generated class for the Walk3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-walk3',
  templateUrl: 'walk3.html',
})
export class Walk3Page {

  constructor( private viewCtrl: ViewController, 
               private navCtrl: NavController,
               private events: Events ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Walk3Page');
  }
  
  dismiss() {
    //this.viewCtrl.dismiss();
    //let options = { dismiss: true };
    this.navCtrl.popToRoot();
    this.events.publish('walk_through:completed');
  }

}
