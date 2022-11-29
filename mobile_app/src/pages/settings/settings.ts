import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  use_touch_id: boolean;
  
  constructor(
    private viewCtrl: ViewController,
    private storage: Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
    this.storage.get('use_touch_id').then((val) => {
      if (val == null) {
        this.use_touch_id = false; 
      } else {
        this.use_touch_id = val;
      }
      console.log('Use touch id? ' + this.use_touch_id);
    }).catch(e => console.log(e));
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  setTouchID() {
    console.log('Setting touch id to ' + this.use_touch_id);
    this.storage.set('use_touch_id', this.use_touch_id);
  }

}
