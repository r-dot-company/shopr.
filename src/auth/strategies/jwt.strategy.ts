import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "../auth.service"
import { JWTPayload } from "../jwt-payload.interface"

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET")
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
