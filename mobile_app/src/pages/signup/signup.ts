import { Component } from '@angular/core';
import { LoadingController, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//import { TouchID } from '@ionic-native/touch-id';
import { Storage } from '@ionic/storage';

//import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              //private touchId: TouchID,
              private storage: Storage,
              private viewCtrl: ViewController) {
  }

  onSignup(form: NgForm) {
    //console.log(form.value);
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    /*this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        //console.log(data);
        loading.dismiss();
        this.storage.set('use_touch_id', true);
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });*/
  }
  
  ionViewDidLoad() {
    /*this.touchId.verifyFingerprint("Verify your fingerprint")
      .then(
        res => console.log('TouchID is available!'),
        err => console.error('TouchID is not available', err)
      );*/   
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
