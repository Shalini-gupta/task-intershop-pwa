import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { getAllWarehouse, loadWarehouse } from 'ish-core/store/general/warehouse';

@Injectable({ providedIn: 'root' })
export class WarehouseFacade {
  constructor(private store: Store) {}

  getWarehouse() {
    this.store.dispatch(loadWarehouse());
    return this.store.pipe(select(getAllWarehouse));
  }
}
