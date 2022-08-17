import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const bloggersRouter = Router({});

const bloggerNameValidation = body('name')
    .trim()
    .isLength({max: 15})
    .withMessage("maximum 15 characters")
    .notEmpty()
    .withMessage("must not be empty");

const youtubeUrlValidation = body('youtubeUrl')
    .isLength({max: 100})
    .withMessage("maximum 100 characters")
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage("link is incorrect")


bloggersRouter.get('/', (req: Request, res: Response) => {
    res.send(bloggersRepository.findAllBloggers());
});
bloggersRouter.get('/:id', (req: Request, res: Response) => {

    const [blogger] = bloggersRepository.findBloggerById(+req.params.id);

    if(blogger) {
        res.send(blogger);
        return;
    }

    res.send(404);
});

bloggersRouter.delete('/', (req: Request, res: Response) => {
    res.send(404);
});
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = bloggersRepository.deleteBlogger(+req.params.id)
    if(isDeleted) {
        res.send(204);
        return;
    }

    res.send(404);
});

bloggersRouter.post('/',
    bloggerNameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newBloggerId = bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl);
    const [testNewBlogger] = bloggersRepository.findBloggerById(newBloggerId);
    if(testNewBlogger) {
        res.status(201).send(testNewBlogger);
        return;
    }

    res.send(400);
});

bloggersRouter.put('/', (req: Request, res: Response) => {
        res.send(404);
})
bloggersRouter.put('/:id',
    bloggerNameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl);
    if(isUpdated) {
        res.send(204);
        return;
    }

    res.send(404);
});