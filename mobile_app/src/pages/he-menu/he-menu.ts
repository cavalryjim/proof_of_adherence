import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { Component, ViewChild } from '@angular/core';
/*import { NavParams, MenuController, NavController, ViewController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { AuthService } from '../../services/auth';*/

@Component({
  selector: 'page-he-menu',
  template: `
    <ion-list >
      <button 
        ion-item 
        (click)="onSelection('system')">
        <ion-icon name="build" item-left></ion-icon>
        System
      </button>
      <button 
        ion-item 
        (click)="onSelection('instructions')">
        <ion-icon name="clipboard" item-left></ion-icon>
        Instructions
      </button>
      <button ion-item
        (click)="onSelection('settings')">
        <ion-icon name="settings" item-left></ion-icon>
        Settings
      </button>
    </ion-list>
  `,
})
export class HEMenuPage implements OnInit {
  signed_in = false;
  
  constructor (
    private navParams: NavParams, 
    private storage: Storage,
    private viewCtrl: ViewController) {}
  
  ngOnInit() {
    this.signed_in = this.navParams.get('signed_in');
    // JDavis: need to get auth from 
    console.log("Popup signed_in:" + this.signed_in);
  }
  
/*  onLogout() {
    this.signed_in = false;
    this.storage.set('signed_in', this.signed_in);
    this.viewCtrl.dismiss({action: 'logout'});
  }*/
  
  onSelection(action: string) {
    this.viewCtrl.dismiss({action: action});
  }
  
/*  showSettings() {
    this.viewCtrl.dismiss({action: 'settings'});
  }

  showPersonalize() {
    this.viewCtrl.dismiss({action: 'personalize'});
  }*/
  
/*  @ViewChild('nav') nav: NavController;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private viewCtrl: ViewController) {

  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.viewCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }*/
}