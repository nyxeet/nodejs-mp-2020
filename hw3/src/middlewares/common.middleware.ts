import * as jwt from 'jsonwebtoken';
import loggers from "../loggers/bunyan.logger";

const checkAuth = (req, res, next) => {
    const token = req.headers['jwt-token'];
    if (!token) res.json({status: 401, message: 'You should login!'});
    try {
        req.info = jwt.verify(token, process.env.SECRET_JWT);
        next();
    } catch (e) {
        res.json({status: 403, message: e.message});
    }
};


const middlewares = {
    checkAuth
};

export default middlewares;
