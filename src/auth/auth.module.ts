import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { CryptoModule } from "src/crypto/crypto.module"
import { UserService } from "src/user/user.service"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { jwtConstants } from "./constants"
import { JWTStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"

@Module({
    imports: [
        CryptoModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: jwtConstants.ttl
            }
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        LocalStrategy,
        JWTStrategy
    ]
})
export class AuthModule {}
