import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainStepperComponent } from './plain-stepper.component';

@NgModule({
  declarations: [PlainStepperComponent],
  imports: [CommonModule],
  exports: [PlainStepperComponent]
})
export class PlainStepperModule {}
