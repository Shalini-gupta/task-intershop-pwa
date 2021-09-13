import { WarehouseData } from './warehouse.interface';
import { Warehouse } from './warehouse.model';

export class WarehouseMapper {
  static fromData(data: WarehouseData): Warehouse {
    if (data) {
      return {
        country: data.country,
        city: data.city,
        zipcode: data.zipcode,
      };
    } else {
      throw new Error(`warehouseData is required`);
    }
  }
}
