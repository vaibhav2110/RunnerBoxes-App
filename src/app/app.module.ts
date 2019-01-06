import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { AuthProvider } from '../providers/auth/auth';
import { CartProvider } from '../providers/cart/cart';
import { FoodProvider } from '../providers/food/food';
import { GiftProvider } from '../providers/gift/gift';
import { ElectronicProvider } from '../providers/electronic/electronic';
import { BookProvider } from '../providers/book/book';
import { ClotheProvider } from '../providers/clothe/clothe';
import { WishlistProvider } from '../providers/wishlist/wishlist';
import { ParcelProvider } from '../providers/parcel/parcel';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErrorHandlerProvider,
    AuthProvider,
    CartProvider,
    FoodProvider,
    GiftProvider,
    ElectronicProvider,
    BookProvider,
    ScreenOrientation,
    ClotheProvider,
    WishlistProvider,
    ParcelProvider,
    Geolocation
  ]
})
export class AppModule {}
