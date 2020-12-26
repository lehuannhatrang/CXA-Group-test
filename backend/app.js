import {IndexConfig} from "./configs";
import AuthenService from "./services/AuthenticationService";
import ApiRoute from "./routes";

const Passport = require("passport");

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var helmet = require('helmet');

var cors = require('cors');

var app = express();

app.use(helmet())

app.use(express.json({limit: '800mb'}));

app.use(express.urlencoded({ extended: false, limit: '800mb' }));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', IndexConfig.ACCESS_CONTROL_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors({ credentials: true, origin: true, optionsSuccessStatus: 200 }));

app.use('/api/', ApiRoute);

Passport.serializeUser(AuthenService.serializeUser);

Passport.deserializeUser(AuthenService.deserializeUser);


module.exports = app;
