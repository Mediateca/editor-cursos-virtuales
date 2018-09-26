import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuerdaComponent } from './recuerda.component';

describe('RecuerdaComponent', () => {
  let component: RecuerdaComponent;
  let fixture: ComponentFixture<RecuerdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuerdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
