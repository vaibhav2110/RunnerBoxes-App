import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
    
    email: any;
    password: any;
    token: any;
    loader: any;
    showEmail: Boolean = true;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, public loading: LoadingController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.showEmail = true;
    console.log('ionViewDidLoad ForgotPage');
  }
    
  sendOtp(){
      this.loader = this.loading.create({
          content: 'Sending OTP..',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.authProvider.forgotPassword(this.email)
      .subscribe(res => {
          if(res.success){
              this.loader.dismiss();
              let toast = this.toastCtrl.create({
                message: 'OTP was sent to your email',
                duration: 2500
              });
              toast.present();
              this.showEmail = false;
          }else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => {
          console.log(err);
          this.loader.dismiss();
              let toast = this.toastCtrl.create({
                message: err.error.error,
                duration: 2500
              });
              toast.present();
      });
      //this.showEmail = false;
  }
    
  resetPassword(){
      this.loader = this.loading.create({
          content: 'Resetting Password..',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.authProvider.resetPassword(this.password, this.token)
      .subscribe(res => {
          if(res.success){
              this.loader.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Password changed successfully',
                duration: 2500
              });
              toast.present();
              this.navCtrl.pop();
          }else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => {
          this.loader.dismiss();
          let toast = this.toastCtrl.create({
                message: err.error.error,
                duration: 2500
              });
              toast.present();
          console.log(err);
      });
  }
    

    
  

}
