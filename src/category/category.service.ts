import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.category.findMany()
    }

    async findById(id: number) {
        return await this.prisma.category.findUnique({
            where: { id }
        })
    }

    async findByKey(key: string) {
        return await this.prisma.category.findUnique({
            where: { key }
        })
    }

    async create(createCategoryDTO: CreateCategoryDTO) {
        return await this.prisma.category.create({
            data: createCategoryDTO
        })
    }
    
    async update(id: number, updateCategoryDTO: UpdateCategoryDTO) {
        return await this.prisma.category.update({
            where: { id },
            data: updateCategoryDTO
        })
    }

    async delete(id: number) {
        return await this.prisma.category.delete({
            where: { id }
        })
    }
}
