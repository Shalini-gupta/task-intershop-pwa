import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShHeaderNavigationComponent } from './sh-header-navigation.component';

describe('Sh Header Navigation Component', () => {
  let component: ShHeaderNavigationComponent;
  let fixture: ComponentFixture<ShHeaderNavigationComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShHeaderNavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShHeaderNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
