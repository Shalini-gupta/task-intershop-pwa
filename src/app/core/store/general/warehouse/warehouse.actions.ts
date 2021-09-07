import { createAction } from '@ngrx/store';

import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';
import { httpError, payload } from 'ish-core/utils/ngrx-creators';

export const loadWarehouse = createAction('[Warehouse] Load Warehouse');

export const loadWarehouseFail = createAction('[Warehouse API] Load Warehouse Fail', httpError());

export const loadWarehouseSuccess = createAction(
  '[Warehouse API] Load Warehouse Success',
  payload<{ warehouses: Warehouse[] }>()
);
