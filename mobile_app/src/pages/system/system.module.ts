import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SystemPage } from './system';

@NgModule({
  declarations: [
    SystemPage,
  ],
  imports: [
    IonicPageModule.forChild(SystemPage),
  ],
  exports: [
    SystemPage
  ]
})
export class SystemModule {}
