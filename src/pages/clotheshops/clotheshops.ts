import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClotheProvider } from '../../providers/clothe/clothe';
/**
 * Generated class for the ClotheshopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clotheshops',
  templateUrl: 'clotheshops.html',
})
export class ClotheshopsPage {
    
  shops: any;
  myInput: String = '';
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public clotheProvider: ClotheProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClotheshopsPage');
  }
    
  ionViewDidEnter(){
     this.clotheProvider.getShops()
      .subscribe(shops => {
          this.shops = shops;
          console.log(this.shops);
      }, err => {
          console.log(err);
      }); 
  }
    
  openShop(shop){
      this.navCtrl.push('ClothePage', {
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
          this.clotheProvider.shopSearch(this.myInput)
            .subscribe(res => {
                this.shops = res.shops.filter(shop => shop.category == 'Clothes');
                console.log(this.shops);
            }, err => console.log(err));
      }else{
          this.ionViewDidEnter();
      }
  }

}
