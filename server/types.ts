import { RequestHandler } from "express";
import type {Comment} from "./dao/types";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

export interface Like {
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: number;
}

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>;
export interface CommentDao {
    createComment(comment: Comment): void;
    listComments(postId: string): Comment[] | undefined;
    deleteComment(id: string): void;
}
