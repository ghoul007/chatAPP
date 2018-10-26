import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  public alerts: Array<Alert> = [];
  loading: boolean = false;
  constructor(private alertService: AlertService, private loadingService: LoadingService) {



  }


  ngOnInit() {

    this.subscription.push(this.alertService.alerts.subscribe(alerts => {
      this.alerts.push(alerts);
    }))
    this.subscription.push(this.loadingService.loading.subscribe(isLoading => {
      this.loading = isLoading;
    }))
  }



  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
