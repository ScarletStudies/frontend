export * from './course.service';
export * from './category.service';
export * from './user.service';
export * from './alert.service';

import { CourseService } from './course.service';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

export const APP_SERVICES = [
    CourseService,
    CategoryService,
    UserService,
    AlertService
];
