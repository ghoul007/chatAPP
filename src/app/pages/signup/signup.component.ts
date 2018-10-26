import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.initForm();
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


    this.loadingService.loading.next(true)
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      console.log(email, password);
      this.loadingService.loading.next(false)
    } else {
      const failedSignupAlert = new Alert("Please enter a calid informations ..", AlertType.Danger)
      this.alertService.alerts.next(failedSignupAlert);
      this.loadingService.loading.next(false)
    }




  }


}
