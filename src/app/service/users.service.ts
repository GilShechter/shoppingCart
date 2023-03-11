import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserProfile } from './../models/user-profile';
import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
/**
 * Users service
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currUid : string = "";
  constructor(private firestore : Firestore, private authService : AuthenticationService) { }

  /**
   * Gets the current user's profile
   * 
   * @returns {Observable<UserProfile>} - the current user's profile
   */
  get currentUserProfile$(): Observable<UserProfile | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        this.currUid = user?.uid;
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<UserProfile>;
      })
    );
  }

  /**
   * Adds a user to the database
   * 
   * @param {user} - user to add
   * @returns {Observable<void>} - user added
   */
  addUser(user : UserProfile) : Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  /**
   * Updates user in the database
   * 
   * @param updatedCart - the updated cart to be updated in the user's database
   */
  updateUser(updatedCart : any) : void {
    const user = this.currentUserProfile$;
    const ref = doc(this.firestore, 'users', this.currUid);
    updateDoc(ref, { cartItemsList : updatedCart });
  }
}
