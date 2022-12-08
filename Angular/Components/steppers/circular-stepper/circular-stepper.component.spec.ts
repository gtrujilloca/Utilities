import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { CircularStepperComponent } from './circular-stepper.component';

describe('CircularStepperComponent', () => {
  let component: CircularStepperComponent;
  let fixture: ComponentFixture<CircularStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircularStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CircularStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should check changes', () => {
    const spy = spyOn(component, 'calculateProgressStyle');
    const simpleChanges: SimpleChanges = {
      percent: {
        previousValue: 10,
        currentValue: 20,
        firstChange: true,
        isFirstChange():boolean {
          return true;
        }
      }
    }

    component.ngOnChanges(simpleChanges);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });


});
