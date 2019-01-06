import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any = [];
  isEmpty: Boolean = false;
  totalPrice: Number;
  isLoggedIn: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider, public storage: Storage) {
  }
    

  ionViewDidEnter() {
    this.storage.get('runner_user')
      .then(user => {
          if(user){
              this.isLoggedIn = true;
          }
      })
    console.log('ionViewDidLoad CartPage');
    this.cartItems = this.cartProvider.getCart();
    if(this.cartItems.length == 0){
        this.isEmpty = true;
    }
    console.log(this.cartItems);
    this.totalPrice = this.calculateTotal();
  }
    
  increaseQuant(item){
      item.quantity++;
      this.totalPrice = this.calculateTotal();
  }
  decreaseQuant(item){
      if(item.quantity == 1){
          return;
      }
      else{
          item.quantity--;
          this.totalPrice = this.calculateTotal();
      }
  }
    
  calculateTotal():Number{
      let totalPrice = this.cartItems.reduce((total, item)=>{
          return total+=(item.price * item.quantity)
      }, 0);
      return totalPrice;
  }
    
  remove(item){
      this.cartProvider.removeItem(item._id, () => {
          this.cartItems = this.cartProvider.getCart();
          if(this.cartItems.length == 0){
                this.isEmpty = true;
            }
          console.log(this.cartItems);
          this.totalPrice = this.calculateTotal();
      });
  }
    
   openOrder(){
       this.navCtrl.push('OrderPage', {
           items: this.cartItems,
           total: this.totalPrice
       });
   }
    
    continue(){
        this.navCtrl.pop();
    }
    
   login(){
      this.navCtrl.push('SigninPage'); 
   }

}
