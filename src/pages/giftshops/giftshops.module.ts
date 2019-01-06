import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftshopsPage } from './giftshops';

@NgModule({
  declarations: [
    GiftshopsPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftshopsPage),
  ],
})
export class GiftshopsPageModule {}
