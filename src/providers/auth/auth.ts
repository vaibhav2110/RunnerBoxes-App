import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../shared/baseURL';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ErrorHandlerProvider } from '../error-handler/error-handler';
import { map } from 'rxjs/operators/map';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/delay';

interface AuthResponse {
    status: string,
    success: string,
    token: string
};
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  id: string;
  user_id: string;
  token: string;
  authenticated: boolean = false;
    
  constructor(public http: HttpClient, private storage: Storage, private errorHandler: ErrorHandlerProvider) {
    console.log('Hello AuthProvider Provider');
  }
  logIn(user: any): Observable<any> {
        return this.http.post<AuthResponse>(baseURL + '/users/login', {"email": user.email, "password": user.password})
      .map(res => {
          console.log(res);
          this.storeUserCredentials({email: user.email, token: res.token});
          return {'success': true, 'email': user.email};
      })
      .catch(error => {
          console.log(error);
          return this.errorHandler.handleError(error);
      });
        
    }
    
    storeUserCredentials(credentials: any){
        console.log("storeUserCredentials", credentials);
        this.storage.set('runner_user', JSON.stringify(credentials));
        this.token = credentials.token;
        this.authenticated = true;
    }
    
    logOut(){
        this.token = undefined;
        this.storage.remove('runner_user');
        this.authenticated = false;
    }
    
    isLoggedIn(): Boolean {
        return this.authenticated;
    }
    
    getId(): string {
        return this.id;
    }
    getUserId(): string {
        return this.user_id;
    }
    getUser(user_id: any, token: any){
        return this.http.get(``)
      .catch(error => {
          return this.errorHandler.handleError(error);
      });
    }
    
    signIn(user: any){
      return this.http.post(baseURL + '/users/register',user)
      .catch(error=> {return this.errorHandler.handleError(error);});
      
  }
    
  getUserInfo(token){
      console.log(token);
     const headers: HttpHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.get(baseURL + '/users/me', {headers})
    .catch(error=> {return this.errorHandler.handleError(error);});
  }
  changeUserAddress(token, address){
      const headers: HttpHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.post(baseURL + '/users/address', address, {headers})
    .catch(error=> {return this.errorHandler.handleError(error);});
  }
    
  forgotPassword(email){
      return this.http.post(baseURL + '/users/forgot', {email: email})
    .catch(error=> {return this.errorHandler.handleError(error);});
  }
    
  resetPassword(password, token){
      return this.http.post(baseURL + '/users/reset/'+token, {password: password})
    .catch(error=> {return this.errorHandler.handleError(error);});
  }

}
