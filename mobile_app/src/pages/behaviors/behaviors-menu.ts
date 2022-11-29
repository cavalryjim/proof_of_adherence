import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-behaviors-menu',
  template: `
    <ion-list  >
      <button ion-item >
        <ion-icon name="body" item-left></ion-icon>
        Monitor Weight
      </button>
      <button ion-item >
        <ion-icon name="pint" item-left></ion-icon>
        Track Hydration
      </button>     
      <button ion-item >
        <ion-icon name="heart" item-left></ion-icon>
        Monitor BP
      </button>
      <button ion-item >
        <ion-icon name="walk" item-left></ion-icon>
        Track Activity
      </button>
      <button ion-item >
        <ion-icon name="medical" item-left></ion-icon>
        Monitor Blood Glucose
      </button>
      <button ion-item (click)="behaviorAction('mood')">
        <ion-icon name="happy" item-left></ion-icon>
        Track Mood
      </button>
      <button ion-item >
        <ion-icon name="beaker" item-left></ion-icon>
        Take Medication
      </button>
    </ion-list>
  `,
})
export class BehaviorsMenuPage implements OnInit {
  
  constructor (
    private navParams: NavParams, 
    private viewCtrl: ViewController) {}
  
  ngOnInit() {
    console.log("Init Behavior Menu");
  }
  
  behaviorAction( action: string ) {
    if (action == "mood") {
      this.viewCtrl.dismiss({action: 'mood'});
    }
  }
  
}