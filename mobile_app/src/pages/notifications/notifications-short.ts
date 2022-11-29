import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-notifications-short',
  template: `
  <h5 text-center>No notifications</h5>
  `,
})

export class NotificationsShortPage implements OnInit {
  //signed_in = false;
  
  constructor (
    private navParams: NavParams, 
    private storage: Storage,
    private viewCtrl: ViewController) {}
  
  ngOnInit() {
    //this.signed_in = this.navParams.get('signed_in');
    // JDavis: need to get auth from 
    console.log("Notification Popup" );
  }
  
}