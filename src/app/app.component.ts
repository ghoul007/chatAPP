import { Component } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public alerts: Array<Alert> = [];
  constructor(private alertService: AlertService) {
    this.alertService.alerts.subscribe(alerts => {
      this.alerts.push(alerts);
    })
  }
}
