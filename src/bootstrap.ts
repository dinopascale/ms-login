import 'reflect-metadata';
// we need to import all controllers and services
import './api'
import './services'

import {Server} from './loaders/server';
import {globalServerConfig} from "./loaders/global-server-config";

const server = new Server(3000, globalServerConfig, '/api' )
server.init();

// let container = new Container();
// container.load(buildProviderModule())
//
// let bootstrap = new InversifyExpressServer(container, null, { rootPath: '/api'});
//
// bootstrap.setConfig((app) => {
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }));
//     app.use(bodyParser.json())
// })
//
// let serverInstance = bootstrap.build();
// serverInstance.listen(3000);

console.log('Server Started on port 3000')