import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';

import { loadWarehouse } from './warehouse.actions';
import { WarehouseEffects } from './warehouse.effects';

describe('Warehouse Effects', () => {
  let actions$: Observable<Action>;
  let effects: WarehouseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(WarehouseEffects);
  });

  describe('loadWarehouse$', () => {
    it('should not dispatch actions when encountering loadWarehouse', () => {
      const action = loadWarehouse();
      actions$ = hot('-a-a-a', { a: action });
      const expected$ = cold('------');

      expect(effects.loadWarehouse$).toBeObservable(expected$);
    });
  });
});
