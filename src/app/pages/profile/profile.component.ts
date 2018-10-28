import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {
    // this.loadingService.loading.next(true);




  }

  ngOnInit() {

    this.subscriptions.push(
      this.auth.currentUser.subscribe((user) => {
        this.currentUser = user;
      })
    )

this.subscriptions.push(
  this.route.paramMap.subscribe(params=>{
    const userId = params.get('userId');
    const userRef:AngularFirestoreDocument<User> =
    this.db.doc(`users/${userId}`);
    userRef.valueChanges().subscribe(
      user=>{
        this.user=user;
      }
    )
  })
)

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
