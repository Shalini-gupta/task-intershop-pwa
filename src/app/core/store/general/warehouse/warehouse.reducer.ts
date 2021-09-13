import { createReducer, on } from '@ngrx/store';

import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';
import { setLoadingOn, unsetLoadingOn } from 'ish-core/utils/ngrx-creators';

import { loadWarehouse, loadWarehouseFail, loadWarehouseSuccess } from './warehouse.actions';

export interface WarehouseState {
  loading: boolean;
  warehouses: Warehouse[];
}

const initialState: WarehouseState = {
  loading: false,
  warehouses: [],
};

export const warehouseReducer = createReducer(
  initialState,
  setLoadingOn(loadWarehouse),
  unsetLoadingOn(loadWarehouseFail, loadWarehouseSuccess),
  on(loadWarehouseFail, state => ({
    ...state,
    warehouses: [],
  })),
  on(loadWarehouseSuccess, (state, action) => {
    const { warehouses } = action.payload;
    return {
      ...state,
      warehouses,
      success: true,
    };
  })
);
