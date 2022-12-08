import { Component, Input } from '@angular/core';

type Config = {
  width?: string;
  height?: string;
  'max-width'?: string;
  'max-height'?: string;
  'border-radius'?: string;
  padding?: string;
  margin?: string;
  isLight?: boolean;
};

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() config: Config = {};
}
