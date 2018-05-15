import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesScheduleComponent } from './manage-courses-schedule.component';

describe('ManageCoursesScheduleComponent', () => {
  let component: ManageCoursesScheduleComponent;
  let fixture: ComponentFixture<ManageCoursesScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCoursesScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoursesScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
