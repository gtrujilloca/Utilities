import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageModule } from 'src/shared/modules/components/image/image.module';

import { PlainStepperComponent } from './plain-stepper.component';

describe('PlainStepperComponent', () => {
  let component: PlainStepperComponent;
  let fixture: ComponentFixture<PlainStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlainStepperComponent],
      imports: [
        RouterTestingModule,
        ImageModule,
        HttpClientTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlainStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return "stepperAlignCenter", alignStepper()"', () => {
    component.align = 'center';
    let result = component.alignStepper();
    expect(result).toBe("stepperAlignCenter");
  });

  it('should return "stepperAlignRight", alignStepper()"', () => {
    component.align = 'right';
    let result = component.alignStepper();
    expect(result).toBe("stepperAlignRight");
  });

  it('should return "stepperAlignLeft", alignStepper()"', () => {
    component.align = '';
    let result = component.alignStepper();
    expect(result).toBe("stepperAlignLeft");
  });
});
