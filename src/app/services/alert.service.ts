import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../classes/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Subject<Alert> = new Subject();

  constructor() { }
}
