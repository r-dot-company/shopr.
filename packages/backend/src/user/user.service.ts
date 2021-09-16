import { Injectable } from "@nestjs/common"
import { CryptoService } from "src/crypto/crypto.service"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { PaginationService } from "src/pagination/pagination.service"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private cryptoService: CryptoService
    ) {}

    async getSize() {
        return this.prisma.user.count()
    }

    async getAll(query?: PaginationDTO) {
        return await this.prisma.user.findMany({
            ...this.paginationService.paginate(query),
            include: { admin: true }
        })
    }

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
