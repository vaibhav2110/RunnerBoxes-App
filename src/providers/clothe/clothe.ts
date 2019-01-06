import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseURL';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
/*
  Generated class for the ClotheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClotheProvider {

  constructor(public http: HttpClient, private errorHandler: ErrorHandlerProvider) {
    console.log('Hello ClotheProvider Provider');
  }
    
  getClothes(): Observable<any[]> {
      return this.http.get(`${baseURL}/clothes`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  search(searchKey): Observable<any> {
      return this.http.get(`${baseURL}/clothes/search/?searchKey=${searchKey}`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getShops(): Observable<any[]> {
      return this.http.get(`${baseURL}/clothes/shops`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getShopClothes(shopId): Observable<any> {
      return this.http.get(`${baseURL}/clothes/clothes/${shopId}`)
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
    
  getBannerImage(): Observable<any>{
      return this.http.get(baseURL+'/banner')
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
}
