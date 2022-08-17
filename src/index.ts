import express from 'express';
import bodyParser from 'body-parser';
import {inputValidationMiddleware} from "./middlewares/input-validation-middleware";
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(inputValidationMiddleware)
app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});