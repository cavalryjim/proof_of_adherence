import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthKitPage } from './health-kit';

@NgModule({
  declarations: [
    HealthKitPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthKitPage),
  ],
  exports: [
    HealthKitPage
  ]
})
export class HealthKitModule {}
