import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { Alert } from '../classes/alert';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from } from "rxjs";
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: Observable<User | null>
  public user: User | null;
  constructor(private HttpClient: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {

    // this.currentUser = of(null);
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null)
        }
      })
    )

    this.currentUser.subscribe((user) => {
      this.user = user;
    })
  }


  public signup(firstName: string, lastName: string, email: string, password: string) {
    // TODO signup implementation

    // return new Promise((resolve, reject) => {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-ef592.appspot.com/o/profile.jpeg?alt=media&token=00d3ebb1-df7e-4b0a-b908-b868c03868d7'
          }
          userRef.set(updatedUser);
          return true;
          // resolve(true);
        }
      ).catch(error => false)
    )
  }

  // return of(true);



  public login(email: string, password: string) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        return true
      }
    ).catch((error) => error))
    // return of(true);
  }

  public logout() {

    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('you have been signed out')
      );
    })
  }
}
