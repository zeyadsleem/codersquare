import express, { type RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";

const app = express();

app.use(express.json());
const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, "- body", req.body);
  next();
};
app.use(requestLoggerMiddleware);

app.get("/posts", listPostsHandler);
app.post("/posts", createPostHandler);

app.listen(3000, () => console.log("server is running"));
