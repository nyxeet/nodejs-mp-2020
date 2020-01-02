import { Router } from 'express';
import userRouter from "./users.router";

const router = Router();

router.use('/users', userRouter);

router.use('/', (req, res) => {
    res.send('Welcome to my app!')
});

export default router;
