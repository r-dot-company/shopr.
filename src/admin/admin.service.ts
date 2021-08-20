import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string) {
        return await this.prisma.admin.findUnique({
            where: { id },
            include: {
                user: true
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                admin: true
            }
        })
    }
}
