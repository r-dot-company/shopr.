import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AdminModule } from "src/admin/admin.module"
import { CryptoModule } from "src/crypto/crypto.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { jwtConstants } from "./constants"
import { JWTStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"

@Module({
    imports: [
        CryptoModule,
        AdminModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: jwtConstants.ttl
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JWTStrategy]
})
export class AuthModule {}
