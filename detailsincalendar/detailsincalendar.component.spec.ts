import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsincalendarComponent } from './detailsincalendar.component';

describe('DetailsincalendarComponent', () => {
  let component: DetailsincalendarComponent;
  let fixture: ComponentFixture<DetailsincalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsincalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsincalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
