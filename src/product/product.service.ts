import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDTO } from "./dto/create-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.product.findMany()
    }

    async findById(id: number) {
        return await this.prisma.product.findUnique({
            where: { id }
        })
    }

    async create(createProductDTO: CreateProductDTO) {
        return await this.prisma.product.create({
            data: createProductDTO
        })
    }

    async update(id: number, updateProductDTO: UpdateProductDTO) {
        return await this.prisma.product.update({
            where: { id },
            data: updateProductDTO
        })
    }

    async delete(id: number) {
        return await this.prisma.product.delete({
            where: { id }
        })
    }
}
