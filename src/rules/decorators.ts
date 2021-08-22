import { makeValidationDecorator } from "src/utils"
import { ProductExistsRule } from "./product-exists.rule"

export const ProductExists = makeValidationDecorator({
    validator: ProductExistsRule,
    name: "ProductExists"
})
