import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePageComponent } from './warehouse-page.component';

describe('Warehouse Page Component', () => {
  let component: WarehousePageComponent;
  let fixture: ComponentFixture<WarehousePageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehousePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousePageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});