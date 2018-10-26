import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  returnUrl: string;
  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {this.initForm(); }

  ngOnInit() {
    this.returnUrl =  this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  submitForm() {
    this.loadingService.loading.next(true)
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.subscriptions.push(this.authService.login(email,password).subscribe(success=>{
        if(success){
          this.loadingService.loading.next(false)
          this.router.navigateByUrl(this.returnUrl);
        }else{
          this.loadingService.loading.next(false)
        }
      }))
    } else {
      const failedLoginAlert = new Alert("yout email or password where invalid ..", AlertType.Danger)
      this.alertService.alerts.next(failedLoginAlert);
      this.loadingService.loading.next(false)
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
