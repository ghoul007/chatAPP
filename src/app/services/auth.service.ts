import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { Alert } from '../classes/alert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: Observable<User | null>
  constructor(private HttpClient: HttpClient,
    private router: Router,
    private alertService: AlertService) {

    this.currentUser = of(null);

  }


  public signup(firstName: string, lastName: string, email: string, password: string) {
    // TODO signup implementation
    return of(true);
  }


  public login(email: string, password: string) {
    // TODO login implementation
    return of(true);
  }

  public logout() {
    // TODO logout Implementation
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('you have been signed out')
  }
}
