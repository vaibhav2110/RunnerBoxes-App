import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage {

  foods: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  filteredFoods: any;
  type: String = 'nonveg';
  shopId: any;
  restaurant: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodProvider: FoodProvider, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.restaurant = navParams.get('restaurant');
      this.shopId = this.restaurant._id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');
    this.getWishLists();
  }
    
  getWishLists(){
      this.storage.get('runner_wishlist').then(wishes => {
        if(wishes){
          this.wishLists = wishes;
          this.wishListsIds = this.wishLists.map(wish => wish._id);
           console.log(this.wishListsIds);
          
         }
        else{
        }
      });
  }
    
  ionViewDidEnter(){
      this.foodProvider.getRestFoods(this.shopId)
      .subscribe(foods => {
          
          this.foods = foods;
          this.filteredFoods = this.foods.filter(food => food.category.includes('Non-Veg'));
          console.log(this.foods);
      }, err => {
          console.log(err);
      });
  }
  openCart(){
      this.navCtrl.push('CartPage');
  }

  openProduct(product){
      this.navCtrl.push('ProductPage', {
          product: product
      });
  }
    
  addToCart(item: any){
      if(this.restaurant.open){
          let added = this.cartProvider.addToCart(item);
          if(added){
              let toast = this.toastCtrl.create({
                message: 'Item added to Cart',
                duration: 2500
              });
              toast.present();
              console.log('item added to cart');
          }else{
              let toast = this.toastCtrl.create({
                message: 'Item already present in cart',
                duration: 2500
              });
              toast.present();
              console.log('item already present in cart');
          }
      }
      else{
          let toast = this.toastCtrl.create({
                message: 'The restaurant is closed and not receiving new orders.',
                duration: 2500
              });
              toast.present();
              console.log('item added to cart');
      }
      
  }
    
  isPresent(item: any){
      let present:Boolean = false;
      this.wishLists.forEach(wish => {
          console.log(wish._id+' '+item._id);
          if(wish._id == item._id){
              present = true;
          }
      });
      return present;
  }
    
  addToWishList(item: any){
      this.wishlistProvider.addToWishList(item, ()=>{
          this.getWishLists();
          let toast = this.toastCtrl.create({
            message: 'Item added to Wishlist',
            duration: 2500
          });
          toast.present();
      });
  }
    
  removeFromWishList(item: any){
      this.wishlistProvider.removeFromWishList(item._id, ()=>{
          this.getWishLists();
          let toast = this.toastCtrl.create({
            message: 'Item removed from Wishlist',
            duration: 2500
          });
          toast.present();
      });
  }
    
  segmentChanged(event){
      console.log('segment changed');
      if(this.type == 'nonveg'){
          this.filteredFoods = this.foods.filter(food => food.category.includes('Non-Veg'));
      }else if(this.type == 'veg'){
          this.filteredFoods = this.foods.filter(food => food.category.includes('Veg'));
      }
  }

}
