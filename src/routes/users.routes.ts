import { Router, Request, Response } from "express";
import * as userController from '../controllers/user.controller';
import { isAdmin, validateToken } from "../middlewares/authentication";

const router: Router = Router();

router.get('/:userId', validateToken, userController.getUserById);
router.put('/:userId', [validateToken, isAdmin], userController.updateUserById);
router.delete('/:userId', [validateToken, isAdmin], userController.deleteUserById);

router.put('/:userId/photo', userController.updateAccountPhotoById);

/** Routes to user's addresses **/
router.get('/:userId/addresses', validateToken, (req: Request, res: Response) => {
    // code to get all addresses by userId
});

router.post('/:userId/addresses', validateToken, (req: Request, res: Response) => {
    // code to add a new user's address
});

router.put('/:userId/addresses/:addressId', validateToken, (req: Request, res: Response) => {
    // code to update an address
});

router.delete('/:userId/addresses/:addressId', validateToken, (req: Request, res: Response) => {
    // code to delete an address
})

export default router;