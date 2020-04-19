import 'reflect-metadata';
import {Container} from "inversify";
import {InversifyExpressServer} from "inversify-express-utils";
import * as bodyParser from "body-parser";
import './api/routes/auth'

let container = new Container();

let server = new InversifyExpressServer(container, null, { rootPath: '/api'});

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json())
})

let serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server Started on port 3000')