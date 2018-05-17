import { ICategory, ICourse, IComment, ISemester, IUser } from '.';

export interface IPost {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly timestamp: string;
    readonly is_archived: boolean;
    readonly cheers_count: number;
    readonly comments_count: number;

    readonly category: ICategory;
    readonly course: ICourse;
    readonly semester: ISemester;
    readonly author: IUser;
}

export interface IPostWithComments extends IPost {
    readonly comments?: IComment[]; /* comments not always returned */
}
