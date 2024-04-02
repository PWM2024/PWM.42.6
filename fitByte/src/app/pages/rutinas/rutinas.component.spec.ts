import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasPage } from './rutinas.component';

describe('RutinasPage', () => {
  let component: RutinasPage;
  let fixture: ComponentFixture<RutinasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
