import { WarehouseData } from './warehouse.interface';
import { WarehouseMapper } from './warehouse.mapper';

describe('Warehouse Mapper', () => {
  describe('fromData', () => {
    it('should map incoming data to model data', () => {
      const warehouseData = {
        country: 'Germany',
        city: 'Jena',
        zipcode: '4957',
      } as WarehouseData;
      const warehouse = WarehouseMapper.fromData(warehouseData);

      expect(warehouse.country).toBe(warehouseData.country);
      expect(warehouse.city).toBe(warehouseData.city);
      expect(warehouse.zipcode).toBe(warehouseData.zipcode);
    });
  });
});
