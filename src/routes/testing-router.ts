import {Request, Response, Router} from "express";
import {authorizationValidationMiddleware} from "../middlewares/authorization-validation-middleware";
import {testingRepository} from "../repositories/testing-repository";

export const testingRouter = Router({});

testingRouter.delete('/all-data',
    //authorizationValidationMiddleware,
    async (req: Request, res: Response) => {
    const isDeleted: boolean = await testingRepository.deleteAll()
    if(isDeleted) {
        res.send(204);
        return;
    }

    res.send(404);
});
