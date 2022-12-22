import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService : AuthenticationService, 
              private router : Router, 
              private toast : HotToastService) { }

  ngOnInit(): void {
  }

  /**
   * Gets the email field from the login form
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Gets the password field from the login form
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Submits the login form, if it's valid
   */
  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).pipe(
      this.toast.observe({
        error: 'Failed to log in'
      })
    )
    .subscribe(() => {
      this.router.navigate(['/products']);
    })
  }

}
