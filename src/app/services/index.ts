export * from './course.service';
export * from './post.service';

import { CourseService } from './course.service';
import { PostService } from './post.service';

export const APP_SERVICES = [
    CourseService,
    PostService
];
