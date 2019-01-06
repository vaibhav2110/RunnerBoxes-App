import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ParcelProvider } from '../../providers/parcel/parcel';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ParcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parcel',
  templateUrl: 'parcel.html',
})
export class ParcelPage {

  public parcelForm: FormGroup;
  user: any;
  token: any;
  loggedIn: Boolean = false;
  estimatedPrice: Number = 0;
  loader: any;
  pickupAddress: any = {
    address_1: '',
    address_2: '',
    location: '',
    latLng: ''
  };
  destinationAddress: any = {
    address_1: '',
    address_2: '',
    location: '',
    latLng: ''
  };
  basePrice: number;
  pricePerKm: number;
  pricing: any;
  pickupLocation: String = 'Select Pickup Location';
  destLocation: String = 'Select Destination Location';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,private _FB: FormBuilder, public storage: Storage, public loading: LoadingController, private toastCtrl: ToastController, private parcelProvider: ParcelProvider, private modalCtrl: ModalController, private alertCtrl: AlertController) {
      this.parcelForm = this._FB.group({
          'pickup_address': this._FB.group({
              'address_1': ['', Validators.required],
              'address_2': ['', Validators.required],
              'address_3': ['', Validators.required],
              'state': ['', Validators.required],
              'pincode': ['', Validators.required]
          }),
          'weight': ['', Validators.required],
          'destination_address': this._FB.group({
              'address_1': ['', Validators.required],
              'address_2': ['', Validators.required],
              'address_3': ['', Validators.required],
              'state': ['', Validators.required],
              'pincode': ['', Validators.required]
          })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParcelPage');
    this.onChanges();
    this.parcelProvider.getPricing()
    .subscribe(res => {
        this.pricing = res[0];
        this.basePrice = this.pricing.basePrice;
        this.pricePerKm = this.pricing.pricePerKm;
        console.log(this.pricing);
    })
  }
    
  onChanges(){
      this.parcelForm.get('weight').valueChanges.subscribe(val => {
          console.log(val);
          if(val <= 5){
              this.estimatedPrice = 40;
          }else if(val > 5 && val <=10){
              this.estimatedPrice = 100;
          }else if(val > 10 && val <=20){
              this.estimatedPrice = 500;
          }else if(val > 20){
              this.estimatedPrice = 1000;
          }
      });
  }
    
  ionViewDidEnter() {
    this.storage.get('runner_user')
      .then(user => {
          if(user){
              let user_obj = JSON.parse(user);
              console.log(user_obj.token);
              this.token = user_obj.token;
              this.authProvider.getUserInfo(user_obj.token)
              .subscribe(res => {
                  this.user = res.user;
                  console.log(this.user);
              }, err => console.log(err));
              this.loggedIn = true;
          }else{
              let alert = this.alertCtrl.create({
                title: 'User',
                subTitle: 'Please login to send parcels',
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
          
      });
    console.log('ionViewDidLoad MePage');
  }
    
  submit(){/*
      this.loader = this.loading.create({
          content: 'Submitting..',
          spinner: 'bubbles'
        });
      this.loader.present();
      let obj = this.parcelForm.value;
      obj['estimatedPrice'] = this.estimatedPrice;
      obj['user'] = this.user._id;
      console.log(obj);
      
      this.parcelProvider.sendParcel(this.token, obj)
      .subscribe(res => {
          if(res.success){
              this.loader.dismiss();
              this.parcelForm.reset();
              this.user = res.user;
              let toast = this.toastCtrl.create({
                message: 'Info Submitted...We will contact you shortly',
                duration: 3500
              });
              toast.present();
          }else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => console.log(err));
      */
      let obj = {};
      obj['pickup_address'] = this.pickupAddress;
      obj['destination_address'] = this.destinationAddress;
      obj['estimatedPrice'] = this.estimatedPrice;
      obj['user'] = this.user._id;
      console.log(obj);
      this.loader = this.loading.create({
          content: 'Submitting..',
          spinner: 'bubbles'
        });
      this.loader.present();
      this.parcelProvider.sendParcel(this.token, obj)
      .subscribe(res => {
          console.log(res);
          if(res.success){
              this.loader.dismiss();
              this.user = res.user;
              let toast = this.toastCtrl.create({
                message: 'Info Submitted...We will contact you shortly',
                duration: 3500
              });
              toast.present();
              this.navCtrl.pop();
          }else{
              console.log(res);
              this.loader.dismiss();
          }
      }, err => console.log(err));
  }
    
  openPickup(){
      let modal = this.modalCtrl.create('MapPage');
      modal.onDidDismiss((data)=>{
            console.log(data);
            if(data.address_1 && data.address_2){
                this.pickupAddress.address_1 = data.address_1;
                this.pickupAddress.address_2 = data.address_2;
                this.pickupLocation = data.location;
                this.pickupAddress.location = data.location;
                this.pickupAddress.latLng = data.latLng;
            }
        })
      modal.present();
  }
    
  openDest(){
      let modal = this.modalCtrl.create('MapPage');
      modal.onDidDismiss((data)=>{
            console.log(data);
            if(data.address_1 && data.address_2){
                this.destinationAddress.address_1 = data.address_1;
                this.destinationAddress.address_2 = data.address_2;
                this.destinationAddress.location = data.location;
                this.destinationAddress.latLng = data.latLng;
                this.destLocation = data.location;
                let dist = this.getDistance(this.pickupAddress.latLng, this.destinationAddress.latLng);
                this.estimatedPrice = Math.floor(this.basePrice + dist*this.pricePerKm);
            }
        })
      modal.present();
  }
    
  rad(x){
      return x * Math.PI / 180;
  }
    
    getDistance(p1,p2){
        let R = 6378137; // Earth’s mean radius in meter
        let dLat = this.rad(p2.lat - p1.lat);
        let dLong = this.rad(p2.lng - p1.lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d/1000;
    }

}
