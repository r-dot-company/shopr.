import { IsNotEmpty, MaxLength } from "class-validator"

export class CreateAddressDTO {
    @IsNotEmpty()
    country: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    @MaxLength(32)
    zip: string
}
