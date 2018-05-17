import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { ManageCoursesScheduleComponent } from './manage-courses/manage-courses-schedule/manage-courses-schedule.component';
import { ManageCoursesAddComponent } from './manage-courses/manage-courses-add/manage-courses-add.component';
import { CourseComponent } from './course/course.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';
import { ViewPostModalComponent } from './post-list/view-post-modal/view-post-modal.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
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
        ViewPostModalComponent
    ],
    entryComponents: [
        ViewPostModalComponent
    ]
})
export class DashboardModule { }
