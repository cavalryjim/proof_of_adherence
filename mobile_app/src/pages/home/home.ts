import { Component, NgZone } from '@angular/core';
import { NavController, PopoverController, ModalController, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { BLE } from '@ionic-native/ble';
import { Device } from '@ionic-native/device';
//import { Health } from '@ionic-native/health';
//import { AuthService } from '../../services/auth';
import { HealthService } from '../../services/health';
import { Platform } from 'ionic-angular';
import { ValidicService } from '../../services/validic';
import { DevicesService } from '../../services/devices';
import { ReadingsService } from '../../services/readings';

import { HEMenuPage } from '../he-menu/he-menu';
import { SigninPage } from '../signin/signin'; // JDavis: need to lazy load
//import { DevicesPage } from '../devices/devices';
//import { CarePlanPage } from '../care-plan/care-plan'; // JDavis: need to lazy load
import { TeamPage } from '../team/team'; // JDavis: need to lazy load
import { EducationPage } from '../education/education';
import { SettingsPage } from '../settings/settings';
//import { BehaviorsPage } from '../behaviors/behaviors'; // JDavis: need to lazy load
import { NotificationsShortPage } from '../notifications/notifications-short'; 
//import { PersonalizePage } from '../personalize/personalize'; // JDavis: need to lazy load
//import { VerificationPage } from '../verification/verification';
import { AppData } from '../../providers/app-data/app-data';
import { DeviceModel } from '../../models/device';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  //devicesPage = DevicesPage;
  carePlanPage = 'CarePlanPage';
  teamPage = TeamPage;
  educationPage = EducationPage;
  behaviorsPage = 'BehaviorsPage';
  healthKitPage = 'HealthKitPage';
  walk1Page = 'Walk1Page';
  //signed_in = true;
  distance: number = 0;
  steps: number = 0; // JDavis: need to change this to zero
  calories: number = 0;
  health_available: any; 
  last_activity_update: string;
  activity_spinner = false;
  registration_code = null;
  //last_sync: Date;
  devicePage = 'DevicePage';
  date_play: any;
  devices: DeviceModel[] = [];
  verification_modal_active = false;
  
  
  constructor(
    private navCtrl: NavController, 
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private storage: Storage,
    //private authService: AuthService, 
    private healthService: HealthService,
    private platform: Platform,
    //private ble: BLE,
    private device: Device,
    private alertCtrl: AlertController,
    private validicService: ValidicService,
    private events: Events,
    private appData: AppData,
    private devicesService: DevicesService,
    private readingsService: ReadingsService,
    private zone: NgZone ) {
     
    // JDavis: removing this temporarily for Validic account reasons.  
    //events.subscribe('validic_credentials:updated', () => {
    //  if ((this.appData.validic_id != null) && (this.appData.validic_token != null)) {
    //    this.startValidicSession();
    //  }
    //});
    
    events.subscribe('application:logged_out' , () => {
      this.presentVerification();
    });
    
    events.subscribe('devices:updated', () => {
      this.getDevices();
    });
    
    // JDavis: the asynch nature of BLE requires a forced screen update.
    events.subscribe('device:paired', () => {
     this.forceUpdateScreen();
    });
    
  }
  
  ionViewDidLoad() {
    //this.healthService.isAvailable().then(answer => {
    //  this.health_available = answer; // JDavis: making this true for testing.
    //  console.log('health_available: ' + this.health_available)
      
    //  this.healthService.requestAuthorization().then(auth => {
    //    if (auth) { 
    //      this.getActivity();
    //    }
    //  })
    //});
    //this.getDevices();
    //this.checkRegistration();
    //this.last_sync = this.appData.last_sync; 
    
    // JDavis: adding this temporarily for Validic account reasons.  
    this.startValidicSession();
  } 
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter Home');
    //this.checkRegistration();
    //console.log(this.navCtrl.getActive().name);
    //console.log('date ' + new Date().toDateString() );
  }
  
  getConnectedDevices() {
    console.log('Getting BLE devices');
    //this.ble.scan([], 3).subscribe((results) => {
    //  console.log('BLE scan results ' + results);
    //});
  }
  
  getActivity() {
    if (this.health_available && (this.last_activity_update != new Date().toDateString() )) {
      this.activity_spinner = true;  // JDavis: start spinner
      this.healthService.getSteps().then(steps => {
        this.steps = +(+steps[0].value).toFixed(0);
        this.activity_spinner = false; // JDavis: stop spinner
      });
      this.last_activity_update = new Date().toDateString();
    }
    
    console.log("last_activity_update " + this.last_activity_update);
  }
  
  checkRegistration() {
    console.log("checkRegistration " + this.appData.signed_in);
    //console.log(this.navCtrl.getActive().name);
    if (!this.appData.signed_in) {
      this.presentVerification();
    }
  }
  
  presentMenu(ev) {
    let popover = this.popoverCtrl.create(HEMenuPage, {signed_in: this.appData.signed_in} );

    if (this.appData.signed_in) {
      popover.present({ ev: ev });
    } else {
      this.presentVerification();
    }

    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
    
        if (data.action == 'settings') {
            this.presentSettings();
        } else if (data.action == 'personalize') {
            this.presentPersonalize();
        } else if (data.action == 'system') {
            this.presentSystemPage();
        } else if (data.action == 'instructions') {
            this.presentWalkThrough();
        }
      }
    );
  }
  
  presentNotifications(ev) {
    let popover = this.popoverCtrl.create(NotificationsShortPage, {signed_in: this.appData.signed_in} );

    if (this.appData.signed_in) {
      popover.present({ ev: ev });
    }

    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        console.log('close notifications');
      }
    );
  }
  
  presentWalkThrough() {
    let modal = this.modalCtrl.create('Walk1Page');
    modal.present();
    
  }
  
  presentLogin() {
    let modal = this.modalCtrl.create(SigninPage);
    modal.present();
    //modal.onDidDismiss(
    //  data => { this.signed_in = true; }
    //);
  }
  
  presentSettings() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
  
  presentSystemPage() {
    let modal = this.modalCtrl.create('SystemPage');
    modal.present();
    modal.onDidDismiss(
      data => {
        if (!data) { return; }
        //if (data.action == 'logout') { this.presentVerification(); } 
      }
    );
  }
  
  presentPersonalize() {
    //let modal = this.modalCtrl.create(PersonalizePage);
    //modal.present();
  }
  
  presentVerification() {
    // JDavis: This modal was presenting twice. Put the conditional to stop it.
    if (!this.verification_modal_active) { 
      this.verification_modal_active = true;
    
      let modal = this.modalCtrl.create('VerificationPage');
      modal.present();
      modal.onDidDismiss(
        reg_data => { 
          this.verification_modal_active = false;
          //console.log(reg_data);
          //this.appData.getStoredInfo();
          this.devicesService.fetchDevices();
        }
      );
    }
  }
  
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  
/*  readDevice(device_id) {
    this.validicService.readDevice(device_id);
  }*/
  
