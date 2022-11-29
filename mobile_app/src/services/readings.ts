import { Injectable } from "@angular/core";
import { Platform, Events, ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Vibration } from '@ionic-native/vibration';
//import { DeviceFeedback } from '@ionic-native/device-feedback';
import { Http, Response } from "@angular/http";
//import 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { Reading } from "../models/reading";
import { ApiService } from '../services/api';
import { DevicesService } from '../services/devices';

@Injectable()
export class ReadingsService {
  //public devices: DeviceModel[] = [];
  public weightReadings: Reading[] = [];
  public bpReadings: Reading[] = [];
  public glucoseReadings: Reading[] = [];
  public pulseOxReadings: Reading[] = [];
  public thermometerReadings: Reading[] = [];
  public hrReadings: Reading[] = [];
  public fitnessReadings: Reading[] = [];
  private unsentReadings: Reading[] = [];
  //private getError = "";
  
  constructor( private storage: Storage,
               private events: Events,
               private platform: Platform,
               private toastCtrl: ToastController,
               private localNotifications: LocalNotifications,
               private vibration: Vibration,
               //private deviceFeedback: DeviceFeedback,
               private apiService: ApiService,
               private http: Http,
               private devicesService: DevicesService ) {
                 
    platform.ready().then(() => {
      this.fetchStoredWeightReadings();
      this.fetchStoredBPReadings();
      this.fetchStoredGlucoseReadings();
      this.fetchStoredFitnessReadings();
      this.fetchStoredPulseOxReadings();
      this.fetchStoredHRReadings();
      this.fetchStoredThermometerReadings();
    })
    
    events.subscribe('application:clear_all' , () => {
      this.clearStoredReadings();
    });
    
  }
  
  clearStoredReadings() {
    this.weightReadings = [];
    this.bpReadings = [];
    this.glucoseReadings = [];
    this.pulseOxReadings = [];
    this.thermometerReadings = [];
    this.hrReadings = [];
    this.fitnessReadings = [];
    
    this.storage.set('readings:weight', JSON.stringify(this.weightReadings));
    this.storage.set('readings:blood_pressure', JSON.stringify(this.bpReadings));
    this.storage.set('readings:glucose', JSON.stringify(this.glucoseReadings));
    this.storage.set('readings:pulse_ox', JSON.stringify(this.pulseOxReadings));
    this.storage.set('readings:thermometer', JSON.stringify(this.thermometerReadings));
    this.storage.set('readings:heart_rate', JSON.stringify(this.hrReadings));
  }
  
  validicDidRead(reading) {
    let new_reading: Reading;
    this.vibration.vibrate(1000);
    
    //console.log(reading);
    
    switch (true) {
      // blood_pressure
      case ([2, 3, 19, 22, 24].indexOf(reading.peripheralID) != -1):
        let systolic = reading.records[0].systolic;
        let diastolic = reading.records[0].diastolic;
        let bp_hr = reading.records[0].resting_heartrate;
        new_reading = new Reading(systolic, diastolic, bp_hr, null, null, new Date(), 'blood_pressure', false );
        this.bpReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.saveBPReadings()}, (err) => {this.saveBPReadings()});
        this.presentToast("BP: " + systolic + " / " + diastolic );
        //this.readNotification("Blood Pressure", systolic + " / " + diastolic );
        break;
        
