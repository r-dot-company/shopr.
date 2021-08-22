import { makeValidationDecorator } from "src/utils"
import { EmailAvailableRule } from "./email-available.rule"
import { ProductExistsRule } from "./product-exists.rule"

export const ProductExists = makeValidationDecorator({
    validator: ProductExistsRule,
    name: "ProductExists"
})

export const EmailAvailable = makeValidationDecorator({
    validator: EmailAvailableRule,
    name: "EmailAvailable"
})
