import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodPage } from './food';
import { ParallaxModule } from 'ionic-parallax';

@NgModule({
  declarations: [
    FoodPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPage),
    ParallaxModule
  ],
})
export class FoodPageModule {}
