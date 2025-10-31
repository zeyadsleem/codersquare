import type { CommentDao } from "./dao/CommentDao";
import type { LikeDao } from "./dao/LikeDao";
import { InMemoryDatastore } from "./memorydb/index";
import type { PostDao } from "./dao/PostDao";
import type { UserDao } from "./dao/UserDao";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export const db = new InMemoryDatastore();
