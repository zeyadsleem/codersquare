import type { Post } from "../types";

export interface PostDao {
  listPosts(): Post[];
  cretePost(post: Post): void;
  getPost(id: string): Post | undefined;
  deletePost(id: string): void;
}
