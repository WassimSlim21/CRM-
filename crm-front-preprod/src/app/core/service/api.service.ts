import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Account } from '../models/account';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {




  user: Account;
  users: any;
  jwtToken = null;


  private apiUrl: string = environment.apiUrl;
  private KpeizUrl: string = 'https://api.kpeiz.digital/' ;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }



  /* --------------------------------Authentification and Register Services ------------------ */


/* -------Create new account -------- */
  public register(user: object) {
    return this.http.post(this.apiUrl + 'account/register', user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    });
  }
/* ------update account -------- */
  update(account: object) {

    return this.http.put(this.apiUrl + 'account/update' , account);
  }



  getToken() {
    return localStorage.getItem('token');

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }




  setLoggedin() {
    localStorage.removeItem('loggedin');
    localStorage.setItem('loggedin', 'true');
}

setLoggedOut() {
   localStorage.removeItem('token');
   localStorage.removeItem('account');
   localStorage.removeItem('loggedin');
   localStorage.setItem('loggedin', 'false');
   localStorage.clear();
}

getLoggedin() {
    return localStorage.getItem('loggedin');
}

loadToken() {
    this.jwtToken = localStorage.getItem(TOKEN_KEY);
}

public isAuthenticated(): boolean {
  // const token = window.sessionStorage.getItem('token');
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

getCurrentUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
}



sendCredential(userName: string, password: string): Observable<any> {
    const credentials = {userName, password};

    return this.http.post<any>(this.apiUrl + 'account/login', credentials);
}

apiPost(endpoint, body) {
  return this.http.post(this.apiUrl + endpoint, body);
}
apiGetAll(endpoint) {
  return this.http.get(this.apiUrl + endpoint);
}
apiPut(endpoint, body) {
  return this.http.put(this.apiUrl + endpoint, body);
}
apiDelete(endpoint) {
  return this.http.delete(this.apiUrl + endpoint);
}

getUserAllData(id: string) {
  return this.http.get<any>(this.apiUrl + 'user/' + id );
}

getKpeizRoute(endpoint: string) {
  return this.http.get(this.KpeizUrl + endpoint);
}
apiPostWithOptions( endpoint, body) {
  return this.http.post(this.apiUrl + endpoint, body);
}

public upload(endpoint, body) {

return this.http.post<any>(this.apiUrl + endpoint, body, {
      reportProgress: true,
      observe: 'events'
    });
}

}
