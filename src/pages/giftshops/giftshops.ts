import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftProvider } from '../../providers/gift/gift';

/**
 * Generated class for the GiftshopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-giftshops',
  templateUrl: 'giftshops.html',
})
export class GiftshopsPage {

  shops: any;
  myInput: String = '';
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public giftProvider: GiftProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiftshopsPage');
  }
    
  ionViewDidEnter(){
     this.giftProvider.getShops()
      .subscribe(shops => {
          this.shops = shops;
          console.log(this.shops);
      }, err => {
          console.log(err);
      }); 
  }
    
  openShop(shop){
      this.navCtrl.push('GiftPage', {
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
          this.giftProvider.shopSearch(this.myInput)
            .subscribe(res => {
                this.shops = res.shops.filter(shop => shop.category == 'Gifts');
                console.log(this.shops);
            }, err => console.log(err));
      }else{
          this.ionViewDidEnter();
      }
  }

}
