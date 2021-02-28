import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { AuthenticationServiceService } from './service/authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medisurvey-ui';
  isUserLoggedIn: boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationServiceService
) {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn;
    if(!this.isUserLoggedIn){
      this.router.navigate(['/login']);
    }
    console.log(this.isUserLoggedIn);
}

logout() {
    this.isUserLoggedIn =false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
