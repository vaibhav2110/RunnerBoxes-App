import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { ClotheProvider } from '../../providers/clothe/clothe';
import { ElectronicProvider } from '../../providers/electronic/electronic';
import { GiftProvider } from '../../providers/gift/gift';
import { BookProvider } from '../../providers/book/book';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';

import { AuthProvider } from '../../providers/auth/auth';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foods: any;
  clothes: any;
  electronics: any;
  gifts: any;
  books: any;
  banners: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  count: any;
  constructor(public navCtrl: NavController, public foodProvider: FoodProvider, public electronicProvider: ElectronicProvider, public giftProvider: GiftProvider, public bookProvider: BookProvider, public clotheProvider: ClotheProvider,  public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, public authProvider: AuthProvider,private toastCtrl: ToastController) {
      
  }
    
  ionViewDidLoad(){
      this.storage.get('runner_user')
      .then(user => {
          if(user){
              let user_obj = JSON.parse(user);
              console.log(user_obj.token);
              this.authProvider.getUserInfo(user_obj.token)
              .subscribe(res => {
                  console.log(res);
              }, err => console.log(err));
          }
      })
      this.getWishLists();
      this.clotheProvider.getBannerImage()
      .subscribe(banners => {
          this.banners = banners.banner[0];
          console.log(this.banners);
      }, err => console.log(err));
      
  }
    
    /*
  getCartItems(){
      this.storage.get('runner_cart').then(carts => {
        if(carts){
          this.count = carts.length;
          console.log(this.count);
         }
        else{
            return 0;
        }
      });
  }*/
    
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
      //this.getCartItems();
      //console.log(this.count);
      this.foodProvider.getFoods()
      .subscribe(foods => {
          
          this.foods = foods.slice(0,4);
          console.log(this.foods);
      }, err => {
          console.log(err);
      });
      this.electronicProvider.getElectronics()
      .subscribe(electronics => {
          this.electronics = electronics.slice(0,4);
      }, err => {
          console.log(err);
      });
      this.giftProvider.getGifts()
      .subscribe(gifts => {
          this.gifts = gifts.slice(0,4);
      }, err => {
          console.log(err);
      });
      this.bookProvider.getBooks()
      .subscribe(books => {
          this.books = books.slice(0,4);
      }, err => {
          console.log(err);
      });
      this.clotheProvider.getClothes()
      .subscribe(clothes => {
          this.clothes = clothes.slice(0,4);
          console.log(this.clothes);
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
    
  openFoods(){
      this.navCtrl.push('RestaurantsPage');
  }
    
  openClothes(){
      this.navCtrl.push('ClotheshopsPage');
  }
    
  openBooks(){
      this.navCtrl.push('BookshopsPage');
  }
    
  openElectronics(){
      this.navCtrl.push('ElectronicshopsPage');
  }
    
  openGifts(){
      this.navCtrl.push('GiftshopsPage');
  }
    
  addToCart(item: any){
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
    
  onSearch(event){
      let term = event.target.value;
      if(!term){
          term = ""
      }
      if(term.length > 0){
          this.navCtrl.push('SearchPage', {
            term: term
        });
      }
  }
    
  openParcel(){
      this.navCtrl.push('ParcelPage');
  }

}
