import express, { type RequestHandler } from "express";
import { db } from "./datastore/index";

const app = express();
app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, "- body", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", (_req, res) => {
  res.send({ posts: db.listPosts() });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.cretePost(post);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("server is running"));
