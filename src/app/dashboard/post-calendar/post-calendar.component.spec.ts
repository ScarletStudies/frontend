import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCalendarComponent } from './post-calendar.component';

describe('PostCalendarComponent', () => {
  let component: PostCalendarComponent;
  let fixture: ComponentFixture<PostCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
