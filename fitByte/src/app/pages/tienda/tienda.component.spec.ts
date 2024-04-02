import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaPage } from './tienda.component';

describe('TiendaPage', () => {
  let component: TiendaPage;
  let fixture: ComponentFixture<TiendaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
