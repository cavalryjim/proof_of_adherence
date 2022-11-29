import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the Walk1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-walk1',
  templateUrl: 'walk1.html',
})
export class Walk1Page {
  
  walk2Page = 'Walk2Page';

  constructor(private navCtrl: NavController, 
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private events: Events ) {
    events.subscribe('walk_through:completed', () => {
      this.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Walk1Page');
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter Walk1Page');
    console.log(this.navParams);
  }
  
  nextPage() {
    this.navCtrl.push('Walk2Page');
    
/*    let modal = this.modalCtrl.create('Walk2Page');
    modal.present();
    this.dismiss();*/
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
