import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../../interfaces/user';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  private subscription: Subscription[] = [];
  public uploadPerecent: number = 0;
  public downloadUrl: string | null = null

  constructor(
    private auth: AuthService,
    private laodinService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private fs: AngularFireStorage,
    private alertService: AlertService,
    private location:Location
  ) {
    this.laodinService.loading.next(true)

  }

  ngOnInit() {
    this.subscription.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.laodinService.loading.next(false);
      })
    )


    this.subscription.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    )
  }


  public uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const task = this.fs.upload(filePath, file);

    this.subscription.push(
      task.percentageChanges().subscribe(percentage => {
        if (percentage < 100) {
          this.laodinService.loading.next(true);
        } else {
          this.laodinService.loading.next(false);
        }
        this.uploadPerecent = percentage;
      }
      )
    )


    // this.subscription.push(
    //   task.downloadURL().subscribe(url => {
    //     this.downloadUrl = url
    //   })
    // )
  }

  public save() {

    let photo;
    if (this.downloadUrl) {
      photo = this.downloadUrl;
    } else {
      photo = this.currentUser.photoUrl
    }

    const user = Object.assign({}, this.currentUser, { photoUrl: photo });
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user);
    this.alertService.alerts.next(new Alert('your profile was success updated', AlertType.Success));
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe())
  }

}
