import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-stepper',
  templateUrl: './circular-stepper.component.html',
  styleUrls: ['./circular-stepper.component.scss'],
})
export class CircularStepperComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() widthCircle: number = 158;
  @Input() percent: number = 10;
  @Input() strokeWidth: number = 10;

  @Input() colorProgress: string = '#d7f205';
  @Input() colorBackground: string = '#BDBDBD';

  public heightCircle: number = 158;
  public ratio: number = 74;
  public cx: number = 79;
  public cy: number = 79;
  public perimeter: number = 64;
  public percentCalculated: number = 0;
  public progressStyle: object = {};
  public contentStyle: object = {};
  public backgroundStyle: object = {};

  ngOnInit(): void {
    this.heightCircle = this.widthCircle;
    this.ratio = (this.widthCircle - this.strokeWidth) / 2;
    this.cx = this.ratio + (this.strokeWidth / 2);
    this.cy = this.ratio + (this.strokeWidth / 2);
    this.perimeter = 2 * this.ratio * 3.14;

    this.contentStyle = {
      'width': `${this.widthCircle}px`,
      'height': `${this.heightCircle}px`,
      'position': 'relative'
    };
    this.backgroundStyle = {
      'stroke-width': `${this.strokeWidth}px`,
      'stroke': this.colorBackground
    };

    this.percentCalculated = (this.percent * this.perimeter) / 100;
    this.calculateProgressStyle();
  }

  ngOnChanges(changes: SimpleChanges){
    const { percent } = changes;

    if (percent) {
      this.percentCalculated = (this.percent * this.perimeter) / 100;
      this.calculateProgressStyle();
    }
  }

  calculateProgressStyle(): void {
    this.progressStyle = {
      'stroke-dasharray': `${this.percentCalculated} 999`,
      'stroke-width': `${this.strokeWidth}px`,
      'stroke': this.colorProgress
    }
  }
}
