import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateCategoryDTO } from "./dto/create-category.dto"
import { UpdateCategoryDTO } from "./dto/update-category.dto"

@Injectable()
export class CategoryService {
    private readonly include = {
        children: true,
        parents: true
    }

    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.category.findMany({
            where: {
                parents: {
                    none: {}
                }
            },
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            }
        })
    }

    async findById(id: number) {
        return await this.prisma.category.findUnique({
            where: { id },
            include: this.include
        })
    }

    async findByKey(key: string) {
        return await this.prisma.category.findUnique({
            where: { key },
            include: this.include
        })
    }

    async create(createCategoryDTO: CreateCategoryDTO) {
        return await this.prisma.category.create({
            data: createCategoryDTO,
            include: this.include
        })
    }
    
    async update(id: number, updateCategoryDTO: UpdateCategoryDTO) {
        if (Array.isArray(updateCategoryDTO.children)) {
            await this.removeAllChildren(id)
        }
        if (Array.isArray(updateCategoryDTO.parents)) {
            await this.removeAllParents(id)
        }
        return await this.prisma.category.update({
            where: { id },
            data: {
                ...updateCategoryDTO,
                children: {
                    connect: updateCategoryDTO.children?.map((id) => ({ id }))
                },
                parents: {
                    connect: updateCategoryDTO.parents?.map((id) => ({ id }))
                }
            },
            include: this.include
        })
    }

    async delete(id: number) {
        return await this.prisma.category.delete({
            where: { id },
            include: this.include
        })
    }

    private async removeAllChildren(id: number) {
        const category = await this.findById(id)
        await this.prisma.category.update({
            where: { id },
            data: {
                children: {
                    disconnect: category.children.map((category) => ({
                        id: category.id
                    }))
                }
            }
        })
    }

    private async removeAllParents(id: number) {
        const category = await this.findById(id)
        await this.prisma.category.update({
            where: { id },
            data: {
                parents: {
                    disconnect: category.parents.map((category) => ({
                        id: category.id
                    }))
                }
            }
        })
    }
}
