import { Access, Prisma } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDTO } from "./dto/create-product.dto"
import { UpdateProductDTO } from "./dto/update-product.dto"

@Injectable()
export class ProductService {
    private readonly include = {
        categories: true,
        assets: {
            include: {
                type: true
            }
        }
    }

    constructor(private readonly prisma: PrismaService) {}

    async findAllPublic() {
        return await this.prisma.product.findMany({
            where: {
                access: Access.PUBLIC
            },
            include: this.include
        })
    }

    async findAll() {
        return await this.prisma.product.findMany({
            include: this.include
        })
    }

    async findById(id: number) {
        return await this.prisma.product.findUnique({
            where: { id },
            include: this.include
        })
    }

    async create(createProductDTO: CreateProductDTO) {
        return await this.prisma.product.create({
            data: createProductDTO,
            include: this.include
        })
    }

    async update(id: number, updateProductDTO: UpdateProductDTO) {
        if (Array.isArray(updateProductDTO.categories)) {
            await this.removeAllCategories(id)
        }
        return await this.prisma.product.update({
            where: { id },
            data: {
                ...updateProductDTO,
                categories: {
                    connect: updateProductDTO.categories?.map((id) => ({ id }))
                }
            },
            include: this.include
        })
    }

    async delete(id: number) {
        return await this.prisma.product.delete({
            where: { id }
        })
    }

    private async removeAllCategories(id: number) {
        const product = await this.findById(id)
        await this.prisma.product.update({
            where: { id },
            data: {
                categories: {
                    disconnect: product.categories.map((category) => ({
                        id: category.id
                    }))
                }
            }
        })
    }
}
