import {interfaces} from "inversify-express-utils";
import ConfigFunction = interfaces.ConfigFunction;
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

export const globalServerConfig: ConfigFunction = (app) => {
    app.use(morgan('tiny'))
    app.use(bodyParser.json())
}