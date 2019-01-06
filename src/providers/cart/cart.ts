import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { baseURL } from '../../shared/baseURL';
import { ErrorHandlerProvider } from '../error-handler/error-handler';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
    
    carts: Array<any>;
    cartItems: any = [];
    item_count: Subject<number> = new Subject<number>();
    count: number = 0;

  constructor(public http: HttpClient, private storage: Storage, private errorHandler: ErrorHandlerProvider) {
    
    console.log('Hello CartProvider Provider');
    this.carts = [];
    this.item_count.next(this.carts.length);
    this.storage.get('runner_cart').then(carts => {
      if(carts){
        this.carts = carts;
        console.log(this.carts);
        this.item_count.next(this.carts.length);
        this.count = this.carts.length;
       }
      else{
        this.carts = [];
        console.log('both');
        this.item_count.next(0);
      }
    });
  }
    
    addToCart(cartItem: any): boolean{
        console.log(this.carts);
        cartItem['quantity'] = 1;
        console.log(cartItem);
        let isPresent = false;
        this.carts.forEach(item => {
            if(item._id === cartItem._id){
                isPresent = true;
            }
        });
        if(isPresent){
            return false;
        }
        this.storage.remove('runner_cart');
        this.carts.push(cartItem);
        this.storage.set('runner_cart', this.carts);
        console.log(this.carts);
        this.item_count.next(this.carts.length);
        this.count++;
        return true;
    }
    getItemCount(): Observable<number> {
        return this.item_count.asObservable();
    }
    getCount(): number{
        return this.count;
    }
    removeItem(_id: any, func){
        this.storage.remove('runner_cart');
        this.carts = this.carts.filter((cartItem) => {
            return cartItem._id !== _id;
        });
        this.storage.set('runner_cart', this.carts).then(carts => {
            func();
        });
        this.count = this.carts.length;
        this.item_count.next(this.carts.length);
        
      }
    getCart():Array<any>{
        console.log(this.carts);
        return this.carts;
    }
    emptyCart():Array<any>{
        this.storage.remove('runner_cart');
        this.carts = [];
        this.storage.set('runner_cart', this.carts);
        return this.carts;
    }
    placeOrder(token, order){
        const headers: HttpHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.post(baseURL + '/orders/placeOrder', order, {headers})
    .catch(error=> {return this.errorHandler.handleError(error);});
    }

}
