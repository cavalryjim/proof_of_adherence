import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Team');
  }
  
  onNewTeamMember() {
  
  }

}
