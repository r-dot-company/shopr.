import {
    Body,
    ConflictException,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Query,
    UseInterceptors
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { Role } from "src/role/role.enum"
import { AdminService } from "./admin.service"
import { CreateAdminDTO } from "./dto/create-admin.dto"
import { AdminEntity } from "./entities/admin.entity"

@Controller()
@Auth(Role.Admin)
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll(@Query() query: PaginationDTO) {
        const size = await this.adminService.getSize()
        const admins = await this.adminService.getAll(query)
        return [size, admins.map((admin) => new AdminEntity(admin))]
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        const admin = await this.adminService.findById(id)
        if (!admin) {
            throw new NotFoundException()
        }
        return new AdminEntity(admin)
    }

    @Post()
    async create(@Body() createAdminDTO: CreateAdminDTO) {
        const admin = await this.adminService.findByUserId(createAdminDTO.userId)
        if (admin) {
            throw new ConflictException()
        }
        const newAdmin = await this.adminService.create(createAdminDTO)
        return new AdminEntity(newAdmin)
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        const admin = await this.adminService.findById(id)
        if (!admin) {
            throw new NotFoundException()
        }
        if (admin.protected) {
            throw new ForbiddenException()
        }
        await this.adminService.delete(id)
        return new AdminEntity(admin)
    }
}
