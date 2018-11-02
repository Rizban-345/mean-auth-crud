import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import { TokenService } from './services/token.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UiModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  	TokenService,
    ApiService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }