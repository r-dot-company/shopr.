import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraintInterface
} from "class-validator"

export type Override<T, K extends keyof T, V> = Omit<T, K> & Record<K, V>

export function makeValidationDecorator({ validator, name }: {
    validator: new (...args: any[]) => ValidatorConstraintInterface,
    name: string
}) {
    return function(options?: ValidationOptions) {
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
