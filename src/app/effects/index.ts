import { UserEffects } from './user.effects';
import { ScheduleEffects } from './schedule.effects';
import { RouterEffects } from './router.effects';
import { ErrorEffects } from './error.effects';

export const APP_EFFECTS = [
    UserEffects,
    ScheduleEffects,
    RouterEffects,
    ErrorEffects,
];
