import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { WarehousePageComponent } from './warehouse-page.component';

const warehousePageRoutes: Routes = [{ path: '', component: WarehousePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(warehousePageRoutes), SharedModule],
  declarations: [WarehousePageComponent],
})
export class WarehousePageModule {}
