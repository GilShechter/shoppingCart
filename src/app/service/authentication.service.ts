import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword }  from '@angular/fire/auth'; 
import { from } from 'rxjs';

/**
 * Authentication service using firebase
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  /**
   * Login using email and password
   * 
   * @param email - email address
   * @param password - password
   */
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  /**
   * Logout from the application
   */
  logout() {
    return from(this.auth.signOut());
  }

  /**
   * Creates a new user
   * 
   * @param email 
   * @param password 
   */
  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

}
