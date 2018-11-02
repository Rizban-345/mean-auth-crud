import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  /* to use in html form and while submitting the form in doRegistration */
  reg: any = {
  	firstName: '',
  	lastName: '',
  	email: '',
  	mobile: '',
  	password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    /* This is used so that logged in user cannot see registration page */
  	if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/profile');
      return false;
    }
  }

  doRegistration() {
    this.authService.register(this.reg).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

}