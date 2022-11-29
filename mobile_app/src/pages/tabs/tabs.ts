import { Component } from '@angular/core';

import { DevicesPage } from '../devices/devices';
//import { TeamPage } from '../team/team';
import { CarePlanPage } from '../care-plan/care-plan';
import { HomePage } from '../home/home';
import { EducationPage } from '../education/education';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = CarePlanPage;
  tab2Root = DevicesPage;
  tab3Root = HomePage;
  tab4Root = EducationPage;

  constructor() {

  }
}
