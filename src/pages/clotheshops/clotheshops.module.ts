import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClotheshopsPage } from './clotheshops';

@NgModule({
  declarations: [
    ClotheshopsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClotheshopsPage),
  ],
})
export class ClotheshopsPageModule {}
