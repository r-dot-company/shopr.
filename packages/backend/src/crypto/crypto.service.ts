import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"

@Injectable()
export class CryptoService {
    constructor(private configService: ConfigService) {}

    hash(input: string) {
        const saltRounds = this.configService.get<number>("SALT_ROUNDS")
        return bcrypt.hash(input, saltRounds)
    }

    compare(data: string, encrypted: string) {
        return bcrypt.compare(data, encrypted)
    }
}
