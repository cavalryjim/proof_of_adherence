import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walk1Page } from './walk1';

@NgModule({
  declarations: [
    Walk1Page,
  ],
  imports: [
    IonicPageModule.forChild(Walk1Page),
  ],
  exports: [
    Walk1Page
  ]
})
export class Walk1PageModule {}
