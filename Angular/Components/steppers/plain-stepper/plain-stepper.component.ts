import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-plain-stepper',
  templateUrl: './plain-stepper.component.html',
  styleUrls: ['./plain-stepper.component.scss'],
})
export class PlainStepperComponent {
  @Input() totalSteps: number = 3;
  @Input() position: number = 1;
  @Input() align: string = 'left';
  @Input() showActualIndicatior: boolean = true;

  public alignStepper(): string {
    if (this.align === 'center') return 'stepperAlignCenter';
    if (this.align === 'right') return 'stepperAlignRight';
    return 'stepperAlignLeft';
  }

  public inlineStyles(): object{
    return { 'left': `${(this.position - 1) * 20}px` }
  }

  public stepsArray() {
    return Array(this.totalSteps + 1);
  }
}
