import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElectronicProvider } from '../../providers/electronic/electronic';

/**
 * Generated class for the ElectronicshopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-electronicshops',
  templateUrl: 'electronicshops.html',
})
export class ElectronicshopsPage {

  shops: any;
  myInput: String = '';
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public electronicProvider: ElectronicProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElectronicshopsPage');
  }
    
  ionViewDidEnter(){
     this.electronicProvider.getShops()
      .subscribe(shops => {
          this.shops = shops;
          console.log(this.shops);
      }, err => {
          console.log(err);
      }); 
  }
    
  openShop(shop){
      this.navCtrl.push('ElectronicPage', {
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
          this.electronicProvider.shopSearch(this.myInput)
            .subscribe(res => {
                this.shops = res.shops.filter(shop => shop.category == 'Electronics');
                console.log(this.shops);
            }, err => console.log(err));
      }else{
          this.ionViewDidEnter();
      }
  }

}
