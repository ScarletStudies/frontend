import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CourseComponent } from './course/course.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: DashboardOverviewComponent
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
                component: CourseComponent
            },
            {
                path: 'post/:id',
                component: ViewPostComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
