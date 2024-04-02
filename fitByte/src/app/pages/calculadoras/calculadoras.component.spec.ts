import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadorasPage } from './calculadoras.component';

describe('CalculadorasPage', () => {
  let component: CalculadorasPage;
  let fixture: ComponentFixture<CalculadorasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadorasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadorasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
