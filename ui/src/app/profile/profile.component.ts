import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {
  	name: '',
  	email: '',
  	mobile: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const user = this.authService.getUserDetails();
  	
	  if(user.firstName) {
	  	this.profile.name += user.firstName;
	  }

	  if(user.lastName) {
	  	this.profile.name += ' '+ user.lastName;
	  }

	  if(user.email) {
	  	this.profile.email = user.email
	  }

	  if(user.mobile) {
	  	this.profile.mobile = user.mobile;
	  }
  }

}