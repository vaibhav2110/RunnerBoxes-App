import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MyorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
    
  token: any;
  orders: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authProvider: AuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderPage');
    this.storage.get('runner_user')
      .then(user => {
          if(user){
              let user_obj = JSON.parse(user);
              console.log(user_obj.token);
              this.authProvider.getUserInfo(user_obj.token)
              .subscribe(res => {
                  
                  this.orders = res.user.my_orders;
                  console.log(this.orders);
              }, err => console.log(err));
          }else{
              let alert = this.alertCtrl.create({
                title: 'User',
                subTitle: 'Please log in to view your orders',
                buttons: [{
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                      this.navCtrl.pop();
                    }
                  }]
              });
              alert.present();
          }
      })
  }

}
