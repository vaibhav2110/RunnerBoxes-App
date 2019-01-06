import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClotheProvider } from '../../providers/clothe/clothe';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ClothePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clothe',
  templateUrl: 'clothe.html',
})
export class ClothePage {

  @ViewChild("selection") selection: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  clothes: any;
  filteredClothes: any;
  gender: String = 'men';
  myInput: String = '';
  cat: String = 'All';
  shop: any;
  clothe_cat = ['All', 'Shirt', 'Jeans', 'Top', 'Footwears', 'T-shirt'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public clotheProvider: ClotheProvider, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.shop = navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClothePage');
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
      this.clotheProvider.getShopClothes(this.shop._id)
      .subscribe(clothes => {
          
          this.clothes = clothes;
          this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
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
    
  segmentChanged(event){
      console.log('segment changed');
      if(this.gender == 'men'){
          this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
      }else if(this.gender == 'women'){
          this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
      }
  }
    
  onInput(event){
      console.log(this.myInput);
      if(this.myInput == ''){
          this.clotheProvider.getShopClothes(this.shop._id)
          .subscribe(clothes => {

              this.clothes = clothes;
              if(this.gender == 'men'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
                }else if(this.gender == 'women'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
                }
              if(this.cat != 'All'){
                    this.filteredClothes = this.filteredClothes.filter(clothe => clothe.category.includes(this.cat));
                }
          }, err => {
              console.log(err);
          });
      }
  }
    
  onSearch(event){
      if(this.myInput != ''){
          this.clothes = null;
          this.clotheProvider.search(this.myInput)
            .subscribe(res => {
              
                console.log(res);
                this.clothes = res.clothes.filter(clothe => clothe.shop._id == this.shop._id);
                if(this.gender == 'men'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
                  }else if(this.gender == 'women'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
                  }
                if(this.cat != 'All'){
                    this.filteredClothes = this.filteredClothes.filter(clothe => clothe.category.includes(this.cat));
                }
            }, err => console.log(err));
      }else{
          this.clotheProvider.getShopClothes(this.shop._id)
          .subscribe(clothes => {

              this.clothes = clothes;
              if(this.gender == 'men'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
                }else if(this.gender == 'women'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
                }
          }, err => {
              console.log(err);
          });
      }
      
  }
    
  filter(){
      this.selection.open();
  }
    
  setSelectedCat(){
      this.clothes = null;
      if(this.cat == 'All'){
          this.clotheProvider.getShopClothes(this.shop._id)
          .subscribe(clothes => {

              this.clothes = clothes;
              if(this.gender == 'men'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
                }else if(this.gender == 'women'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
                }
          }, err => {
              console.log(err);
          });
      }else{
          this.clotheProvider.getShopClothes(this.shop._id)
          .subscribe(clothes => {

              this.clothes = clothes;
              if(this.gender == 'men'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Male');
                }else if(this.gender == 'women'){
                      this.filteredClothes = this.clothes.filter(clothe => clothe.gender == 'Female');
                }
              this.filteredClothes = this.filteredClothes.filter(clothe => clothe.category.includes(this.cat));
          }, err => {
              console.log(err);
          });
      }
  }
    
  

}
