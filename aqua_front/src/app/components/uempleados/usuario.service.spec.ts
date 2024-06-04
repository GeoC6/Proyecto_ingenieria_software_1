import { TestBed } from '@angular/core/testing';

import { UempleadoService } from './usuario.service';

describe('UempleadoService', () => {
  let service: UempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
