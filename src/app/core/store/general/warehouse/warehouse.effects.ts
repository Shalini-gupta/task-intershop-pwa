import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';

import { WarehouseService } from 'ish-core/services/warehouse/warehouse.service';
import { mapErrorToAction } from 'ish-core/utils/operators';

import { loadWarehouse, loadWarehouseFail, loadWarehouseSuccess } from './warehouse.actions';

@Injectable()
export class WarehouseEffects {
  constructor(private actions$: Actions, private warehouseService: WarehouseService) {}

  loadWarehouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWarehouse),
      concatMap(() =>
        this.warehouseService.getWarehouse().pipe(
          map(warehouses => loadWarehouseSuccess({ warehouses })),
          mapErrorToAction(loadWarehouseFail)
        )
      )
    )
  );
}
