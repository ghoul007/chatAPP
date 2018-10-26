import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(private fb: FormBuilder, private alertService: AlertService) { }

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

    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      console.log(email, password);
    } else {
      const failedSignupAlert = new Alert("Please enter a calid informations ..", AlertType.Danger)
      this.alertService.alerts.next(failedSignupAlert);
    }




  }


}
