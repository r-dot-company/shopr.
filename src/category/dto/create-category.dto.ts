import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    key: string
    
    @IsString()
    @IsNotEmpty()
    name: string
}
