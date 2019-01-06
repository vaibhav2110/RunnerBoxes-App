import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseURL';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodProvider {

  constructor(public http: HttpClient, private errorHandler: ErrorHandlerProvider) {
    console.log('Hello FoodProvider Provider');
  }

  getFoods(): Observable<any[]> {
      return this.http.get(`${baseURL}/foods`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  search(searchKey): Observable<any> {
      return this.http.get(`${baseURL}/foods/search/?searchKey=${searchKey}`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getShops(): Observable<any[]> {
      return this.http.get(`${baseURL}/foods/shops`)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
  }
    
  getRestFoods(shopId): Observable<any> {
      return this.http.get(`${baseURL}/foods/foods/${shopId}`)
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
