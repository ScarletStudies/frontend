import { UserEffects } from './user.effects';
import { ScheduleEffects } from './schedule.effects';
import { RouterEffects } from './router.effects';
import { ErrorEffects } from './error.effects';
import { PostEffects } from './post.effects';

export const APP_EFFECTS = [
    UserEffects,
    ScheduleEffects,
    RouterEffects,
    ErrorEffects,
    PostEffects
];
