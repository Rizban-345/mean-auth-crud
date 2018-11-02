import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

/* User Details interface */
export interface UserDetails {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
	exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  
  constructor(private tokenService: TokenService, private apiService: ApiService, private router: Router) { }

  /* Get logged in user details from token stored in local storage */
  public getUserDetails(): UserDetails {
  	const token = this.tokenService.getToken();
  	let payload;
  	if (token) {
  	  payload = token.split('.')[1];
  	  payload = window.atob(payload);
  	  return JSON.parse(payload);
  	} else {
  	  return null;
  	}
  }

  public isLoggedIn(): boolean {
  	const user = this.getUserDetails();
  	if (user) {
  	  return user.exp > Date.now() / 1000;
  	} else {
  	  return false;
  	}

  }

  public register(userDetails): Observable<any> {
	  return this.apiService.request('post', 'user', userDetails);
  }

  public login(loginCred): Observable<any> {
	  return this.apiService.request('post', 'login', loginCred);
  }

  public logout(): void {
	  this.tokenService.removeToken();
	  this.router.navigateByUrl('/');
  }

}
