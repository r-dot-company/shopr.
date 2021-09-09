import { registerDecorator, ValidationOptions } from "class-validator"
import { EmailAvailableRule } from "./email-available.rule"
import { OneOfRule } from "./one-of.rule"
import { ProductExistsRule } from "./product-exists.rule"

export function ProductExists(options?: ValidationOptions) {
    return function(object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            options,
            propertyName,
            validator: ProductExistsRule,
            name: "ProductExists"
        })
    }
}

export function EmailAvailable(options?: ValidationOptions) {
    return function(object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            options,
            propertyName,
            validator: EmailAvailableRule,
            name: "EmailAvailable"
        })
    }
}

export function OneOf<T>(options: T[], validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            options: validationOptions,
            constraints: [options],
            propertyName,
            validator: OneOfRule,
            name: "OneOf"
        })
    }
}
