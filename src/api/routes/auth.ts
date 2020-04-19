import {BaseHttpController, controller, httpPost } from "inversify-express-utils";
import {inject} from "inversify";
import {AuthService} from "../../services/auth";
import TYPES from "../../inversify-config/types";

@controller('/auth')
export class SignInController extends BaseHttpController {

    @inject(TYPES.AuthService) _authService: AuthService;

    @httpPost('/signin')
    private async signIn(): Promise<any> {
        const statusCode = 201;
        const content = await this._authService.signIn();
        return this.json(content, statusCode);
    }

    @httpPost('/signup')
    private async signUp(): Promise<any> {
        const statusCode = 201;
        const content = await this._authService.signUp();
        return this.json(content, statusCode);
    }
}