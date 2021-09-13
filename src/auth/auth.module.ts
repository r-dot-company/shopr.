import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { CryptoModule } from "src/crypto/crypto.module"
import { UserService } from "src/user/user.service"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JWTStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"

@Module({
    imports: [
        CryptoModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_TTL")
                }
            })
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
