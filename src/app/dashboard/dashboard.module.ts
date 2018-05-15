import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ManageCoursesComponent, DashboardHomeComponent, DashboardOverviewComponent]
})
export class DashboardModule { }
