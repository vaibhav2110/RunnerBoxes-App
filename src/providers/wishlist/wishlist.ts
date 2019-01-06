import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the WishlistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WishlistProvider {

 wishLists: any = [];
 count: Number;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello WishlistProvider Provider');
    this.storage.get('runner_wishlist').then(wishes => {
      if(wishes){
        this.wishLists = wishes;
        console.log(this.wishLists);
        this.count = this.wishLists.length;
       }
      else{
        this.wishLists = [];
      }
    });   
      //this.storage.remove('runner_wishlist');
  }
    
  addToWishList(product: any, func){
        this.storage.remove('runner_wishlist');
        this.wishLists.push(product);
        this.storage.get('runner_wishlist').then(wishes => {
            if(!wishes){
                this.storage.set('runner_wishlist', this.wishLists).then(wishes => {
                    console.log(wishes);
                    func();
                });
            }else{
                this.storage.remove('runner_wishlist');
                this.storage.set('runner_wishlist', this.wishLists).then(wishes => {
                    console.log(wishes);
                    func();
                });
                
            }
        });
    }
    
    removeFromWishList(product_id: any, func){
        console.log(product_id);
        this.storage.remove('runner_wishlist');
        this.wishLists = this.wishLists.filter((wish) => {
            console.log(wish._id != product_id);
            return wish._id != product_id;
        });
        console.log(this.wishLists);
        this.count = this.wishLists.length;
        this.storage.set('runner_wishlist', this.wishLists).then(wishes => {
                    func();
                });
    }
    
    getWishLists(){
        this.storage.get('runner_wishlist').then(wishes => {
        if(wishes){
          this.wishLists = wishes;
          console.log(this.wishLists);
          this.count = this.wishLists.length;
          return this.wishLists;
         }
        else{
          return this.wishLists;
        }
      });
    }

}
