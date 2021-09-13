import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { Observable, of, throwError } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';
import { WarehouseService } from 'ish-core/services/warehouse/warehouse.service';
import { makeHttpError } from 'ish-core/utils/dev/api-service-utils';

import { loadWarehouse, loadWarehouseFail, loadWarehouseSuccess } from './warehouse.actions';
import { WarehouseEffects } from './warehouse.effects';

describe('Warehouse Effects', () => {
  let actions$: Observable<Action>;
  let effects: WarehouseEffects;
  let warehouseServiceMock: WarehouseService;

  const warehouses = [
    { country: 'Germany', city: 'Jena', zipcode: '4957' },
    { country: 'Australia', city: 'Melbourne', zipcode: '1515' },
  ] as Warehouse[];

  beforeEach(() => {
    warehouseServiceMock = mock(WarehouseService);
    when(warehouseServiceMock.getWarehouse()).thenReturn(of(warehouses));
    TestBed.configureTestingModule({
      providers: [
        WarehouseEffects,
        provideMockActions(() => actions$),
        { provide: WarehouseService, useFactory: () => instance(warehouseServiceMock) },
      ],
    });
    effects = TestBed.inject(WarehouseEffects);
  });

  describe('loadWarehouse$', () => {
    it('should not dispatch actions when encountering loadWarehouse', () => {
      const action = { type: loadWarehouse.type } as Action;
      const expected = loadWarehouseSuccess({ warehouses });

      actions$ = hot('-a-------', { a: action });

      expect(effects.loadWarehouse$).toBeObservable(cold('-b-------', { b: expected }));
    });

    it('should dispatch a LoadCountriesFail action if a load error occurs', () => {
      when(warehouseServiceMock.getWarehouse()).thenReturn(throwError(makeHttpError({ message: 'error' })));

      const action = { type: loadWarehouse.type } as Action;
      const expected = loadWarehouseFail({ error: makeHttpError({ message: 'error' }) });

      actions$ = hot('-a', { a: action });

      expect(effects.loadWarehouse$).toBeObservable(cold('-b', { b: expected }));
    });
  });
});
