import express, { ErrorRequestHandler, type RequestHandler } from "express";
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

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Uncaught exeption:", err);
    return res.status(500).send("Oop, an unexpected error occured, pleas try again");
};
app.use(errHandler);

app.listen(3000, () => console.log("server is running"));
