import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateAddressDTO } from "./dto/create-address.dto"
import { UpdateAddressDTO } from "./dto/update-address.dto"

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return await this.prisma.address.findUnique({
            where: { id }
        })
    }

    async findByUser(user: User) {
        return await this.prisma.address.findMany({
            where: {
                userId: user.id
            }
        })
    }

    async create(user: User, createAddressDTO: CreateAddressDTO) {
        return await this.prisma.address.create({
            data: {
                ...createAddressDTO,
                userId: user.id
            }
        })
    }

    async update(id: string, updateAddressDTO: UpdateAddressDTO) {
        return await this.prisma.address.update({
            data: updateAddressDTO,
            where: { id }
        })
    }

    async delete(id: string) {
        return await this.prisma.address.delete({
            where: { id }
        })
    }
}
