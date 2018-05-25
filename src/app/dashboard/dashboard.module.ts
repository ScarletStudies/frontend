import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { QuillModule } from 'ngx-quill';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { ManageCoursesScheduleComponent } from './manage-courses/manage-courses-schedule/manage-courses-schedule.component';
import { ManageCoursesAddComponent } from './manage-courses/manage-courses-add/manage-courses-add.component';
import { CourseComponent } from './course/course.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';
import { ViewPostModalComponent } from './post-list/view-post-modal/view-post-modal.component';
import { CheerImageComponent } from './post-list/cheer-image/cheer-image.component';
import { CommentListItemComponent } from './post-list/view-post-modal/comment-list-item/comment-list-item.component';
import { NewPostModalComponent } from './course/new-post-modal/new-post-modal.component';
import { SemesterCoursesComponent } from './semester-courses/semester-courses.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        QuillModule
    ],
    declarations: [
        ManageCoursesComponent,
        DashboardComponent,
        DashboardOverviewComponent,
        ManageCoursesScheduleComponent,
        ManageCoursesAddComponent,
        CourseComponent,
        PostListComponent,
        PostListItemComponent,
        ViewPostModalComponent,
        CheerImageComponent,
        CommentListItemComponent,
        NewPostModalComponent,
        SemesterCoursesComponent,
        UserSettingsComponent
    ],
    entryComponents: [
        ViewPostModalComponent,
        NewPostModalComponent
    ]
})
export class DashboardModule { }
