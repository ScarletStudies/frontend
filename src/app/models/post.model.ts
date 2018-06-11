import { ICategory, ICourse, IComment, ISemester, IUser } from '.';

export interface IPost {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly timestamp: string;
    readonly is_archived: boolean;
    readonly due_date: string;
    readonly cheers: IUser[];

    readonly category: ICategory;
    readonly course: ICourse;
    readonly semester: ISemester;
    readonly author: IUser;
    readonly comments: IComment[];
}

export interface IPostQueryParameters {
    courses?: ICourse[];
    categories?: Partial<ICategory>[];
    query?: string;
    page?: number;
    sort?: 'time' | 'activity';
    start_date?: string;
    end_date?: string;
}
