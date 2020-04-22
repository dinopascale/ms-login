import {IResultError} from "../interfaces/IHelpers";

export function isResultError<K>(result: K | IResultError): result is IResultError {
    return result['error'] !== undefined;
}