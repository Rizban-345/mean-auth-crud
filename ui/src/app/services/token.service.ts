import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;

  constructor() { }

  /* Save Token in local storage (browser) */
  public setToken(token: string): void {
	localStorage.setItem('${environment.authTokenName}', token);
	this.token = token;
  }

  /* Get token from local storage (browser) */
  public getToken(): string {
	if (!this.token) {
	  this.token = localStorage.getItem('${environment.authTokenName}');
	}
	return this.token;
  }

  /* Remove token from local storage (browser) */
  public removeToken(): void {
  	this.token = '';
  	localStorage.removeItem('${environment.authTokenName}');
  }

}