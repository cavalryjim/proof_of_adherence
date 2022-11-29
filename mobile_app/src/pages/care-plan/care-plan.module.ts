import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanPage } from './care-plan';

@NgModule({
  declarations: [
    CarePlanPage,
  ],
  imports: [
    IonicPageModule.forChild(CarePlanPage),
  ],
  exports: [
    CarePlanPage
  ]
})
export class CarePlanModule {}