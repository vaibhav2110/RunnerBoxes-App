import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectronicPage } from './electronic';

@NgModule({
  declarations: [
    ElectronicPage,
  ],
  imports: [
    IonicPageModule.forChild(ElectronicPage),
  ],
})
export class ElectronicPageModule {}
