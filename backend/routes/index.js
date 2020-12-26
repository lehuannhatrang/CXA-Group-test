import express from 'express';
import jwt from 'express-jwt';
import {CommonConfig} from "../configs";
import {Error} from "../errors/Error";
import HttpUtil from "../utils/HttpUtil";
import MovieRoute from "./movie";

const IndexRoute = express.Router({strict: true});

IndexRoute.use(jwt({
    secret: CommonConfig.SECRET,
    getToken: (req) => (req.cookies['user-token']),
}).unless({ path: [/^\/api\/movie.*/]}));

IndexRoute.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        let errorCode = Error.UN_AUTHORIZATION;
        if (err.inner && err.inner.name === 'TokenExpiredError') {
            errorCode = Error.SESSION_EXPIRED
        }
        HttpUtil.makeErrorResponse(res, errorCode);
    } else {
        next();
    }
});

//api external
IndexRoute.use('/movie', MovieRoute)
// api authen

export default IndexRoute;