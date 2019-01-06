import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
/**
 * Generated class for the RestaurantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {

  restaurants: any;
  myInput: String = '';
    
  constructor(public navCtrl: NavController,public foodProvider: FoodProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantsPage');
    
  }
    
  ionViewDidEnter(){
     this.foodProvider.getShops()
      .subscribe(restaurants => {
          this.restaurants = restaurants;
          console.log(this.restaurants);
      }, err => {
          console.log(err);
      }); 
  }
    
  openRestaurant(restaurant){
      this.navCtrl.push('FoodPage', {
          restaurant: restaurant
      });
  }
    
  onInput(event){
      console.log(this.myInput);
      if(this.myInput == ''){
          this.ionViewDidEnter();
      }
  }
    
  onSearch(event){
      if(this.myInput != ''){
          this.restaurants = null;
          this.foodProvider.shopSearch(this.myInput)
            .subscribe(res => {
                this.restaurants = res.shops.filter(shop => shop.category == 'Foods');
                console.log(this.restaurants);
            }, err => console.log(err));
      }else{
          this.ionViewDidEnter();
      }
  }

}
