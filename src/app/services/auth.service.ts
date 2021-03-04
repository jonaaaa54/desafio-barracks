import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { UserData } from '../models/user-data';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  // Login service to get data from rest.
  logIn(credentials: FormGroup){

    let mail = credentials.get('mail')?.value;
    let password = credentials.get('password')?.value;

    let routeLogIn = environment.logInBarracks;

    return this.http.post<UserData>(routeLogIn, {mail, password}).pipe(
      map(response =>{

        let result = response;
        if(result && result.token){
          localStorage.setItem('token',result.token);
          return true;
        }

      return false;
    }));

  }

  logOut(){
    localStorage.removeItem('token');
  }

  // This method is constructed with npm @auth0/angular-jwt
  isLoggedIn(): boolean{

    const jwtHelper = new JwtHelperService()
    const token = localStorage.getItem('token');

    if(!token) return false;


    const isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

}

