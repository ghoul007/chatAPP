import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { AlertService } from '../../services/alert.service';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder,
     private alertService: AlertService,
     private loadingService: LoadingService,
    ) { }

  ngOnInit() {
    this.initForm();
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
      console.log(email, password);
      this.loadingService.loading.next(false)
    } else {
      const failedLoginAlert = new Alert("yout email or password where invalid ..", AlertType.Danger)
      this.alertService.alerts.next(failedLoginAlert);
      this.loadingService.loading.next(false)
    }
  }


}
