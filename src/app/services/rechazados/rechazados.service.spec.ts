import { TestBed } from '@angular/core/testing';

import { RechazadosService } from './rechazados.service';

describe('RechazadosService', () => {
  let service: RechazadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechazadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