/*  deviceRead(device_id) {
    alert("home.ts Validic device read: " + device_id);
  }*/
  
  startValidicSession() {
    if (!(this.device.isVirtual==null)) {
      // JDavis: removing this temporarily for Validic account reasons.  
      //this.validicService.startSession(this.appData.validic_id, this.appData.validic_org_id, this.appData.validic_token);
      this.validicService.setPassiveReadPeripheralIDs(this.devicesService.paired_validic_ids);
      this.validicService.setListeners();
    }
  }
  
  getDevices(){
    this.devices = this.devicesService.getDevices();
  }
  
  pairDevice(device, i) {
    this.validicService.pairDevice(device.validic_id, i);
    //if (!device.paired) {
    //  this.validicService.pairDevice(device.validic_id, i);
    //}
  }
  
  confirmDevicePaired(device, i) {
    alert('Device paired');
  }
  
  lastReading(peripheral_type) {
    return this.readingsService.lastReading(peripheral_type);
  }
  
/*  postReadings() {
    console.log("home post readings");
  }*/
  
  forceUpdateScreen() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }
    
/*  logout() {
    this.registration_code = null;
    this.signed_in = false;
    this.storage.set('registration_code', this.registration_code);
    this.presentVerification();
  }*/
  
  /*fetchDevices() {
    this.devicesService.fetchDevices()
      .subscribe(
        (list: DeviceModel[]) => {
          if (list) {
            this.devices = list;
          } else {
            this.devices = [];
          }
        },
        error => {
          this.handleError(error.json().error);
        }
      );
  }*/
  
  /*private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }*/
  
}
