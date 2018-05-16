import { ICategory, ICourse } from '.';

export interface IPost {
    readonly id: string;
    readonly content: string;
    readonly timestamp: string;
    readonly is_archived: boolean;
    readonly category: ICategory;
    readonly course: ICourse;
}
