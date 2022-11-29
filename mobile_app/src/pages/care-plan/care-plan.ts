import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
//import { AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@IonicPage()
@Component({
  selector: 'page-care-plan',
  templateUrl: 'care-plan.html',
})


export class CarePlanPage {
  
  private image: string;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private camera: Camera,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,
    private ble: BLE) {
      bluetoothSerial.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarePlan');
  }
  
  onTakePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          //this.displayErrorAlert(err);
          alert("Error while trying to capture picture");
        });
  }
  
  startScanning() {
    this.ble.scan([], 5).subscribe(device => {
      alert(device["name"]);
    }, err => {
      alert('there was an error');
    });
      
    /*this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        alert(err);
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {
        alert(err);
      })*/
  }
  
  success = (data) => alert(data);
  fail = (error) => alert(error);
  
  selectDevice(address: any) {
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }
  
  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

    /*displayErrorAlert(err){
      console.log(err);
      let alert = this.alertCtrl.create({
         title: 'Error',
         subTitle: 'Error while trying to capture picture',
         buttons: ['OK']
       });
       alert.present();
    }*/

}
