import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftPage } from './gift';

@NgModule({
  declarations: [
    GiftPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftPage),
  ],
})
export class GiftPageModule {}
