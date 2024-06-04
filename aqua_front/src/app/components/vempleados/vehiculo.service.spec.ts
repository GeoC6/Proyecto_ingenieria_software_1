import { TestBed } from '@angular/core/testing';

import { VempleadoService } from './vehiculo.service';

describe('VempleadoService', () => {
  let service: VempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
