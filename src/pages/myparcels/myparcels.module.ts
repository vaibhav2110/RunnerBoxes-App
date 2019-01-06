import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyparcelsPage } from './myparcels';

@NgModule({
  declarations: [
    MyparcelsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyparcelsPage),
  ],
})
export class MyparcelsPageModule {}
