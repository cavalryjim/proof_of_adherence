import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
//import { Device } from '@ionic-native/device';
//import { AppVersion } from '@ionic-native/app-version';
import { AppData } from '../../providers/app-data/app-data';
import { ReadingsService } from '../../services/readings';
import { DevicesService } from '../../services/devices';



@IonicPage()
@Component({
  selector: 'page-system',
  templateUrl: 'system.html',
})
export class SystemPage {
  device_model: string = "not available";
  device_platform: string = "not available";
  device_version: string = "not available";
  device_manufacturer: string = "not available";
  device_uuid = "not avaialble";
  app_version: string = "unknown";
  app_name: string = "Health Engagements";
  validic_id = "not available";
  validic_token = "not available";
  he_id = 0;
  auth_token = "not available";
  reg_code = "not available";
  app_uuid = "not available";
  //patient_sfid = "not available";

  constructor( private viewCtrl: ViewController,
               private alertCtrl: AlertController,
               private readingsService: ReadingsService,
               private devicesService: DevicesService,
               //private events: Events,
               //private device: Device,
               //private appVersion: AppVersion,
               private appData: AppData ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad System');
    //console.log(this.device.isVirtual);

    this.setDeviceInfo(); 
    this.getAppInfo();  
    this.getSystemInfo();
  }
  
  dismiss(action = null) {
    this.viewCtrl.dismiss({action: action});
    //this.viewCtrl.dismiss({action: action});
  }
  
  setDeviceInfo() {
    this.device_model = this.appData.device_model;
    this.device_platform = this.appData.device_platform;
    this.device_version = this.appData.device_version;
    this.device_manufacturer = this.appData.device_manufacturer;  
    this.device_uuid = this.appData.device_uuid;
  } 
    
  getAppInfo() {
    this.app_version = this.appData.app_version;
    this.app_name = this.appData.app_name;
  }
  
  getSystemInfo() {
    this.reg_code = this.appData.reg_code;
    this.validic_id = this.appData.validic_id;
    this.validic_token = this.appData.validic_token;
    this.he_id = this.appData.he_id;
    //this.patient_sfid = this.appData.patient_sfid;
    this.auth_token = this.appData.auth_token;
    this.app_uuid = this.appData.APP_UUID;
  }
  
  fetchDevices() {
    this.devicesService.fetchDevices();
  }
  
  post_readings() {
    //this.readingsService.postReadings();
    this.readingsService.postReadings().subscribe((value) => {console.log(value)}, (err) => {console.log(err)});
  }
  
  populate_test_data() {
    const alert = this.alertCtrl.create({
      title: "Test Data",
      //subTitle: "Are you sure?",
      message: "Populating with test data will overwrite current readings on this device.",
      buttons: [
        {
          text: "Yes, I know what I'm doing.",
          handler: ()=> {
            this.readingsService.populate_test_readings();
            this.dismiss(); // JDavis: show login screen;
            //this.events.publish("application:logout");
          }
        },
        {
          text: 'No, leave my data alone.',
          role: 'cancel',
          handler: ()=> {
            console.log('cancelled');
          }
        }
      ]
    });

    alert.present();
  }

  
  confirm_logout() {
    const alert = this.alertCtrl.create({
      title: "Log out",
      subTitle: "Are you sure?",
      message: "Logging out will require your registration code ("+ this.reg_code +") to use the app again.",
      buttons: [
        {
          text: 'Yes, log me out',
          handler: ()=> {
            this.appData.logout();
            this.dismiss("logout"); // JDavis: show login screen;
            //this.events.publish("application:logout");
          }
        },
        {
          text: 'No, keep me logged in',
          role: 'cancel',
          handler: ()=> {
            console.log('cancelled');
          }
        }
      ]
    });

    alert.present();
  }
  
}
