import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Admin } from "@prisma/client"
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
        const admin = await this.adminService.findOne({ email })
        if (!admin) {
            return null
        }
        const isValidPassword = await this.cryptoService.compare(
            password,
            admin.password
        )
        delete admin.password
        return !isValidPassword ? null : admin
    }

    async generateToken(admin: Admin) {
        const payload: JWTPayload = {
            sub: admin.id
        }
        const token = await this.jwtService.signAsync(payload)
        return { access_token: token }
    }

    async validateJWTPayload(payload: JWTPayload) {
        const id = payload.sub
        const admin = await this.adminService.findOne({ id })
        delete admin.password
        return admin
    }
}
