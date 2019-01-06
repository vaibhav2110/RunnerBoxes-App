import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FoodProvider } from '../../providers/food/food';
import { ClotheProvider } from '../../providers/clothe/clothe';
import { ElectronicProvider } from '../../providers/electronic/electronic';
import { GiftProvider } from '../../providers/gift/gift';
import { BookProvider } from '../../providers/book/book';
import { Storage } from '@ionic/storage';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    
    term: any;
    clotheResult: any;
    foodResult: any;
    giftResult: any;
    bookResult: any;
    electronicResult;
    wishLists: any[] = [];
    wishListsIds: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public foodProvider: FoodProvider, public electronicProvider: ElectronicProvider, public giftProvider: GiftProvider, public bookProvider: BookProvider, public clotheProvider: ClotheProvider, public storage: Storage, private toastCtrl: ToastController, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider) {
      this.term = navParams.get('term');
      console.log(this.term);
  }

  ionViewDidLoad() {
    this.getWishLists();
    console.log('ionViewDidLoad SearchPage');
    this.foodProvider.search(this.term)
    .subscribe(res => {
        this.foodResult = res.foods;
    }, err => console.log(err));
    this.electronicProvider.search(this.term)
    .subscribe(res => {
        this.electronicResult = res.electronics;
    }, err => console.log(err));
    this.giftProvider.search(this.term)
    .subscribe(res => {
        this.giftResult = res.gifts;
    }, err => console.log(err));
    this.bookProvider.search(this.term)
    .subscribe(res => {
        this.bookResult = res.books;
    }, err => console.log(err));
    this.clotheProvider.search(this.term)
    .subscribe(res => {
        this.clotheResult = res.clothes;
    }, err => console.log(err));
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

}
