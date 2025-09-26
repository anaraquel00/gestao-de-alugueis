import { TestBed } from '@angular/core/testing';

import { Imovel } from './imovel';

describe('Imovel', () => {
  let service: Imovel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imovel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
