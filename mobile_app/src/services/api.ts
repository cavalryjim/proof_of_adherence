import { Injectable } from '@angular/core';
import { AppData } from '../providers/app-data/app-data';
import { Headers } from '@angular/http';


@Injectable()
export class ApiService {
  
  constructor( private appData: AppData ) {
  }
  
  // JDavis: use dev computer to host app 'Health_Engagements/ngrok http 3000'
  //private base = "https://e9cf3f6a.ngrok.io/" // JDavis: for development
  //private base = "https://healthengagements-rpm-staging.herokuapp.com/" // JDavis: for staging 
  private base = "https://healthengagements-rpm.herokuapp.com/" // JDavis: for production
  private api = "api/he1/";
  
  url(path: string) {
    return this.base + this.api + path + ".json";
  }
  
  headers() {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    headers.append('x-app-uuid', this.appData.APP_UUID);
    headers.append('x-auth-token', this.appData.auth_token);
    headers.append('x-device-uuid', this.appData.device_uuid);
    headers.append('x-he-id', String(this.appData.he_id));
   
    return { headers: headers };
  }
  /*signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }*/
}
