import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookProvider } from '../../providers/book/book';

/**
 * Generated class for the BookshopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookshops',
  templateUrl: 'bookshops.html',
})
export class BookshopsPage {

  shops: any;
  myInput: String = '';
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookProvider: BookProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookshopsPage');
  }
    
  ionViewDidEnter(){
     this.bookProvider.getShops()
      .subscribe(shops => {
          this.shops = shops;
          console.log(this.shops);
      }, err => {
          console.log(err);
      }); 
  }
    
  openShop(shop){
      this.navCtrl.push('BookPage', {
          shop: shop
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
          this.shops = null;
          this.bookProvider.shopSearch(this.myInput)
            .subscribe(res => {
                this.shops = res.shops.filter(shop => shop.category == 'Books');
                console.log(this.shops);
            }, err => console.log(err));
      }else{
          this.ionViewDidEnter();
      }
  }

}
