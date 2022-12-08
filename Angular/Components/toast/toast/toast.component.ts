import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastService } from 'src/shared/core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose',[
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-100%'
        })
      ),
      state(
        'open',
        style({
          right: '15px'
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')])
    ])
  ]
})
export class ToastComponent implements OnInit {
  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  @ViewChild('toast', { static: false }) toast!: ElementRef<HTMLElement>;
  progressInterval:any;
  toastIconList: any = {
    0: '/shared/assets/favicons/error-alert-icon.svg',
    1: '/shared/assets/favicons/check-circle-icon.svg',
    2: '/shared/assets/favicons/alert-circle-icon-orange.svg',
  }
  toastBorderClassList: any = {
    0: 'error',
    1: 'success',
    2: 'warning',
  }


  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.toastService.open.subscribe(data => {
      if (data.show) {
        this.countDown();
      }
    })
  }

  getToastColor() {
    const key =  this.toastService.data?.type ?? 'default'
    return this.toastBorderClassList[key] || ''
  }

  getToastIcon() {
    const key =  this.toastService.data?.type ?? 'default'
    return this.toastIconList[key] || ''
  }

  closeToast() {
    this.toastService.hide()
  }

  countDown() {
    this.progressBar.nativeElement.style.width = this.toastService.data.progressWith;
    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);
      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.toastService.data.progressWith = String(width - 2);
      this.progressBar.nativeElement.style.width = `${this.toastService.data.progressWith}%`;

    },150)
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }

}
