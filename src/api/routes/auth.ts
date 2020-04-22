import {BaseHttpController, controller, httpPost } from "inversify-express-utils";
import {inject} from "inversify";
import {AuthService} from "../../services/auth";
import TYPES from "../../inversify-config/types";
import {isResultError} from "../../helpers/is-result-error";
import {IAuthSignUp} from "../../interfaces/IAuth";
import {IUserInput} from "../../interfaces/IUser";

@controller('/auth')
export class SignInController extends BaseHttpController {

    @inject(TYPES.AuthService) _authService: AuthService;

    @httpPost('/signin')
    public async signIn(): Promise<any> {
        const statusCode = 201;
        const content = await this._authService.signIn();
        return this.json(content, statusCode);
    }

    @httpPost('/signup')
    public async signUp(): Promise<any> {
        const credentials: IUserInput = this.httpContext.request.body;
        const statusCode = 201;
        const result = await this._authService.signUp(credentials);
        if (isResultError<IAuthSignUp>(result)) {
            return this.json(result.error, 400)
        } else {
            const {user, token} = result;
            return this.json({user, token}, statusCode);
        }
    }
}