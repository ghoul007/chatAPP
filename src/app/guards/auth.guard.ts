import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../classes/alert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
    private alertService: AlertService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser),
      tap((loggedIn => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('you must be logged', AlertType.Danger));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        }
      }))
    )

  }
}
