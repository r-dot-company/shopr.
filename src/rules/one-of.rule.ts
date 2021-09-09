import { Injectable } from "@nestjs/common"
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator"

@ValidatorConstraint({
    name: "OneOf"
})
@Injectable()
export class OneOfRule<T> implements ValidatorConstraintInterface {
    validate(value: T, args: ValidationArguments) {
        return this.getOptions(args).includes(value)
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be one of: ${this.getOptions(args).join(", ")}`
    }

    private getOptions(args: ValidationArguments) {
        const options: T[] = args.constraints[0]
        if (!options) {
            throw new Error("Missing constraint")
        }
        return options
    }
}
