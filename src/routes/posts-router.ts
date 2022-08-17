import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {isBloggerMiddleware} from "../middlewares/is-bloger-middleware";

export const postsRouter = Router({});

const postTitleValidation = body('title')
    .trim()
    .isLength({max: 30})
    .withMessage("maximum 30 characters")
    .notEmpty()
    .withMessage("must not be empty");

const postDescriptionValidation = body('shortDescription')
    .isLength({max: 100})
    .withMessage("maximum 100 characters")
    .notEmpty()
    .withMessage("must not be empty");

const postContentValidation = body('content')
    .trim()
    .isLength({max: 1000})
    .withMessage("maximum 1000 characters")
    .notEmpty()
    .withMessage("must not be empty");

const postBloggerIdValidation = body('bloggerId')
    .isNumeric()
    .withMessage("field must be a number")
    .notEmpty()
    .withMessage("must not be empty");


postsRouter.get('/', (req: Request, res: Response) => {
    res.send(postsRepository.findAllPosts());
});
postsRouter.get('/:id', (req: Request, res: Response) => {

    const [blogger] = postsRepository.findPostById(+req.params.id);

    if(blogger) {
        res.send(blogger);
        return;
    }

    res.send(404);
});

postsRouter.delete('/', (req: Request, res: Response) => {
    res.send(404);
});
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(+req.params.id)
    if(isDeleted) {
        res.send(204);
        return;
    }

    res.send(404);
});

postsRouter.post('/',
    postTitleValidation,
    postBloggerIdValidation,
    postContentValidation,
    postDescriptionValidation,
    inputValidationMiddleware,
    isBloggerMiddleware,
    (req: Request, res: Response) => {

    const newPostId = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId, req.body.bloggerName);

    if(!newPostId) {
        res.send(400);
        return
    }
    const [testNewPost] = postsRepository.findPostById(newPostId);
    if(testNewPost) {
        res.status(201).send(testNewPost);
        return;
    }

    res.send(400);
});

postsRouter.put('/', (req: Request, res: Response) => {
        res.send(404);
})
postsRouter.put('/:id',
    postTitleValidation,
    postBloggerIdValidation,
    postContentValidation,
    postDescriptionValidation,
    inputValidationMiddleware,
    isBloggerMiddleware,
    (req: Request, res: Response) => {

    const isUpdated = postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId, req.body.bloggerName);

    if(isUpdated) {
        res.send(204);
        return;
    }

    res.send(404);
});
