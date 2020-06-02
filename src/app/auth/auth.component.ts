import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;

      const authObs: Observable<AuthResponseData> = this.isLoginMode ?
        this.authService.login(email, password) :
        this.authService.signup(email, password);
      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.error = error;
        }
      );

      form.resetForm();
    }
  }
}
