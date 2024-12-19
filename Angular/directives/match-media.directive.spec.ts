import { ChangeDetectorRef, Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NUMBER } from '@svn/shared-utils-web';
import { MatchMediaDirective } from './match-media.directive';

@Component({
  template: `<ng-template [svnMatchMedia]="{ min: 600, max: 1200 }">Visible Content</ng-template>`,
})
class TestComponent {}

const mockTemplateRef = { createEmbeddedView: jest.fn() };
const mockViewContainerRef = {
  createEmbeddedView: jest.fn(),
  clear: jest.fn(),
};
const mockChangeDetectorRef = { detectChanges: jest.fn() };

describe('MatchMediaDirective', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('min-width: 600px'),
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MatchMediaDirective],
      providers: [
        { provide: TemplateRef, useValue: mockTemplateRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debería inicializarse correctamente y configurar el media query listener', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const directives = fixture.debugElement.queryAllNodes(
      (node) => node.injector.get(MatchMediaDirective, null) !== null
    );

    const spy = jest.spyOn(window, 'matchMedia');

    expect(directives.length).toBe(NUMBER.ONE);
    const directiveInstance = directives[0].injector.get(MatchMediaDirective);
    directiveInstance.condition = { min: 600, max: 1500 };
    directiveInstance.ngOnInit();

    expect(spy).toHaveBeenCalledWith('(min-width: 600px) and (max-width: 1200px)');
  });

  test('No debería mostrar el contenido si el media query no coincide', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const directives = fixture.debugElement.queryAllNodes(
      (node) => node.injector.get(MatchMediaDirective, null) !== null
    );

    const spy = jest.spyOn(window, 'matchMedia');

    expect(directives.length).toBe(NUMBER.ONE);
    const directiveInstance = directives[0].injector.get(MatchMediaDirective);
    directiveInstance.condition = { min: 360, max: 1024 };
    directiveInstance.ngOnInit();

    expect(spy).toHaveBeenCalledWith('(min-width: 360px) and (max-width: 1024px)');
  });
});
