import {provide} from "inversify-binding-decorators";
import TYPES from "../inversify-config/types";

@provide(TYPES.LoggerService)
export class LoggerService {
}