import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardHomeComponent,
        children: [
            {
                path: '',
                component: DashboardOverviewComponent
            },
            {
                path: 'manage',
                component: ManageCoursesComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
