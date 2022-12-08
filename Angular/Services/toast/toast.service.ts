import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastData } from '../../dto/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  data!: ToastData;
  public open = new Subject<ToastData>();

  initialize(data: ToastData) {
    this.data = { ...data, show: true, progressWith: '100%' };
    this.open.next(data);
  }

  hide() {
    this.data = { ...this.data, show: false}
    this.open.next(this.data);
  }
}
