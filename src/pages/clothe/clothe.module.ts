import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClothePage } from './clothe';

@NgModule({
  declarations: [
    ClothePage,
  ],
  imports: [
    IonicPageModule.forChild(ClothePage),
  ],
})
export class ClothePageModule {}
