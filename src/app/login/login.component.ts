import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../service/authentication-service.service';
;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationServiceService: AuthenticationServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.authenticationServiceService.isUserLoggedIn) {

      this.router.navigate(['/questions']);
    }
  }

  ngOnInit() {


  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let username = this.f.username.value;
    let password = this.f.password.value;
    this.authenticationServiceService.login(username, password)
      .subscribe((userList: any) => {

        let userInfo = this.authenticationServiceService.extactUserInfo(userList, username, password);
        if (userInfo != null) {
          this.router.navigate(["/questions"]).then(() => {
            window.location.reload();
          });
        } else {
          this.error = "Invalid username and passowrd"
          this.loading=false;
        }


      }
      );
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
