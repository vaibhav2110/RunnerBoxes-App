import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { baseURL } from '../../shared/baseURL';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
/*
  Generated class for the ParcelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParcelProvider {

  constructor(public http: HttpClient, private errorHandler: ErrorHandlerProvider) {
    console.log('Hello ParcelProvider Provider');
  }
    
  sendParcel(token, parcel){
      console.log(token);
        const headers: HttpHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.post(baseURL + '/parcels/sendParcel', parcel, {headers})
    .catch(error=> {return this.errorHandler.handleError(error);});
    }
    
    getPricing(){
        return this.http.get(baseURL + '/parcels/pricing')
            .catch(error=> {return this.errorHandler.handleError(error);});
        }
    }

