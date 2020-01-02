import { Router } from 'express';
import userRouter from "./users.router";

const router = Router();

router.use('/users', userRouter);
router.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    })
});

export default router;
