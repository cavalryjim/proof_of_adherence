import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';

/**
 * Generated class for the Walk2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-walk2',
  templateUrl: 'walk2.html',
})
export class Walk2Page {
  walk3Page = 'Walk3Page';

  constructor(private viewCtrl: ViewController, private navCtrl: NavController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Walk2Page');
  }
  
  nextPage() {
    this.navCtrl.push('Walk3Page');
    
    /*let modal = this.modalCtrl.create('Walk3Page');
    modal.present();
    this.dismiss();*/
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
