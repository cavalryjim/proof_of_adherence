import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TouchID } from '@ionic-native/touch-id';
import { IonicStorageModule } from '@ionic/storage';
import { Health } from '@ionic-native/health';
//import { AuthService } from "../services/auth";
import { HealthService } from "../services/health";
import { ValidicService } from "../services/validic";
import { DevicesService } from "../services/devices";
import { ReadingsService } from "../services/readings";
//import { ReversePipe } from "../pipes/reverse-pipe";
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ApiService } from "../services/api";
//import { Pipe, PipeTransform } from '@angular/core';
import { BLE } from '@ionic-native/ble';
//import { Http, Response } from "@angular/http";
import { HttpModule } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
//import { Autostart } from '@ionic-native/autostart';
import { Vibration } from '@ionic-native/vibration';
//import { DeviceFeedback } from '@ionic-native/device-feedback';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DevicesPage } from '../pages/devices/devices';
import { TeamPage } from '../pages/team/team';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { CarePlanPage } from '../pages/care-plan/care-plan';
import { EducationPage } from '../pages/education/education';
import { HEMenuPage } from '../pages/he-menu/he-menu';
//import { BehaviorsPage } from '../pages/behaviors/behaviors';
//import { BehaviorsMenuPage } from '../pages/behaviors/behaviors-menu';
import { NotificationsShortPage } from '../pages/notifications/notifications-short';
import { NotificationsPage } from '../pages/notifications/notifications';
//import { PersonalizePage } from '../pages/personalize/personalize';
//import { VerificationPage } from '../pages/verification/verification';
import { AppData } from '../providers/app-data/app-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [  // JDavis: need to lazy load components that will not be immediately displayed
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DevicesPage,
    TeamPage,
    SignupPage,
    SigninPage,
    SettingsPage,
    CarePlanPage,
    EducationPage,
    HEMenuPage,
    //BehaviorsPage,
    //BehaviorsMenuPage,
    NotificationsShortPage,
    NotificationsPage,
    //PersonalizePage
    //VerificationPage
    //ReversePipe
  ],
  //exports: [ReversePipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    //ReversePipe.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [  // JDavis: need to lazy load components that will not be immediately displayed
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DevicesPage,
    TeamPage,
    SignupPage,
    SigninPage,
    SettingsPage,
    CarePlanPage,
    EducationPage,
    HEMenuPage,
    //BehaviorsPage,
    //BehaviorsMenuPage,
    NotificationsShortPage,
    NotificationsPage,
    //PersonalizePage
    //VerificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //AuthService,
    TouchID,
    Health,
    HealthService,
    Device,
    AppVersion,
    BLE,
    ValidicService,
    AppData,
    ApiService,
    DevicesService,
    ReadingsService,
    LocalNotifications,
    AndroidFullScreen,
    //Autostart,
    Vibration,
    Camera,
    BluetoothSerial
    //DeviceFeedback
    //Pipe, 
    //PipeTransform,
    //ReversePipe
    //HTTP
  ]
})
export class AppModule {}
