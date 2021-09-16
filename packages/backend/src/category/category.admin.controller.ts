import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseInterceptors
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"
import { Role } from "src/role/role.enum"
import { CategoryService } from "./category.service"
import { CreateCategoryDTO } from "./dto/create-category.dto"
import { UpdateCategoryDTO } from "./dto/update-category.dto"
import { CategoryEntity } from "./entities/category.entitiy"

@Controller()
@Auth(Role.Admin)
export class CategoryAdminController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll() {
        const size = await this.categoryService.getSize()
        const categories = await this.categoryService.getAll()
        return [size, categories.map((category) => new CategoryEntity(category))]
    }

    @Get("/tree")
    async getTree() {
        const categories = await this.categoryService.getTree()
        return categories.map((category) => new CategoryEntity(category))
    }

    @Get(":id")
    async getOne(@Param("id", ParseIntPipe) id: number) {
        const category = await this.categoryService.findById(id)
        if (!category) {
            throw new NotFoundException()
        }
        return new CategoryEntity(category)
    }

    @Post()
    async create(@Body() createCategoryDTO: CreateCategoryDTO) {
        const category = await this.categoryService.findByKey(createCategoryDTO.key)
        if (category) {
            throw new ConflictException()
        }
        const newCategory = await this.categoryService.create(createCategoryDTO)
        return new CategoryEntity(newCategory)
    }

    @Put(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateCategoryDTO: UpdateCategoryDTO
    ) {
        const category = await this.categoryService.findById(id)
        if (!category) {
            throw new NotFoundException()
        }
        const newCategory = await this.categoryService.update(id, updateCategoryDTO)
        return new CategoryEntity(newCategory)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        const category = await this.categoryService.findById(id)
        if (!category) {
            throw new NotFoundException()
        }
        await this.categoryService.delete(id)
        return new CategoryEntity(category)
    }
}
