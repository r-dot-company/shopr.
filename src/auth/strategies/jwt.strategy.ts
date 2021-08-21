import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "../auth.service"
import { jwtConstants } from "../constants"
import { JWTPayload } from "../jwt-payload.interface"

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: JWTPayload) {
        const user = await this.authService.validateJWTPayload(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
