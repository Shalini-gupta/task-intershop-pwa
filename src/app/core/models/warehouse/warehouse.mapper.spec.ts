import { TestBed } from '@angular/core/testing';

import { WarehouseData } from './warehouse.interface';
import { WarehouseMapper } from './warehouse.mapper';

describe('Warehouse Mapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.inject(WarehouseMapper);
  });

  describe('fromData', () => {
    it('should throw when input is falsy', () => {
      expect(() => WarehouseMapper.fromData(undefined)).toThrow();
    });

    it('should map incoming data to model data', () => {
      const data: WarehouseData = {
        country: 'test',
        city: 'test',
        zipcode: 'test',
      };
      const mapped = WarehouseMapper.fromData(data);
      expect(mapped).toHaveProperty('id', 'test');
      expect(mapped).not.toHaveProperty('otherField');
    });
  });
});
