import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, {static: false}) alertCuePoint: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      this.error = null;

      const authObs: Observable<AuthResponseData> = this.isLoginMode ?
        this.authService.login(email, password) :
        this.authService.signup(email, password);
      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.showErrorAlert(error);
        }
      );

      form.resetForm();
    }
  }

  onHandleAlertClose() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory<AlertComponent>(AlertComponent);
    const hostViewContainerRef = this.alertCuePoint.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    const alertComponent = alertComponentRef.instance;
    alertComponent.message = message;
    this.closeSub = alertComponent.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
