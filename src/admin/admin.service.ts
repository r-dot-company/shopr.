import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(where: { email?: string, id?: string }) {
        return await this.prisma.admin.findUnique({ where })
    }
}
