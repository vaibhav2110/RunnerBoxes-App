import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseURL';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
/*
  Generated class for the GiftProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GiftProvider {

  constructor(public http: HttpClient, private errorHandler: ErrorHandlerProvider) {
    console.log('Hello GiftProvider Provider');
  }
    
  getGifts(): Observable<any[]> {
      return this.http.get(`${baseURL}/gifts`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  search(searchKey): Observable<any> {
      return this.http.get(`${baseURL}/gifts/search/?searchKey=${searchKey}`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getShops(): Observable<any[]> {
      return this.http.get(`${baseURL}/gifts/shops`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getShopGifts(shopId): Observable<any> {
      return this.http.get(`${baseURL}/gifts/gifts/${shopId}`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  shopSearch(searchKey): Observable<any> {
      return this.http.get(`${baseURL}/shops/search/?searchKey=${searchKey}`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }

}
