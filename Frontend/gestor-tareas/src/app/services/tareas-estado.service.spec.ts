import { TestBed } from '@angular/core/testing';

import { TareasEstadoService } from './tareas-estado.service';

describe('TareasEstadoService', () => {
  let service: TareasEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
