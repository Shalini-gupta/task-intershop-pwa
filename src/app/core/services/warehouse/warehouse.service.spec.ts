import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { ApiService } from 'ish-core/services/api/api.service';

import { WarehouseService } from './warehouse.service';

describe('Warehouse Service', () => {
  let apiServiceMock: ApiService;
  let warehouseService: WarehouseService;

  beforeEach(() => {
    apiServiceMock = mock(ApiService);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useFactory: () => instance(apiServiceMock) }],
    });
    warehouseService = TestBed.inject(WarehouseService);
  });

  it('should be created', () => {
    expect(warehouseService).toBeTruthy();
  });
});
