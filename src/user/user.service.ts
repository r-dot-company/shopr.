import { Injectable } from "@nestjs/common"
import { CryptoService } from "src/crypto/crypto.service"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cryptoService: CryptoService
    ) {}

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            include: { admin: true }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
            include: { admin: true }
        })
    }

    async create(createUserDTO: CreateUserDTO) {
        return await this.prisma.user.create({
            data: {
                ...createUserDTO,
                password: await this.cryptoService.hash(
                    createUserDTO.password
                )
            }
        })
    }

    async update(id: string, updateUserDTO: UpdateUserDTO) {
        return await this.prisma.user.update({
            data: updateUserDTO,
            where: { id }
        })
    }

    async delete(id: string) {
        return await this.prisma.user.delete({
            where: { id }
        })
    }
}
