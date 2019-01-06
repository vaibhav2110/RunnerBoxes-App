import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  
  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Fashion', icon: 'shirt', component: 'ClotheshopsPage' },
      { title: 'Foods', icon: 'pizza', component: 'RestaurantsPage' },
      { title: 'Electronics', icon: 'phone-portrait', component: 'ElectronicshopsPage' },
      { title: 'Books', icon: 'book', component: 'BookshopsPage' },
      { title: 'Gifts', icon: 'rose', component: 'GiftshopsPage' },
      { title: 'My Wishlist', icon: 'ios-heart', component: 'WishlistPage' },
      { title: 'Delivery Service', icon: 'cube', component: 'ParcelPage' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.backgroundColorByHexString('#3DBFA1');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Home'){
        this.nav.setRoot(page.component);
    }else{
        this.nav.push(page.component);
    }
    
  }
    
  openMyOrders(){
      this.nav.push('MyorderPage');
  }
  openMyParcels(){
      this.nav.push('MyparcelsPage');
  }
  openMyProfile(){
      this.nav.push('SigninPage');
  }
}
