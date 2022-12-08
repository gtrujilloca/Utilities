import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastTypes } from 'src/shared/core/dto/Toast';
import { ToastService } from 'src/shared/core/services/toast/toast.service';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToastComponent, NoopAnimationsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
  });

  beforeEach(() => {
    toastService.data = {
      content: 'Test',
      show: true,
      type: ToastTypes.success
    }
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call countdown method', () => {
    const spy = spyOn(component, 'countDown').and.callThrough();
    toastService.open.next({
      content: 'Test',
      show: true,
      type: ToastTypes.success
    })
    expect(spy).toHaveBeenCalled();
  })

  it('Should call countdown method with progressBar width in zero', () => {
    spyOn(component, 'countDown').and.callThrough();
    spyOn(toastService,'hide').and.callThrough();

    const elem = fixture.debugElement.query(By.css('.progress__bar'));
    elem.nativeElement.style.width = '0%';

    component.countDown();
    expect(component.progressBar.nativeElement.style.width).toEqual('0%')
  })

  it('Should call getColor method', () => {

    // Good way

    let color = component.getToastColor();
    const expectedColor = component.toastBorderClassList[ToastTypes.success];
    expect(color).toEqual(expectedColor);

    // Bad way
    toastService.data = {
        content: 'Test',
        show: true,
        type: undefined
    }

    color = component.getToastColor();
    expect(color).toEqual('');
  })


  it('Should call getToastIcon method', () => {

    // Good way

    let color = component.getToastIcon();
    const expectedIcon = component.toastIconList[ToastTypes.success];
    expect(color).toEqual(expectedIcon);

    // Bad way
    toastService.data = {
        content: 'Test',
        show: true,
        type: undefined
    }

    color = component.getToastIcon();
    expect(color).toEqual('');
  })

  it('Should call closeToast',() => {
    const hideSpy = spyOn(toastService, 'hide').and.callThrough();
    const closeIcon = fixture.debugElement.query(By.css('img.toast__body__close'));
    closeIcon.triggerEventHandler('click',null);
    expect(hideSpy).toHaveBeenCalled();
  })

  it('Should call stopCountDown method', () => {
    const spy = spyOn(component, 'stopCountDown').and.callThrough();
    component.stopCountDown();
    expect(spy).toHaveBeenCalledWith();
  })
});
