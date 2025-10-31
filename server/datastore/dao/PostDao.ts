import type { Post } from "../../types";

export interface PostDao {
    listPosts(): Post[];
    createPost(post: Post): Promise<void>;
    getPost(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
}
