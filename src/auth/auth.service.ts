import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { AdminService } from "src/admin/admin.service"
import { CryptoService } from "src/crypto/crypto.service"
import { JWTPayload } from "./jwt-payload.interface"

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async validateAdmin(email: string, password: string) {
        const user = await this.adminService.findByEmail(email)
        if (!user?.admin) {
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
        return await this.adminService.findById(id)
    }
}
