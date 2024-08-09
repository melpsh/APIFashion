import { Router, Request, Response, NextFunction } from "express";
import { validationMiddlware, validationUserMiddlware } from "../middlewares";
import { createNewUser, deleteOneUser,  getOneUser, getUser, updateOneUser } from "../users/usersServices";
import usersCreateDto from './dtos/usersCreateDto'
import UserUPdateDto from "./dtos/usersUpdate";
import ServerError from "../helper/serverError";
import { IRequestWithUser } from "../types";
const router = Router();
// get user for dashboard
router.get("/", validationUserMiddlware, async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
        const userID = req.userID
        const users = await getUser(userID)
        res.json({ users })
    } catch (error) {
        next(error)
    }

});

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ===========
router.get("/:id", async (req: IRequestWithUser, res: Response) => {
    try {
        const userID = req.params.id
        const user = await getOneUser(userID)
        res.json({ user })
    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ msg: 'user not found.' });
        } else {
            res.status(500).json({ msg: 'An unexpected error occurred. Please try again later.' });
        }
    }

});

router.post("/", validationMiddlware(usersCreateDto), async (req: Request, res: Response) => {
    try {
        const newUser = await createNewUser(req.body)
        const resUserData = {
            fullName: newUser.fullName,
            email: newUser.email,
            create_at: newUser.create_at,
        }
        res.status(201).json({ resUserData })
    } catch (error) {
        if (error.status === 409) {
            res.status(409).json({ msg: 'This email already exists. Please choose a different one.' });
        } else {
            console.error(error);
            res.status(500).json({ msg: 'An unexpected error occurred. Please try again later.' });
        }
    }

});

router.put("/", validationUserMiddlware, validationMiddlware(UserUPdateDto), async (req: IRequestWithUser, res: Response) => {

    try {
        const userID = req.userID
        const data: UserUPdateDto = req.body

        const updatedUser = await updateOneUser(userID, data)
        res.json({ updatedUser })

    } catch (error) {
        if (error.status === 404) {
            res.status(404).json('update was not success ')
        }
        throw new ServerError(500, 'internal server error')
    }
});

router.delete("/", validationUserMiddlware, async (req: IRequestWithUser, res: Response) => {
    try {
        const userID = req.userID
        const deletedItem = await deleteOneUser(userID)
        res.status(200).json({ msg: 'item deleted', deletedItem })
    } catch (error) {
        if (error.message === 'item does not Exist') {
            res.status(404).json('item not exist')

        } else {
            res.status(500).json('server error')

        }

    }
});

export default router;