import { UsersService } from './../../service/users.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

/**
 * A validator function that checks if the password and confirm password fields match
 * 
 * @returns {ValidatorFn} - Validator's result
 */
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

/**
 * A validator function that checks if the password contains a capital letter
 * 
 * @param control - the password field to validate
 * @returns {ValidationErrors | null} - Validator's result
 */
export function containsCapitalLetter(control: FormControl) {
  const hasCapitalLetter = /[A-Z]/.test(control.value);
  if (!hasCapitalLetter) {
    return {
      containsCapitalLetter: true
    };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), containsCapitalLetter]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: passwordsMatchValidator() })
  constructor(private authService : AuthenticationService, private router : Router,
              private toast : HotToastService, private usersService : UsersService) { }

  ngOnInit(): void { }

  /**
   * @returns - The name field's value
   */
  get name() {
    return this.signUpForm.get('name');
  }

  /**
   * @returns - The email field's value
   */
  get email(){
    return this.signUpForm.get('email');
  }

  /**
   * @returns - The password field's value
   */
  get password(){
    return this.signUpForm.get('password');
  }

  /**
   * @returns - The confirm password field's value
   */
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  /**
   * Submits the sign up form, if it's valid
   */
  submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    this.authService.signUp(email, password).pipe(
        switchMap(({ user: { uid } }) => this.usersService.addUser({ uid, name, email, cartItemsList: [] })),
        this.toast.observe({
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/products']);
      });
  }
}
