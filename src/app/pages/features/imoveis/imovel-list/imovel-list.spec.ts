import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovelList } from './imovel-list';

describe('ImovelList', () => {
  let component: ImovelList;
  let fixture: ComponentFixture<ImovelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImovelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImovelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
