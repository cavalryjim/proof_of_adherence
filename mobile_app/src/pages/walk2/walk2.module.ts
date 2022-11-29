import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walk2Page } from './walk2';

@NgModule({
  declarations: [
    Walk2Page,
  ],
  imports: [
    IonicPageModule.forChild(Walk2Page),
  ],
  exports: [
    Walk2Page
  ]
})
export class Walk2PageModule {}
