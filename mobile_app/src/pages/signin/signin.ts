import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { TouchID } from '@ionic-native/touch-id';
import { Storage } from '@ionic/storage';

//import { AuthService } from '../../services/auth';
import { SignupPage } from '../signup/signup'; 


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  email: string = null;
  password: string = null;
  //use_touch_id: boolean = false;
  constructor(private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private touchId: TouchID,
              private storage: Storage,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController) {
  }

  onSignin(form: NgForm) {
    this.authenticateUser(form.value.email, form.value.password);
  }
  
  ionViewWillEnter() {
    this.storage.get('email').then((val) => this.email = val);
    this.storage.get('password').then((val) => this.password = val);
  }
  
  ionViewDidLoad() {
    this.touchId.isAvailable().then(
        res => console.log('TouchID is available!'),
        err => console.error('TouchID is not available', err)
    );
    
    this.storage.get('use_touch_id').then( val  => {
      //if (val == null) { val = false};
      //this.use_touch_id = val;
      if (val) {
        this.touchId.verifyFingerprint("Verify your fingerprint")
          .then(
            res => {
              //console.log('TouchID is available!')
              if (this.email && this.password) {
                this.authenticateUser(this.email, this.password);
              } else {
                const alert_touch_id = this.alertCtrl.create({
                  title: 'Touch ID',
                  message: 'Use your username & password',
                  buttons: ['Ok']
                });
                alert_touch_id.present();
                //dismiss();
              }
            
            },
            err => console.error('TouchID is not available', err)
          ); 
        }
    });
    
/* JDavis: need to pick up here with the storage and touch_id */
    
  }
  
  authenticateUser(email: string, password: string) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    /*this.authService.signin(email, password)
      .then(data => {
        console.log("Just signed in: " + data);
        this.storage.set('email', email);
        this.storage.set('password', password);
        loading.dismiss();
        this.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });*/
  }
  
  signup() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  


}
