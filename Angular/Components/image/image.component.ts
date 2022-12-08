import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() imageSrc: string = '';
  @Input() breakpoint: string = '(max-width: 1024px)';
  @Input() imageMobileSrc: string = '';
  @Input() altText: string = '';
  @Input() type: 'cover' | 'contain' | 'fill' = 'contain';
}
