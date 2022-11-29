import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BehaviorsPage } from './behaviors';

@NgModule({
  declarations: [
    BehaviorsPage,
  ],
  imports: [
    IonicPageModule.forChild(BehaviorsPage),
  ],
  exports: [
    BehaviorsPage
  ]
})
export class BehaviorsModule {}