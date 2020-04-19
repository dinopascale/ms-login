import 'reflect-metadata';
// we need to import all controllers and services
import './api'
import './services'

import {Server} from './loaders/server';
import {globalErrorConfig, globalServerConfig} from "./loaders/global-server-config";

const server = new Server(3000, globalServerConfig, globalErrorConfig,'/api' )
server.init();

console.log('Server Started on port 3000')