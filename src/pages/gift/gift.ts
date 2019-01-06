import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GiftProvider } from '../../providers/gift/gift';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the GiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html',
})
export class GiftPage {

  wishLists: any[] = [];
  wishListsIds: any[] = [];
  gifts: any;
  myInput: String = '';
  shop: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public giftProvider: GiftProvider, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.shop = navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftPage');
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
      this.giftProvider.getShopGifts(this.shop._id)
      .subscribe(gifts => {
          
          this.gifts = gifts;
          console.log(this.gifts);
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
    
  onInput(event){
      //console.log(event);
      console.log(this.myInput);
      if(this.myInput == ''){
          this.giftProvider.getShopGifts(this.shop._id)
          .subscribe(gifts => {
              this.gifts = gifts;
          }, err => {
              console.log(err);
          });
      }
  }
    
  onSearch(event){
      if(this.myInput != ''){
          this.gifts = null;
          this.giftProvider.search(this.myInput)
            .subscribe(res => {
                this.gifts = res.gifts.filter(gift => gift.shop._id == this.shop._id);
            }, err => console.log(err));
      }else{
          this.giftProvider.getShopGifts(this.shop._id)
          .subscribe(gifts => {
              this.gifts = gifts;
          }, err => {
              console.log(err);
          });
      }
      
  }

}
