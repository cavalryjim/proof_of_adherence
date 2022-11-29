import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import firebase  from 'firebase';
import { Storage } from '@ionic/storage';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
//import { Autostart } from '@ionic-native/autostart';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
//import { VerificationPage } from '../pages/verification/verification';
//import { SigninPage } from '../pages/signin/signin';
//import { SignupPage } from '../pages/signup/signup';
//import { SettingsPage } from '../pages/settings/settings';
//import { AuthService } from '../services/auth';
import { AppData } from '../providers/app-data/app-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage: any = TabsPage;
  //rootPage: HomePage;
  //signinPage = SigninPage;
  //signupPage = SignupPage;
  //settingsPage = SettingsPage;
  //homePage = HomePage;
  tabsPage = TabsPage;
  //signed_in = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              private menuCtrl: MenuController,
              //private authService: AuthService,
              private storage: Storage,
              private androidFullScreen: AndroidFullScreen,
              //private autostart: Autostart,
              private appData: AppData
              //private validicService: ValidicService
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('Platform ready');
      
      this.storage.get('registration_code').then((val) => {
        this.appData.reg_code = val;
        this.appData.signed_in = (!val) ? false : true;
        //if (!this.signed_in) {
        //  this.events.publish("application:logged_out");
        //}
      });
      
      //this.nav.setRoot(HomePage);
      //this.nav.setRoot(TabsPage);
      
      //if (!this.appData.signed_in) {
      //  this.nav.setRoot("VerificationPage");
      //}
      
      // JDavis: do this only if 'gateway' mode
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));
        
      // JDavis: removing autostart per request from @amit for MyHome_v5.apk
      //this.autostart.enable();

    });
  }
  

/*  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }*/

  onLogout() {
    //this.authService.logout();
    this.menuCtrl.close();
    //this.nav.setRoot(SigninPage);
  }
}
