import { ICategory, ICourse, IComment, ISemester, IUser } from '.';

export interface IPost {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly timestamp: string;
    readonly is_archived: boolean;
    readonly cheers: IUser[];

    readonly category: ICategory;
    readonly course: ICourse;
    readonly semester: ISemester;
    readonly author: IUser;
    readonly comments: IComment[];
}

export interface IPostQueryParameters {
    courses?: ICourse[];
    categories?: ICategory[];
    query?: string;
    limit?: number;
    offset?: number;
}
