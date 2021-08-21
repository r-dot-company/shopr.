import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { CryptoService } from "src/crypto/crypto.service"
import { UserService } from "src/user/user.service"
import { JWTPayload } from "./jwt-payload.interface"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if (!user) {
            return null
        }
        const isValidPassword = await this.cryptoService.compare(
            password,
            user.password
        )
        return !isValidPassword ? null : user
    }

    async generateToken(user: User) {
        const payload: JWTPayload = {
            sub: user.id
        }
        const token = await this.jwtService.signAsync(payload)
        return { access_token: token }
    }

    async validateJWTPayload(payload: JWTPayload) {
        const id = payload.sub
        return await this.userService.findById(id)
    }
}
