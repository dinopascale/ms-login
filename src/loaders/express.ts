import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import routes from '../api';
import errorsMw from '../api/middlewares';

export default async ({app}: { app: express.Application }) => {

    app.enable('trust proxy');
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}))

    app.use('/api', routes())
    app.use(errorsMw.notFound);
    app.use(errorsMw.general);
}