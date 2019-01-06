import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyparcelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myparcels',
  templateUrl: 'myparcels.html',
})
export class MyparcelsPage {

  token: any;
  parcels: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authProvider: AuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyparcelsPage');
    this.storage.get('runner_user')
      .then(user => {
          if(user){
              let user_obj = JSON.parse(user);
              console.log(user_obj.token);
              this.authProvider.getUserInfo(user_obj.token)
              .subscribe(res => {
                  
                  this.parcels = res.user.my_parcels;
                  console.log(this.parcels);
              }, err => console.log(err));
          }else{
              let alert = this.alertCtrl.create({
                title: 'User',
                subTitle: 'Please log in to view your parcels',
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
