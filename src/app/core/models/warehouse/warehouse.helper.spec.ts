import { WarehouseHelper } from './warehouse.helper';
import { Warehouse } from './warehouse.model';

describe('Warehouse Helper', () => {
  describe('equal', () => {
    it.each([
      [false, undefined, undefined],
      [false, { country: 'test' } as Warehouse, undefined],
      [false, undefined, { country: 'test' } as Warehouse],
      [false, { country: 'test' } as Warehouse, { country: 'other' } as Warehouse],
      [true, { country: 'test' } as Warehouse, { country: 'test' } as Warehouse],
    ])(`should return %s when comparing %j and %j`, (expected, o1, o2) => {
      expect(WarehouseHelper.equal(o1, o2)).toEqual(expected);
    });
  });
});
