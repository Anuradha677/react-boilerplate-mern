// @flow

import path from 'path';
import config from 'config';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import connectMongo from 'connect-mongo';
import session from 'express-session';

import cors from 'server/cors';
import html from 'server/html';
import connectDb from 'server/db';
import appSession, {passportMiddleware} from 'server/session';
import api from './api';


const {
    name,
    port,
    contentBase
}: {
    name: string,
    port: string,
    contentBase: string
} = config;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);
const MongoStore = connectMongo (session);

(async (app) => {

    const mongooseConnection = await connectDb ();

    const sessionMiddleware = session ({
        resave: true,
        saveUninitialized: true,
        secret: 'secret do not tell',
        store: new MongoStore ({mongooseConnection})
    });

    app
        .use (cors)
        .use (compression ())

        .use (sessionMiddleware)
        .use (passportMiddleware)

        .use (bodyParser.urlencoded ({
            extended: true
        }))
        .use (bodyParser.json ())
        .use (express.static (PUBLIC_PATH))

        .use ('/session', appSession)
        .use ('/api', api)
        .all ('*', html)

        .listen (port, () => {
            console.log (`* ${name} express server started on port ${port}`);
            console.log (`* ${name} mongoose connected to ${mongooseConnection.port}/${mongooseConnection.name}`);
        });


}) (express ());

