import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietasPage } from './dietas.component';

describe('DietasPage', () => {
  let component: DietasPage;
  let fixture: ComponentFixture<DietasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
