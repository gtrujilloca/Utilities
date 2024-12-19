import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
interface MatchMedia {
  min: number;
  max?: number;
}
export const EVENT_DEBOUNCE_TIME = 150;

@Directive({
  selector: '[svnMatchMedia]',
  standalone: true,
})
export class MatchMediaDirective implements OnInit, OnDestroy {
  @Input({
    required: true,
    alias: 'svnMatchMedia',
  })
  condition!: MatchMedia;
  private readonly _templateRef = inject(TemplateRef<unknown>);
  private readonly _viewContainer = inject(ViewContainerRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _destroy$ = new Subject<void>();
  private mediaQuery!: MediaQueryList;

  ngOnInit(): void {
    this.mediaQuery = this.createMathMedia();
    this.createMediaQueryListener();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private createMathMedia() {
    let media = `(min-width: ${this.condition.min}px)`;
    if (this.condition.max) {
      media += ` and (max-width: ${this.condition.max}px)`;
    }

    return window.matchMedia(media);
  }

  private createMediaQueryListener() {
    fromEvent(this.mediaQuery, 'change')
      .pipe(
        debounceTime(EVENT_DEBOUNCE_TIME),
        map(() => this.mediaQuery.matches),
        startWith(this.mediaQuery.matches),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this._destroy$))
      .subscribe((isVisible) => {
        this.updateElementVisibility(isVisible);
      });
  }

  private updateElementVisibility(isVisible: boolean) {
    isVisible ? this._viewContainer.createEmbeddedView(this._templateRef) : this._viewContainer.clear();
    this._changeDetectorRef.detectChanges();
  }
}
