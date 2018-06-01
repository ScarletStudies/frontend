import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CalendarModule } from 'angular-calendar';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { SemesterOverviewComponent } from './semester-overview/semester-overview.component';
import { ManageCoursesScheduleComponent } from './manage-courses/manage-courses-schedule/manage-courses-schedule.component';
import { ManageCoursesAddComponent } from './manage-courses/manage-courses-add/manage-courses-add.component';
import { CourseComponent } from './course/course.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';
import { PostComponent } from './post/post.component';
import { CommentListItemComponent } from './post/comment-list-item/comment-list-item.component';
import { CheerImageComponent } from './post-list/cheer-image/cheer-image.component';
import { NewPostModalComponent } from './course/new-post-modal/new-post-modal.component';
import { SemesterCoursesComponent } from './semester-courses/semester-courses.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PostCalendarComponent } from './post-calendar/post-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        QuillModule,
        CalendarModule.forRoot()
    ],
    declarations: [
        ManageCoursesComponent,
        SemesterOverviewComponent,
        ManageCoursesScheduleComponent,
        ManageCoursesAddComponent,
        CourseComponent,
        PostListComponent,
        PostListItemComponent,
        PostComponent,
        CheerImageComponent,
        CommentListItemComponent,
        NewPostModalComponent,
        SemesterCoursesComponent,
        UserSettingsComponent,
        PostCalendarComponent,
    ],
    entryComponents: [
        NewPostModalComponent
    ]
})
export class DashboardModule { }
