import type { CommentDao } from "./CommentDao";
import type { LikeDao } from "./LikeDao";
import { InMemoryDatastore } from "./memorydb/index";
import type { PostDao } from "./PostDao";
import type { UserDao } from "./UserDao";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export const db = new InMemoryDatastore();
