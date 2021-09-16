import { Controller, Get, NotFoundException, Param } from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CategoryEntity } from "./entities/category.entitiy"

@Controller("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    async getAll() {
        const categories = await this.categoryService.getTree()
        return categories.map((category) => new CategoryEntity(category))
    }

    @Get(":key")
    async getOne(@Param("key") key: string) {
        const category = await this.categoryService.findByKey(key)
        if (!category) {
            throw new NotFoundException()
        }
        return new CategoryEntity(category)
    }
}
