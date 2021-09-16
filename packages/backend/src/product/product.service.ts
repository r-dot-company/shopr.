import { Access, Prisma } from ".prisma/client"
import { Injectable } from "@nestjs/common"
import { PaginationService } from "src/pagination/pagination.service"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateProductDTO } from "./dto/create-product.dto"
import { QueryProductsDTO } from "./dto/query-products.dto"
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

    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService
    ) {}

    async getSize(query?: QueryProductsDTO) {
        return await this.prisma.product.count({
            where: this.getFilter(query)
        })
    }

    async getSizePublic(query?: QueryProductsDTO) {
        return await this.prisma.product.count({
            where: {
                ...this.getFilter(query),
                access: Access.PUBLIC
            }
        })
    }

    async findAll(query?: QueryProductsDTO) {
        return await this.prisma.product.findMany({
            ...this.paginationService.paginate(query),
            where: this.getFilter(query),
            include: this.include
        })
    }

    async findAllPublic(query?: QueryProductsDTO) {
        return await this.prisma.product.findMany({
            ...this.paginationService.paginate(query),
            where: {
                ...this.getFilter(query),
                access: Access.PUBLIC
            },
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

    private getFilter(query: QueryProductsDTO) {
        const filter: Prisma.ProductWhereInput = {}
        if (Array.isArray(query?.categories)) {
            filter.categories = {
                some: {
                    id: {
                        in: query.categories
                    }
                }
            }
        }
        return filter
    }
}
