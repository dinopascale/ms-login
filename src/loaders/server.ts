import {Container} from "inversify";
import {interfaces, InversifyExpressServer} from "inversify-express-utils";
import ConfigFunction = interfaces.ConfigFunction;
import {buildProviderModule} from "inversify-binding-decorators";
import TYPES from "../inversify-config/types";
import {Logger, createLogger, format, transports, config} from 'winston';
import {MongoDbClient} from "../services/db";

export class Server {

    private readonly container: Container;
    private server: InversifyExpressServer;

    constructor(
        private readonly port: number,
        private readonly configFn: ConfigFunction,
        private readonly configErrorFn: ConfigFunction,
        private readonly routePrefix: string
    ) {
        this.container = new Container();
    }

    public async init(): Promise<void> {
        await this.bindExternalDep();
        this.container.load(buildProviderModule());
        this.server = new InversifyExpressServer(this.container, null, {rootPath: this.routePrefix})
        this.server.setConfig(this.configFn);
        this.server.setErrorConfig(this.configErrorFn);
        this.server.build().listen(this.port);
    }

    private async bindExternalDep(): Promise<void> {
        // @TODO externalize with constructor class
        this.container.bind<Logger>(TYPES.LoggerService).toConstantValue(createLogger({
            level: 'silly',
            levels: config.npm.levels,
            transports: [
                new transports.Console({
                    // level: 'debug',
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                })
            ]
        }))
        this.container.bind<MongoDbClient>(TYPES.MongoService).toConstantValue(await MongoDbClient.build())
    }

}