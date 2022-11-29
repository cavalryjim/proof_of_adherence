import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
//import { BehaviorsMenuPage } from '../behaviors/behaviors-menu';

@IonicPage()
@Component({
  selector: 'page-behaviors',
  templateUrl: 'behaviors.html',
})
export class BehaviorsPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Behaviors');
  }
  
  presentPopover(ev) {
    let popover = this.popoverCtrl.create('BehaviorsMenuPage', {}, {cssClass: 'behaviors-menu'} );

    popover.present({ ev: ev });
    
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        
        if (data.action == "mood") {
          this.getMood();
        }
        console.log('trying to: ' + data.action);
      }
    );
  }
  
  addBehavior() {
  
  }
  
  getMood() {
    let alert = this.alertCtrl.create();
    alert.setTitle('What is your mood?');

    alert.addInput({
      type: 'radio',
      label: 'Really Good',
      value: '5',
      checked: true
    });
    
    alert.addInput({
      type: 'radio',
      label: 'Good',
      value: '4'
    });
    
    alert.addInput({
      type: 'radio',
      label: 'Mediocre',
      value: '3'
    });

    alert.addInput({
      type: 'radio',
      label: 'Bad',
      value: '2'
    });
    
    alert.addInput({
      type: 'radio',
      label: 'Really Bad',
      value: '1'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        //this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
