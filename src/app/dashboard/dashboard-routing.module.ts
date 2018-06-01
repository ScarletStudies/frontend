import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { SemesterOverviewComponent } from './semester-overview/semester-overview.component';
import { CourseComponent } from './course/course.component';
import { PostComponent } from './post/post.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCalendarComponent } from './post-calendar/post-calendar.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'overview',
                component: SemesterOverviewComponent
            },
            {
                path: 'manage',
                component: ManageCoursesComponent
            },
            {
                path: 'user-settings',
                component: UserSettingsComponent
            },
            {
                path: 'course/:id',
                component: CourseComponent,
            },
            {
                path: 'post/:id',
                component: PostComponent
            },
            {
                path: '**',
                redirectTo: 'overview'
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
