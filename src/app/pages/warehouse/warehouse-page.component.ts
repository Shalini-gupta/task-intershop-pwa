import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WarehouseFacade } from 'ish-core/facades/warehouse.facade';
import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';

@Component({
  selector: 'sh-warehouse',
  templateUrl: './warehouse-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehousePageComponent implements OnInit {
  warehouse$: Observable<Warehouse[]>;
  constructor(private warehouseFacade: WarehouseFacade) {}

  ngOnInit() {
    this.warehouse$ = this.warehouseFacade.getWarehouse();
  }
}
