import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoursesAddComponent } from './manage-courses-add.component';

describe('ManageCoursesAddComponent', () => {
  let component: ManageCoursesAddComponent;
  let fixture: ComponentFixture<ManageCoursesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCoursesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
