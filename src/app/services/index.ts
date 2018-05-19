export * from './course.service';
export * from './category.service';

import { CourseService } from './course.service';
import { CategoryService } from './category.service';

export const APP_SERVICES = [
    CourseService,
    CategoryService
];
