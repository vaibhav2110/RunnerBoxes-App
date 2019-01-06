import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  isLoggedIn: boolean = false;
  size: any[];
  selectedSize: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.product = navParams.get('product');
      if(this.product.shop.category == "Clothes"){
          this.size = this.product.size;
          console.log(this.size);
      }
      console.log(this.product);
  }
    
  ionViewDidEnter(){
      this.storage.get('runner_user')
      .then(user => {
          if(user){
              this.isLoggedIn = true;
          }
      })
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
    
  openCart(){
      this.navCtrl.push('CartPage');
  }
    
  addToCart(item: any){
      if(this.product.shop.open){
          if(this.product.shop.category == "Clothes"){
              if(this.selectedSize){
                  item['selectedSize'] = this.selectedSize;
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
              }else{
                  let toast = this.toastCtrl.create({
                        message: 'Please Select a size',
                        duration: 2500
                      });
                    toast.present();
              }
          }
          else{
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
      }else{
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
    
  buy(product: any){
      if(this.product.shop.open){
          let items = [];
          product['quantity'] = 1;
          if(this.product.shop.category == "Clothes"){
              if(this.selectedSize){
                  product['selectedSize'] = this.selectedSize;
                  items.push(product);
                  this.navCtrl.push('OrderPage', {
                      items: items,
                      total: product.price
                  })
              }else{
                  let toast = this.toastCtrl.create({
                        message: 'Please Select a size',
                        duration: 2500
                      });
                    toast.present();
              }
          }else{
              items.push(product);
                  this.navCtrl.push('OrderPage', {
                      items: items,
                      total: product.price
                  })
          }
      }else{
          let toast = this.toastCtrl.create({
                message: 'The restaurant is closed and not receiving new orders.',
                duration: 2500
              });
              toast.present();
              console.log('item added to cart');
      }
      
      
  }
    
  sizeSelect(size){
      this.selectedSize = size;
      console.log(this.selectedSize);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
    
  login(){
      this.navCtrl.push('SigninPage'); 
   }

}
