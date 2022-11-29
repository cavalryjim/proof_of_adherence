import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, Events, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AppData } from '../../providers/app-data/app-data';
//import { Http, Response } from "@angular/http";
import { ApiService } from '../../services/api';
//import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  @ViewChild('nav') nav: NavController;
  registration_code = null;
  constructor( private viewCtrl: ViewController,
               private storage: Storage,
               private appData: AppData,
               private http: Http,
               private apiService: ApiService,
               private events: Events,
               private loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }
  
  onVerify(form: NgForm) {
    //this.authenticateUser(form.value.email, form.value.password);
    this.registration_code = form.value.registration_code.toUpperCase();
    //this.dismiss(this.registration_code);
    this.verifyCode(this.registration_code);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  verifyCode(reg_code: string) {
    let path = 'registrations/register_user';
    let headers = this.apiService.headers();
    let body = { reg_code: reg_code };
    let loader = this.loadingCtrl.create({
      content: "Verifying code..."
    });
    loader.present();
    
    this.http.post(this.apiService.url(path), body, headers)
      .subscribe(data => {
        loader.dismiss();
        let reg_data = JSON.parse(data['_body']);
        this.appData.login(reg_code, reg_data);
        this.dismiss();   
        
      },
      err => {
        console.log('error in verifyCode');
        alert("There is a problem with that code. Please try again later.");
        loader.dismiss();
        this.registration_code = '';
      });
  }

}
