import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicePage } from './device';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    DevicePage,
  ],
  imports: [
    IonicPageModule.forChild(DevicePage),
    PipesModule
  ],
  exports: [
    DevicePage
  ]
})
export class DeviceModule {}
