import { TestBed } from '@angular/core/testing';
import { ToastData } from '../../dto/Toast';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call to initialize and do match with initial object', () => {
    const obj: ToastData = {
      title: 'Greeting',
      content: 'What are you do ?'
    }

    service.initialize(obj)

    expect(service.data).toEqual({
      ...obj,
      show: true,
      progressWith: '100%'
    })
  })

  it('Should call hide method and show will be false', () => {
    service.hide();
    expect(service.data.show).toBeFalse();
  })
});
