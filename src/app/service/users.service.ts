import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserProfile } from './../models/user-profile';
import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currUid : string = "";
  constructor(private firestore : Firestore, private authService : AuthenticationService) { }

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

  addUser(user : UserProfile) : Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(updatedCart : any) : void {
    const user = this.currentUserProfile$;
    const ref = doc(this.firestore, 'users', this.currUid);
    updateDoc(ref, { cartItemsList : updatedCart });
  }
}
