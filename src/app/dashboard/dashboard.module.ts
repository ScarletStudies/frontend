import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [ManageCoursesComponent, DashboardHomeComponent]
})
export class DashboardModule { }
