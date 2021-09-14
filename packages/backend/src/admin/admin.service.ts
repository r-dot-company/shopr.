import { Injectable } from "@nestjs/common"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { PaginationService } from "src/pagination/pagination.service"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateAdminDTO } from "./dto/create-admin.dto"

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService, private paginationService: PaginationService) {}

    async getAll(query?: PaginationDTO) {
        return this.prisma.admin.findMany({
            ...this.paginationService.paginate(query),
            include: {
                user: true
            }
        })
    }

    async findById(id: string) {
        return this.prisma.admin.findUnique({
            where: { id },
            include: {
                user: true
            }
        })
    }

    async findByUserId(userId: string) {
        return this.prisma.admin.findFirst({
            where: { userId }
        })
    }

    async create(createAdminDTO: CreateAdminDTO) {
        return await this.prisma.admin.create({
            data: createAdminDTO
        })
    }

    async delete(id: string) {
        return await this.prisma.admin.delete({
            where: { id }
        })
    }
}
