import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ElectronicProvider } from '../../providers/electronic/electronic';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ElectronicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-electronic',
  templateUrl: 'electronic.html',
})
export class ElectronicPage {

  @ViewChild("selection") selection: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  electronics: any;
  cat: String = 'All';
  myInput: String = '';
  shop: any;
  electronic_cat = ['All', 'Mobile', 'Mobile Accessories', 'Televisions', 'Cameras', 'Smartwatch', 'Printers', 'Computer Accessories', 'Desktop PC', 'Laptop'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public electronicProvider: ElectronicProvider, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.shop = navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElectronicPage');
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
      this.electronicProvider.getShopElectronics(this.shop._id)
      .subscribe(electronics => {
          console.log(this.shop._id);
          this.electronics = electronics;
          console.log(this.electronics);
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
          this.electronicProvider.getShopElectronics(this.shop._id)
          .subscribe(electronics => {

              this.electronics = electronics;
              if(this.cat != 'All'){
                    this.electronics = this.electronics.filter(electronic => electronic.category.includes(this.cat));
                }
          }, err => {
              console.log(err);
          });
      }
  }
    
  onSearch(event){
      if(this.myInput != ''){
          this.electronics = null;
          this.electronicProvider.search(this.myInput)
            .subscribe(res => {
                this.electronics = res.electronics.filter(electronic => electronic.shop._id == this.shop._id);
                if(this.cat != 'All'){
                    this.electronics = this.electronics.filter(electronic => electronic.category.includes(this.cat));
                }
            }, err => console.log(err));
      }else{
          this.electronicProvider.getShopElectronics(this.shop._id)
          .subscribe(electronics => {

              this.electronics = electronics;
          }, err => {
              console.log(err);
          });
      }
      
  }
    
  filter(){
      this.selection.open();
  }
    
  setSelectedCat(){
      this.electronics = null;
      if(this.cat == 'All'){
          this.electronicProvider.getShopElectronics(this.shop._id)
          .subscribe(electronics => {
              this.electronics = electronics;
          }, err => {
              console.log(err);
          });
      }else{
          this.electronicProvider.getShopElectronics(this.shop._id)
          .subscribe(electronics => {

              this.electronics = electronics;
              this.electronics = this.electronics.filter(electronic => electronic.category.includes(this.cat));
          }, err => {
              console.log(err);
          });
      }
  }

}
