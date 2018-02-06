import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersComponent } from './producers.component';

describe('ProducersComponent', () => {
  let component: ProducersComponent;
  let fixture: ComponentFixture<ProducersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
