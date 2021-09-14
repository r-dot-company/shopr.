import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraintInterface
} from "class-validator"
import { AssetTypeExistsRule } from "./asset-type-exists.rule"
import { CategoryExistsRule } from "./category-exists.rule"
import { EmailAvailableRule } from "./email-available.rule"
import { ProductExistsRule } from "./product-exists.rule"
import { UserExistsRule } from "./user-exists.rule"

function makeValidationDecorator({ validator, name }: {
    validator: new (...args: any[]) => ValidatorConstraintInterface,
    name: string
}) {
    return function (options?: ValidationOptions) {
        return function(object: any, propertyName: string) {
            registerDecorator({
                target: object.constructor,
                options,
                propertyName,
                validator,
                name
            })
        }
    }
}

export const ProductExists = makeValidationDecorator({
    name: "ProductExists",
    validator: ProductExistsRule
})

export const EmailAvailable = makeValidationDecorator({
    name: "EmailAvailable",
    validator: EmailAvailableRule
})

export const AssetTypeExists = makeValidationDecorator({
    name: "AssetTypeExists",
    validator: AssetTypeExistsRule
})

export const UserExists = makeValidationDecorator({
    name: "UserExists",
    validator: UserExistsRule
})

export const CategoryExists = makeValidationDecorator({
    name: "CategoryExists",
    validator: CategoryExistsRule
})
