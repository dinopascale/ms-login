import {Container} from "inversify";
import {interfaces, InversifyExpressServer} from "inversify-express-utils";
import ConfigFunction = interfaces.ConfigFunction;
import {buildProviderModule} from "inversify-binding-decorators";

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

    public init(): void {
        this.container.load(buildProviderModule());
        this.server = new InversifyExpressServer(this.container, null, {rootPath: this.routePrefix})
        this.server.setConfig(this.configFn);
        this.server.setErrorConfig(this.configErrorFn);
        this.server.build().listen(this.port);
    }

}