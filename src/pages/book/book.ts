import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';
import { CartProvider } from '../../providers/cart/cart';
import { WishlistProvider } from '../../providers/wishlist/wishlist';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  
  @ViewChild("selection") selection: any;
  wishLists: any[] = [];
  wishListsIds: any[] = [];
  books: any;
  myInput: String = '';
  cat: String = 'All';
  shop: any;
  book_cat = ['All', 'Literature and Fiction', 'Non Fiction', 'Young Readers', 'Schools and Higher Education', 'Test Prep and Guides', 'Others'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookProvider: BookProvider, public cartProvider: CartProvider, public wishlistProvider: WishlistProvider, public storage: Storage, private toastCtrl: ToastController) {
      this.shop = navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
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
      this.bookProvider.getShopBooks(this.shop._id)
      .subscribe(books => {
          
          this.books = books;
          console.log(this.books);
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
          this.bookProvider.getShopBooks(this.shop._id)
          .subscribe(books => {

              this.books = books;
              if(this.cat != 'All'){
                    this.books = this.books.filter(book => book.category.includes(this.cat));
                }
          }, err => {
              console.log(err);
          });
      }
  }
    
  onSearch(event){
      if(this.myInput != ''){
          this.books = null;
          this.bookProvider.search(this.myInput)
            .subscribe(res => {
                this.books = res.books.filter(book => book.shop._id == this.shop._id);
                if(this.cat != 'All'){
                    this.books = this.books.filter(book => book.category.includes(this.cat));
                }
            }, err => console.log(err));
      }else{
          this.bookProvider.getShopBooks(this.shop._id)
          .subscribe(books => {

              this.books = books;
          }, err => {
              console.log(err);
          });
      }
      
  }
    
  filter(){
      this.selection.open();
  }
    
  setSelectedCat(){
      this.books = null;
      if(this.cat == 'All'){
          this.bookProvider.getShopBooks(this.shop._id)
          .subscribe(books => {
              this.books = books;
          }, err => {
              console.log(err);
          });
      }else{
          this.bookProvider.getShopBooks(this.shop._id)
          .subscribe(books => {

              this.books = books;
              this.books = this.books.filter(book => book.category.includes(this.cat));
          }, err => {
              console.log(err);
          });
      }
  }
  

}
