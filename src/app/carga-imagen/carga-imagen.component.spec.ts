import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaImagenComponent } from './carga-imagen.component';

describe('CargaImagenComponent', () => {
  let component: CargaImagenComponent;
  let fixture: ComponentFixture<CargaImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
