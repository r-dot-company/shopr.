import { Injectable } from "@nestjs/common"
import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator"
import { CategoryService } from "src/category/category.service"

@ValidatorConstraint({
    name: "CategoryExists",
    async: true
})
@Injectable()
export class CategoryExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly categoryService: CategoryService) {}

    async validate(id: string | number) {
        if (typeof id === "string") {
            id = parseInt(id)
        }
        if (!id) {
            return false
        }
        const category = await this.categoryService.findById(id)
        return !!category
    }
    
    defaultMessage() {
        return "Category does not exist"
    }
}
