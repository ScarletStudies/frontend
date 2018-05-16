export * from './course.service';
export * from './post.service';
export * from './category.service';

import { CourseService } from './course.service';
import { PostService } from './post.service';
import { CategoryService } from './category.service';

export const APP_SERVICES = [
    CourseService,
    PostService,
    CategoryService
];
