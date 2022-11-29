import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class AppData {

  public APP_UUID = '38739BAE-66D6-4AA5-B4DE-8D44A92641C6';
  public reg_code = "Not available";
  public he_id = 0;
  public auth_token = "null_token";
  public validic_id = null;
  public validic_token = null;
  public validic_org_id = '59442282ff9d93000900024a'; // JDavis: how Validic identifies Health Engagements
  public app_version = "Not available";
  public app_name = "Health Engagements";
  public device_uuid = "simulator";
  public device_model = "Not available";
  public device_platform = "Not available";
  public device_version = "Not available";
  public device_manufacturer = "Not available";
  public signed_in = false;
  public last_sync: Date;
  public app_mode = "companion";
  //public patient_sfid = "Not available";

  constructor( private platform: Platform, 
               private storage: Storage,
               private device: Device,
               private appVersion: AppVersion,
               private events: Events ) {
    platform.ready().then(() => {
      //console.log("app-data platform ready");
      this.getStoredInfo();
      
      if (!(this.device.isVirtual==null)) {
        this.getDeviceInfo();
        this.getAppInfo();
      }
        
    });
    
    events.subscribe('storedInfo:updated', () => {
      this.getStoredInfo();
    });
    
    //events.subscribe("application:logout", () => {
    //  this.logout();
    //});
  }
  
  logout() {
    this.reg_code = null;
    this.storage.set('registration_code', this.reg_code);
    this.signed_in = false;
    this.events.publish("application:logged_out");
  }
  
  login(reg_code, reg_data) {
    // JDavis: after successful login clear the device list & readings if this is a new code.
    if (this.reg_code != reg_code) {
      this.events.publish("application:clear_all");
    }
    this.signed_in = true;
    this.reg_code = reg_code;
    this.validic_id = reg_data.validic_id;
    this.validic_token = reg_data.validic_token;
    this.he_id = reg_data.id;
    this.auth_token = reg_data.auth_token;
    //this.patient_sfid = reg_data.patient_sfid;
    this.storage.set('registration_code', reg_code);
    this.storage.set('validic_id', this.validic_id);
    this.storage.set('validic_token', this.validic_token);
    this.storage.set('he_id', this.he_id);
    this.storage.set('auth_token', this.auth_token);
    //this.storage.set('patient_sfid', this.patient_sfid);
    //this.events.publish('storedInfo:updated');
  
  }
  
  getStoredInfo() {
    // JDavis: want to make sure I have all the Validic credentials before triggering the event.
    this.storage.get('validic_id').then((v_id) => {
      this.validic_id = v_id;
      this.storage.get('validic_token').then((v_token) => {
        this.validic_token = v_token;
        this.events.publish('validic_credentials:updated');
      });
    });
    
    // JDavis: perhaps this should be moved to app.component.ts
    //this.storage.get('registration_code').then((val) => {
    //  this.reg_code = val;
    //  this.signed_in = (!val) ? false : true;
    //  if (!this.signed_in) {
    //    this.events.publish("application:logged_out");
    //  }
    //});
    
    this.storage.get('he_id').then((he_id) => {
      this.he_id = he_id;
      this.storage.get('auth_token').then((a_token) => {
        this.auth_token = a_token;
        this.events.publish('he_credentials:updated');
        //this.storage.get('patient_sfid').then(sfid) => {
          //this.patient_sfid = sfid;
        //}
      });
    });
    
    //this.storage.get('last_sync').then((d) => {
    //  this.last_sync = d;
    //})
    this.last_sync = new Date();
    
    this.storage.get('app_mode').then((a_mode) => {
      if (!(a_mode==null)) {
        this.app_mode = a_mode;
      }
    });
    
  }
  
  getDeviceInfo() {
    this.device_uuid = this.device.uuid;
    this.device_model = this.device.model;
    this.device_platform = this.device.platform;
    this.device_version = this.device.version;
    this.device_manufacturer = this.device.manufacturer;
  }
  
  getAppInfo() {
    this.appVersion.getVersionNumber().then((v) => {
      this.app_version = v;
    })
    
    this.appVersion.getAppName().then((n) => {
      this.app_name = n;
    })
  }

}