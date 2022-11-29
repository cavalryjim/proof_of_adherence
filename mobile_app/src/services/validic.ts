import { Events } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { DevicesService } from './devices';
import { ReadingsService } from './readings'; 


// A&D UA-651BLE BP Cuff - 2
// Nonin 3230 Pulse Oximeter - 13
// A&D UC-352BLE Scale - 14
// Roche Accu-Chek Glucometer - 23
// ZJAFMP
// ionic cordova plugin add /Users/james/Health_Engagements/Validic_Cordova_Full_1.6.0/plugin --save --nofetch
// --variable CAMERA_USAGE_DESCRIPTION=<usage message> --variable HEALTH_SHARE_USAGE_DESCRIPTION=<usage message> --variable HEALTH_UPDATE_USAGE_DESCRIPTION=<usage message> --variable BLUETOOTH_USAGE_DESCRIPTION=<usage message>

declare var ValidicMobile: any;
declare var self: any;
//declare var cordova: any;

@Injectable()
export class ValidicService {
  i = -1;
  
  constructor( private events: Events, 
               private devices: DevicesService,
               private readings: ReadingsService ) {
    // JDavis: when using ValidicMobile, must use 'self' instead of 'this'.
    self = this;
   }
  
  startSession(validic_id, org_id, validic_token) {
    ValidicMobile.Session.isSessionActive(function (response) {
      if (!response.isActive) {
        // JDavis: Only do this if your user is logging in
        ValidicMobile.Session.startSession(validic_id, org_id, validic_token);
      }
    });
  } 
  
  setPassiveReadPeripheralIDs(validic_ids) {
    ValidicMobile.BLE.setPassiveReadPeripheralIDs(validic_ids);
  }
    
  setListeners() {
    //ValidicMobile.BLE.setPassiveReadPeripheralIDs([2,14]);
    (<any>window).addEventListener(ValidicMobile.BLE.EventName.ON_PASSIVE_DID_READ, this.onBLEPassiveDidRead);
    (<any>window).addEventListener(ValidicMobile.BLE.EventName.ON_PASSIVE_DID_FAIL, this.onBLEPassiveDidFail);
    (<any>window).addEventListener(ValidicMobile.BLE.EventName.ON_PAIR_SUCCESS, this.onBLEPairingSuccess);
    (<any>window).addEventListener(ValidicMobile.BLE.EventName.ON_PAIR_FAIL, this.onBLEPairingFailed);
  }   
  
  readDevice(device_id) { 
    alert("reading device " + device_id);
    ValidicMobile.BLE.read(device_id, (function (response) {
      alert(JSON.stringify(response.payload));
    }), (function (response) {
      alert('read fail: ' + response.payload.error);
    }));
  }
  
  readSuccess(response) {
    alert(JSON.stringify(response.payload)); 
    alert(response.payload.records[0].weight + "kg");
  }
  
  readFail(response) {
    alert('read fail: ' + response.payload.error)
  }
    
  supportedDevices() {
    console.log("supportedDevices begin ");
    alert("supportedDevices begin");
    
    ValidicMobile.BLE.getPeripheralsOfType(ValidicMobile.PeripheralType.BLOOD_PRESSURE, function (response) {
      //app.peripheral = response.peripheral;
      alert(response.peripherals.map(function(item){return item.Manufacturer + ": " + item.Model + " ID: " + item.ID}));
    }, function (err) {
      alert(err.error);
    });
    
  }
  
  pairDevice(validic_id, i) {
    //alert(validic_id);
    self.i = i;
    ValidicMobile.BLE.getPeripheral(validic_id, function (response) {
      //this.testnum = device_id;
      if (response.peripheral.RequiresPairing) {
        alert(response.peripheral.PairingInstruction);
        ValidicMobile.BLE.pair(validic_id);
      } else {
        self.devices.pairedDevice(validic_id, self.i);
        alert("This device does not require pairing.");
        self.setPassiveReadPeripheralIDs(self.devices.paired_validic_ids);
      }
    }, function (err) {
        alert(err.error); 
    });
    
  }   
  
  onBLEPassiveDidRead(response) {
    // JDavis: alert to see data.
    //alert(JSON.stringify(response));
    self.readings.validicDidRead(response);
  }
  
  onBLEPassiveDidFail(response) {
    console.log(JSON.stringify(response));
    //alert(JSON.stringify(response));
    //alert("Failed to read from device");
  }
  
  onBLEPairingSuccess(response) {
    alert(JSON.stringify(response));
    let device_id = response.peripheralID;
    self.devices.pairedDevice(device_id, self.i);
    self.setPassiveReadPeripheralIDs(self.devices.paired_validic_ids);
  }
  
  onBLEPairingFailed(response) {
    alert('pair fail: ' + response.payload.error);
  }
  
      
}