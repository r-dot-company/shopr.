import { Injectable } from "@nestjs/common"
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { ProductService } from "src/product/product.service"

@ValidatorConstraint({
    name: "ProductExists",
    async: true
})
@Injectable()
export class ProductExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly productService: ProductService) {}

    async validate(id: number) {
        const product = await this.productService.findById(id)
        return !!product
    }
    
    defaultMessage() {
        return "Product does not exist"
    }
}
