import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
    
  mode: any = 'login';
  loader: any;
  public loginForm: FormGroup;
  public signinForm: FormGroup;
  constructor(public navCtrl: NavController, private authProvider: AuthProvider,public loading: LoadingController, public navParams: NavParams, private _FB: FormBuilder, private toastCtrl: ToastController, public storage: Storage) {
      this.loginForm = this._FB.group({
          'email': ['', Validators.required],
          'password': ['', Validators.required]
      });
      this.signinForm = this._FB.group({
          'name': ['', Validators.required],
          'email': ['', Validators.required],
          'mobile': ['', Validators.required],
          'password': ['', Validators.required],
          'rpassword': ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    this.storage.get('runner_user')
      .then(user => {
          if(user){
              this.navCtrl.setRoot('MePage');
          }
      })
  }
    
  logIn(){
      this.loader = this.loading.create({
          content: 'Logging In..',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.authProvider.logIn(this.loginForm.value)
      .subscribe(res => {
          if(res.success){
              
              console.log(res);
              this.loader.dismiss();
              this.navCtrl.setRoot('MePage');
              let toast = this.toastCtrl.create({
                message: 'Successfully Logged In',
                duration: 2500
              });
              toast.present();
          }
          else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => {
          console.log(err.error);
          if(err.error.error){
              let toast = this.toastCtrl.create({
                message: err.error.error,
                duration: 2500
              });
              toast.present();
          }
          else if(err.error.password){
              let toast = this.toastCtrl.create({
                message: err.error.password,
                duration: 2500
              });
              toast.present();
          }
          this.loader.dismiss();
      });
      console.log(this.loginForm.value);
  }
    
  signIn(){
      this.loader = this.loading.create({
          content: 'Creating new Account',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.authProvider.signIn(this.signinForm.value)
      .subscribe(res => {
          if(res.success){
              this.loader.dismiss();
              console.log(res.user);
              this.signinForm.reset();
              this.mode = 'login';
              let toast = this.toastCtrl.create({
                message: 'Account created successfully',
                duration: 2500
              });
              toast.present();
          }else{
              this.loader.dismiss();
              console.log(res);
          }
      }, err => {
          console.log(err);
          if(err.error.email){
              let toast = this.toastCtrl.create({
                message: err.error.email,
                duration: 2500
              });
              toast.present();
              this.loader.dismiss();
          }
      });
      console.log(this.signinForm.value);
  }
    
  openForgot(){
      this.navCtrl.push('ForgotPage');
  }

}
