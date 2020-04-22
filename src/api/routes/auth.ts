import {BaseHttpController, controller, httpPost } from "inversify-express-utils";
import {inject} from "inversify";
import {AuthService} from "../../services/auth";
import TYPES from "../../inversify-config/types";
import {isResultError} from "../../helpers/is-result-error";
import {IAuthSign} from "../../interfaces/IAuth";
import {IUserInputSignIn, IUserInputSignUp} from "../../interfaces/IUser";

@controller('/auth')
export class SignInController extends BaseHttpController {

    @inject(TYPES.AuthService) _authService: AuthService;

    @httpPost('/signin')
    public async signIn(): Promise<any> {
        const credentials: IUserInputSignIn = this.httpContext.request.body;
        const statusCode = 201;
        const result = await this._authService.signIn(credentials.email, credentials.password);
        if (isResultError<IAuthSign>(result)) {
            return this.json({error: result.error}, 400)
        } else {
            const {token, user} = result;
            return this.json({user, token}, statusCode);
        }
    }

    @httpPost('/signup')
    public async signUp(): Promise<any> {
        const credentials: IUserInputSignUp = this.httpContext.request.body;
        const statusCode = 201;
        const result = await this._authService.signUp(credentials);
        if (isResultError<IAuthSign>(result)) {
            return this.json(result.error, 400)
        } else {
            const {user, token} = result;
            return this.json({user, token}, statusCode);
        }
    }
}