      // pulse_oximeter
      case ([13, 25].indexOf(reading.peripheralID) != -1):
        let pulse_ox = reading.records[0].spo2;
        let po_hr = reading.records[0].heartrate;
        new_reading = new Reading(pulse_ox, po_hr, null, null, null, new Date(), 'pulse_oximeter', false );
        this.pulseOxReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.savePulseOxReadings()}, (err) => {this.savePulseOxReadings()});
        this.presentToast("Pulse Ox: " + pulse_ox + " %");
        break;
        
      // weight
      case ([11, 14, 16, 17, 21, 26, 27].indexOf(reading.peripheralID) != -1):
        let weight = +(reading.records[0].weight * 2.20462 ).toFixed(1);
        new_reading = new Reading(weight, null, null, null, null, new Date(), 'weight', false );
        //console.log(new_reading.label());
        this.weightReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.saveWeightReadings()}, (err) => {this.saveWeightReadings()});
        this.presentToast("Weight: " + weight + " lbs");
        //this.readNotification("Weight", weight + " lbs");
        break; 
        
      // glucometer
      case ([15, 20, 23].indexOf(reading.peripheralID) != -1):
        let glucose = +(reading.records[0].glucose).toFixed(1);
        new_reading = new Reading(glucose, null, null, null, null, new Date(), 'glucose', false );
        this.glucoseReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.saveGlucoseReadings()}, (err) => {this.saveGlucoseReadings()});
        this.presentToast("Glucose: " + glucose + " %");
        break; 
        
      // thermometer
      case ([1, 12, 18].indexOf(reading.peripheralID) != -1):
        let temperature = +(reading.records[0].temperature * 1.8 + 32).toFixed(1);
        new_reading = new Reading(temperature, null, null, null, null, new Date(), 'thermometer', false );
        this.thermometerReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.saveThermometerReadings()}, (err) => {this.saveThermometerReadings()});
        this.presentToast("Temperature: " + temperature + " degrees");
        break; 
        
      // heart_rate
      case ([4, 5, 6, 7, 8, 9, 10].indexOf(reading.peripheralID) != -1):
        let hr = reading.records[0].heartrate;
        new_reading = new Reading(hr, null, null, null, null, new Date(), 'heart_rate', false );
        //console.log(new_reading.label());
        this.hrReadings.push(new_reading);
        this.postReadings().subscribe((value) => {this.saveHRReadings()}, (err) => {this.saveHRReadings()});
        this.presentToast("Heart rate: " + hr + " bpm");
        //this.readNotification("Weight", weight + " lbs");
        break; 
    }
  }
  
  //readNotification(title, message) {
  //  this.localNotifications.schedule({
  //    title: title,
  //   text: message
  //  });
  //}
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
    
    this.localNotifications.schedule({
      text: message
    });
    
    this.localNotifications.clearAll();
  }
  
  fetchStoredWeightReadings() {
    this.storage.get('readings:weight').then((readings) => {
      this.weightReadings = readings ? JSON.parse(readings) : [];
    });
  }
  
  fetchStoredBPReadings() {
    this.storage.get('readings:blood_pressure').then((readings) => {
      this.bpReadings = readings ? JSON.parse(readings) : [];
    });
  }
  
  fetchStoredThermometerReadings() {
    this.storage.get('readings:thermometer').then((readings) => {
      this.thermometerReadings = readings ? JSON.parse(readings) : [];
    });
  }
  
  fetchStoredPulseOxReadings() { 
    this.storage.get('readings:pulse_ox').then((readings) => {
      this.pulseOxReadings = readings ? JSON.parse(readings) : [];
    });
  }
  
  fetchStoredHRReadings() {
    this.storage.get('readings:heart_rate').then((readings) => {
      this.hrReadings = readings ? JSON.parse(readings) : [];
    });
  }
  
  fetchStoredGlucoseReadings() { }
  fetchStoredFitnessReadings() { }
  
  saveBPReadings() {  
   this.storage.set('readings:blood_pressure', JSON.stringify(this.bpReadings));
   this.events.publish('readings:updated');
  }
  
  saveWeightReadings() {
    this.storage.set('readings:weight', JSON.stringify(this.weightReadings));
    this.events.publish('readings:updated');
  }
  
  saveThermometerReadings() {
    this.storage.set('readings:thermometer', JSON.stringify(this.thermometerReadings));
    this.events.publish('readings:updated');
  }
  
  savePulseOxReadings() {
    this.storage.set('readings:pulse_ox', JSON.stringify(this.pulseOxReadings));
    this.events.publish('readings:updated');
  }
  
  saveGlucoseReadings() {
    this.storage.set('readings:glucose', JSON.stringify(this.glucoseReadings));
    this.events.publish('readings:updated');
  }
  
  saveHRReadings() {  
   this.storage.set('readings:heart_rate', JSON.stringify(this.hrReadings));
   this.events.publish('readings:updated');
  }
  
  lastReading(peripheral_type) {
    //console.log(peripheral_type);
    let num = 0;
    let reading_date = null;
    switch (peripheral_type) {
      case ('thermometer'):
        num = this.thermometerReadings.length;
        let temp = 'n/a';
        if (num > 0) {
          let last_temp : Reading[] = this.thermometerReadings.slice(-1);
          temp = String(last_temp[0].value1);
          reading_date = last_temp[0].date;
        }
        return {reading: temp, date: reading_date};
        
      case ('blood_pressure'):
        num = this.bpReadings.length;
        let bp = 'n/a';
        let pulse = 'n/a';
        if (num > 0) {
          let last_bp : Reading[] = this.bpReadings.slice(-1);
          let systolic = String(last_bp[0].value1);
          let diastolic = String(last_bp[0].value2);
          pulse = String(last_bp[0].value3) + " bpm";
          bp = systolic + ' / ' + diastolic;
          reading_date = last_bp[0].date;
        }
        return {reading: bp, reading2: pulse, date: reading_date};
        
      case ('heart_rate'):
        num = this.hrReadings.length;
        let hr = 'n/a';
        if (num > 0) {
          let last_hr : Reading[] = this.hrReadings.slice(-1);
          hr = String(last_hr[0].value1);
          reading_date = last_hr[0].date;
        }
        return {reading: hr, date: reading_date};

      case ('glucose'):
        num = this.glucoseReadings.length;
        let glucose = 'n/a';
        if (num > 0) {
          let last_glucose : Reading[] = this.glucoseReadings.slice(-1);
          glucose = String(last_glucose[0].value1);
          reading_date = last_glucose[0].date;
        }
        return {reading: glucose, date: reading_date};
        
      case ('weight'):
        num = this.weightReadings.length;
        let weight = 'n/a';
        if (num > 0) {
          let last_weight : Reading[] = this.weightReadings.slice(-1);
          weight = String(last_weight[0].value1);
          reading_date = last_weight[0].date;
        }
        return {reading: weight, date: reading_date};
        
      case ('pulse_oximeter'):
        num = this.pulseOxReadings.length;
        let pulse_ox = 'n/a';
        if (num > 0) {
          let last_pulse_ox : Reading[] = this.pulseOxReadings.slice(-1);
          pulse_ox = String(last_pulse_ox[0].value1);
          reading_date = last_pulse_ox[0].date;
        }
        return {reading: pulse_ox, date: reading_date};
        
      case ('fitness_tracker'):
        num = this.fitnessReadings.length;
        let fitness = 'n/a';
        if (num > 0) {
          let last_fitness : Reading[] = this.fitnessReadings.slice(-1);
          fitness = String(last_fitness[0].value1);
          reading_date = last_fitness[0].date;
        }
        return {reading: fitness, date: reading_date};
        
      default: 
        return {reading: 'n/a', date: null};
          
    }
  }
  
  getWeightReadings() {
    return this.weightReadings.slice();
  }
  
  getThermometerReadings() {
    return this.thermometerReadings.slice();
  }
  
  getPulseOxReadings() {
    return this.pulseOxReadings.slice();
  }
  
  getBPReadings() {
    return this.bpReadings.slice();
  }
  
  getWeightData() {
    let weightData = this.weightReadings.map(reading => {
      return {x: reading.date, y: reading.value1}
    });
    return weightData;
  }
  
  getTemperatureData() {
    let temperatureData = this.thermometerReadings.map(reading => {
      return {x: reading.date, y: reading.value1}
    });
    return temperatureData;
  }
  
  getPulseOxData() {
    let pulseOxData = this.pulseOxReadings.map(reading => {
      return {x: reading.date, y: reading.value1}
    });
    return pulseOxData;
  }
  
  getSystolicData() {
    let systolicData = this.bpReadings.map(reading => {
      return {x: reading.date, y: reading.value1}
    });
    return systolicData;
  }
  
  getDiastolicData() {
    let diastolicData = this.bpReadings.map(reading => {
      return {x: reading.date, y: reading.value2}
    });
    return diastolicData;
  }
  
  postReadings() {
    console.log("posting readings");
    let path = 'readings/batch_create';
    let headers = this.apiService.headers();
    let body = { readings: this.getUnsentReadings() };
    //console.log(body);
    return this.http.post(this.apiService.url(path), body, headers)
      .map((result: Response) => {
        console.log(result.json());
        let success = result.json().success;
        let update_devices = result.json().update_devices;
        if (success) { this.markReadingsAsSent() };
        if (update_devices) { this.devicesService.fetchDevices() };
        return success;
      });
  }
  
  getUnsentReadings() {
    this.unsentReadings = [];
    let allReadings = this.weightReadings.concat(this.bpReadings, this.glucoseReadings, this.pulseOxReadings, 
                            this.thermometerReadings, this.hrReadings, this.fitnessReadings);
    
    for (let reading of allReadings) {
      if (reading.synched == false) { this.unsentReadings.push(reading); }
    }
    //console.log(this.unsentReadings);
    return this.unsentReadings.slice();
  }
  
  markReadingsAsSent() {
    this.weightReadings.forEach(reading => reading.synched = true);
    this.bpReadings.forEach(reading => reading.synched = true);
    this.glucoseReadings.forEach(reading => reading.synched = true);
    this.pulseOxReadings.forEach(reading => reading.synched = true);
    this.thermometerReadings.forEach(reading => reading.synched = true);
    this.hrReadings.forEach(reading => reading.synched = true);
    this.fitnessReadings.forEach(reading => reading.synched = true);
  }
  
  populate_test_readings() {
    this.weightReadings = [];
    this.bpReadings = [];
    this.pulseOxReadings = [];
    this.glucoseReadings = [];
    let test_reading: Reading;
    
    for (let i = 14; i > 0; i--) {
      //console.log(i);
      let systolic = 130 - (Math.floor(Math.random() * 10) + 1);
      let diastolic = 90 - (Math.floor(Math.random() * 10) + 1);
      let hr = 88 - (Math.floor(Math.random() * 10) + 1);
      let weight = 180 - (Math.floor(Math.random() * 10) + 1);
      let pulse_ox = 100 - (Math.floor(Math.random() * 5) + 1)
      let glucose = 120 - (Math.floor(Math.random() * 10) + 1);
      let test_date = new Date();
      test_date.setDate(test_date.getDate() - i);
      test_reading = new Reading(systolic, diastolic, hr, null, null, test_date, 'blood_pressure', true );
      this.bpReadings.push(test_reading);
      
      test_reading = new Reading(weight, null, null, null, null, test_date, 'weight', false );
      this.weightReadings.push(test_reading);
      
      test_reading = new Reading(pulse_ox, null, null, null, null, test_date, 'pulse_ox', true );
      this.pulseOxReadings.push(test_reading);
      
      test_reading = new Reading(glucose, null, null, null, null, test_date, 'glucose', true);
      this.glucoseReadings.push(test_reading);
      
    }
  }
  
  
}