import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoPlanoComponent } from './texto-plano.component';

describe('TextoPlanoComponent', () => {
  let component: TextoPlanoComponent;
  let fixture: ComponentFixture<TextoPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
