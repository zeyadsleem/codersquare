import type { Comment } from "../types";

export interface CommentDao {
    createComment(comment: Comment): void;
    listComments(postId: string): Comment[] | undefined;
    deleteComment(id: string): void;
}
