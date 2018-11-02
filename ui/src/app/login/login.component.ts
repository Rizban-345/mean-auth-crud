import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* to use in login form and while submitting the login in doLogin */
  loginCred: any = {
  	unique_key: '',
  	password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	/* This is used so that logged in user cannot see login page */
  	if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/profile');
      return false;
    }
  }

  doLogin() {
  	this.authService.login(this.loginCred).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

}