import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WarehouseMapper } from 'ish-core/models/warehouse/warehouse.mapper';
import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';
import { ApiService, unpackEnvelope } from 'ish-core/services/api/api.service';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  constructor(private apiService: ApiService) {}

  getWarehouse(): Observable<Warehouse[]> {
    return this.apiService.get(`warehouse/list`).pipe(
      unpackEnvelope(),
      map(wareHouseData => wareHouseData.map(WarehouseMapper.fromData))
    );
  }
}
