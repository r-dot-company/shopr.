import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDTO: CreateUserDTO) {
        await this.prisma.user.create({
            data: createUserDTO
        })
    }

    async update(id: string, updateUserDTO: UpdateUserDTO) {
        await this.prisma.user.update({
            data: updateUserDTO,
            where: { id }
        })
    }

    async delete(id: string) {
        await this.prisma.user.delete({
            where: { id }
        })
    }
}
