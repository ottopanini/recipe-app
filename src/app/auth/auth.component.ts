import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

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

      if (this.isLoginMode) {
        // ...
      } else {
        this.authService.signup(email, password).subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
          },
          error => {
            console.log(error);
            this.isLoading = false;
            switch (error.error.error.message) {
              case 'EMAIL_EXISTS': this.error = 'E-Mail already in use'; break;
              default:             this.error = 'an error';
            }
          }
        );
      }

      form.resetForm();
    }
  }
}
