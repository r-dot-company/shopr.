import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

@Injectable()
export class CryptoService {
    private static readonly SALT_ROUNDS = 5

    hash(input: string) {
       return bcrypt.hash(input, CryptoService.SALT_ROUNDS)
    }

    compare(data: string, encrypted: string) {
        return bcrypt.compare(data, encrypted)
    }
}
