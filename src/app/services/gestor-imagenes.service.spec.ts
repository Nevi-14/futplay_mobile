import { TestBed } from '@angular/core/testing';

import { GestorImagenesService } from './gestor-imagenes.service';

describe('GestorImagenesService', () => {
  let service: GestorImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
