import { createSelector } from '@ngrx/store';

import { getGeneralState } from 'ish-core/store/general/general-store';

const getWarehouseState = createSelector(getGeneralState, state => state.warehouse);

export const getWarehouseLoading = createSelector(getWarehouseState, state => state.loading);

export const getAllWarehouse = createSelector(getWarehouseState, state => state.warehouses);
