import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  public addressForm: FormGroup;
  user: any;
  token: any;
  loader: any;
  edit: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,private _FB: FormBuilder, public storage: Storage, public loading: LoadingController, private toastCtrl: ToastController) {
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
    console.log('ionViewDidLoad MePage');
  }
    
  logout(){
      this.authProvider.logOut();
      this.navCtrl.setRoot('SigninPage');
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
      this.loader = this.loading.create({
          content: 'Updating Address..',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.authProvider.changeUserAddress(this.token, this.addressForm.value)
      .subscribe(res => {
          if(res.success){
              this.loader.dismiss();
              this.user = res.user;
              this.edit = false;
              let toast = this.toastCtrl.create({
                message: 'Address updated..',
                duration: 2500
              });
              toast.present();
          }else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => console.log(err));
  }
    
  

}
