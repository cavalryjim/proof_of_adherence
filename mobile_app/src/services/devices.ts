import { Injectable } from "@angular/core";
import { Platform, Events } from 'ionic-angular';
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { DeviceModel } from "../models/device";
//import { Reading } from "../models/reading";
import { ApiService } from '../services/api';

@Injectable()
export class DevicesService {
  public devices: DeviceModel[] = [];
  public paired_validic_ids = [];
  
  constructor( private http: Http, 
               private apiService: ApiService,
               private storage: Storage,
               private events: Events,
               private platform: Platform ) {
                 
     platform.ready().then(() => {
       this.fetchList();
       //this.getPairedValidicIDs();
     })
     
     events.subscribe('application:clear_all' , () => {
       this.clearStoredDevices();
     });
  }
  
  
  
  pairedDevice(validic_id, i) {
    //console.log("device index " + i);
    this.paired_validic_ids.push(validic_id);
    this.devices[i].paired = true;
    this.saveList(true);
    //this.events.publish('device:paired');
    //this.events.publish('devices:updated');
  }
  
  addDevice(id: number, name: string, manufacturer: string, model: string, serial_number: string, mac_address: string,
            validic_id: number, image_url: string, peripheral_type: string, paired: boolean, last_reading: Date,
            active: boolean) {
    this.devices.push(new DeviceModel(id, name, manufacturer, model, serial_number, mac_address, validic_id, image_url, peripheral_type, paired, last_reading, active));
    //console.log(this.devices);
  }
  
  updateDevice(device) {
    let i = this.devices.findIndex(d => d.id == device.id);
    //let i = this.devices
    if (device.name) { this.devices[i].name = device.name}
    if (device.manufacturer) { this.devices[i].manufacturer = device.manufacturer}
    if (device.model) { this.devices[i].model = device.model}
    if (device.serial_number) { this.devices[i].serial_number = device.serial_number}
    if (device.mac_address) { this.devices[i].mac_address = device.mac_address}
    if (device.validic_id) { this.devices[i].validic_id = device.validic_id}
    if (device.image_url) { this.devices[i].image_url = device.image_url}
    if (device.peripheral_type) { this.devices[i].peripheral_type = device.peripheral_type}
    if (device.paired) { this.devices[i].paired = device.paried}
    if (device.last_reading) { this.devices[i].last_reading = device.last_reading}
    if (device.active) { this.devices[i].active = device.active}
  }
  
  getDevices() {
    return this.devices.slice();
  }
  
  removeDevice(index: number) {
    this.devices.splice(index, 1);
  }
  
  // JDavis: store the device list locally
  saveList(paired_device = false) {
   //console.log('Storing list');
   //console.log(JSON.stringify(this.devices));
   this.storage.set('device_list', JSON.stringify(this.devices));
   this.events.publish('devices:updated');
   if (paired_device) {
     this.events.publish('device:paired');
   }
  }
   
  // JDavis: getting the local version of the stored device list.
  // todo: when & where to fetch list.
  fetchList() {
   this.storage.get('device_list').then((list) => {
     this.devices = list ? JSON.parse(list) : [];
     this.getPairedValidicIDs();
     this.events.publish('devices:updated');
   });
  }
  
  getPairedValidicIDs() {
    this.paired_validic_ids = [];
    for (let device of this.devices) {
      if (device.paired) {
        this.paired_validic_ids.push(device.validic_id);
      }
    }
  }
  
  // JDavis: do this once (or at least infrequently).
  fetchDevices() {
    console.log('fetching devices');
    let path = 'patient_devices';
    let headers = this.apiService.headers();
    console.log(this.apiService.url(path));
    this.http.get(this.apiService.url(path), headers)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.reviewDevices(data);
      },
      err => {
        console.log('error in fetchDevices');
        //alert("There is a problem with that code. Please try again later.");
      });
  }
  
  reviewDevices(data) {
    //console.log(data);
    //console.log(this.devices);
    // create a temp list of devices...maybe.
    for (let device of data) {
      //console.log(this.devices.some(d => d.id == device.id));
      if (this.devices.some(d => d.id == device.id)) {
        this.updateDevice(device)
      } else {
        // JDavis: new
        this.addDevice(device.id, device.name, device.manufacturer, device.model, 
            device.serial_number, device.mac_address, device.validic_id, device.image_url, 
            device.peripheral_type, false, null, device.active)
        //  device.paired = false;
        //  device.last_reading = null;
      }
    }
    
    this.saveList();
  }
  
  clearStoredDevices() {
    this.devices = [];
    this.storage.set('device_list', JSON.stringify(this.devices));
  }
  
  deviceReadingLabel(peripheral_type) {
    switch (peripheral_type) {
      case ('thermometer'):
        return'deg';
        //break;
      case ('blood_pressure'):
        return 'mm Hg';
        //break;
      case ('heart_rate'):
        return 'bpm';
        //break;
      case ('glucose'):
        return'level';
        //break;
      case ('weight'):
        return 'lbs';
        //break;
      case ('pulse_oximeter'):
        return '%';
        //break;
      case ('fitness_tracker'):
        return 'level';
        //break;
    }
  }
  
}
