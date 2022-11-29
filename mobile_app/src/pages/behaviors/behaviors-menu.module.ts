import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BehaviorsMenuPage } from './behaviors-menu';

@NgModule({
  declarations: [
    BehaviorsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BehaviorsMenuPage),
  ],
  exports: [
    BehaviorsMenuPage
  ]
})
export class BehaviorsMenuModule {}