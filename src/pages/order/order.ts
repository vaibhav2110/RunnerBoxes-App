import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CartProvider } from '../../providers/cart/cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  loader: any;
  items: any;
  public addressForm: FormGroup;
  user: any;
  token: any;
  total: any;
  edit: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,private _FB: FormBuilder, public storage: Storage, public cartProvider: CartProvider, public loading: LoadingController, public modalCtrl: ModalController) {
      this.items = navParams.get('items');
      console.log(this.items);
      this.total = navParams.get('total');
      console.log(this.items);
      this.addressForm = this._FB.group({
          'address_1': ['', Validators.required],
          'address_2': ['', Validators.required],
          'address_3': ['', Validators.required],
          'state': ['', Validators.required],
          'pincode': ['', Validators.required]
      })
  }

  ionViewDidEnter() {
    this.storage.get('runner_user')
      .then(user => {
          let user_obj = JSON.parse(user);
          console.log(user_obj.token);
          this.token = user_obj.token;
          this.authProvider.getUserInfo(user_obj.token)
          .subscribe(res => {
              this.user = res.user;
              console.log(res);
              
          }, err => console.log(err));
      })
    console.log('ionViewDidLoad OrderPage');
  }
    
    placeOrder(){
        this.loader = this.loading.create({
          content: 'Placing Order..',
          spinner: 'bubbles'
        });
      this.loader.present();
        let orderItems = this.items.map((item)=>{
            let obj = {};
            obj['items'] = item;
            obj['user'] = this.user._id;
            return obj;
        });
        console.log(orderItems);
        let length = orderItems.length;
        orderItems.forEach((item, i) => {
            this.cartProvider.placeOrder(this.token, item)
            .subscribe((res)=>{
                if(res.success){
                    console.log(res);
                    if(i==length-1){
                        this.loader.dismiss();
                        this.cartProvider.emptyCart();
                        let modal = this.modalCtrl.create('OrderplacedPage');
                        modal.onDidDismiss(()=>{
                            this.navCtrl.setRoot(HomePage);
                        })
                        modal.present();
                    }
                    

                }else{
                    console.log(res);
                }
            }, err => console.log(err));
        })
        /*let order = {};
        order['user'] = this.user._id;
        order['items'] = this.items;
        this.cartProvider.placeOrder(this.token, order)
        .subscribe((res)=>{
            this.loader.dismiss();
            if(res.success){
                console.log(res);
                this.cartProvider.emptyCart();
                let modal = this.modalCtrl.create('OrderplacedPage');
                modal.onDidDismiss(()=>{
                    this.navCtrl.setRoot(HomePage);
                })
                modal.present();
                
            }else{
                console.log(res);
            }
        }, err => console.log(err));
        console.log(order);*/
    }
    
    editAddress(){
      console.log('clicked');
      this.edit = true;
      if(this.user.address){
          this.addressForm.get('address_1').setValue(this.user.address.address_1);
          this.addressForm.get('address_2').setValue(this.user.address.address_2);
          this.addressForm.get('address_3').setValue(this.user.address.address_3);
          this.addressForm.get('state').setValue(this.user.address.state);
          this.addressForm.get('pincode').setValue(this.user.address.pincode);
      }
  }
    
  changeAddress(){
      
      this.authProvider.changeUserAddress(this.token, this.addressForm.value)
      .subscribe(res => {
          if(res.success){
              this.user = res.user;
              this.edit = false;
          }else{
              console.log(res);
          }
      }, err => console.log(err));
  }

}
