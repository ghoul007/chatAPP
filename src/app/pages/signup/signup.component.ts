import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router

  ) { this.initForm(); }

  ngOnInit() {

  }

  initForm() {
    this.signupForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  submitForm() {
    if (this.signupForm.valid) {
      this.loadingService.loading.next(true)
      const { firstName, lastName, email, password } = this.signupForm.value;
      this.subscriptions.push(this.authService.signup(firstName, lastName, email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/chat']);
        } else {
          const failedSignupAlert = new Alert("there was a problem signup , try again ..", AlertType.Danger)
          this.alertService.alerts.next(failedSignupAlert);
        }
        this.loadingService.loading.next(false)
      })
      )
    } else {
      const failedSignupAlert = new Alert("Please enter a calid informations ..", AlertType.Danger)
      this.alertService.alerts.next(failedSignupAlert);
      this.loadingService.loading.next(false)
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
