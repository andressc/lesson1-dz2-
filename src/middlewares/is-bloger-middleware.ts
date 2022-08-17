import {Request, Response} from "express";
import {NextFunction} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const isBloggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isBlogger = bloggersRepository.isBloggerById(req.body.bloggerId)

    if (!isBlogger) {
        res.status(400).json({ errorsMessages: [{ message: "blogger with this id does not exist", field: "bloggerId" }] });
    } else {
        req.body.bloggerId = isBlogger.id;
        req.body.bloggerName = isBlogger.name;
        next();
    }
}