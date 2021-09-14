import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { CategoryExists } from "src/rules/decorators"
import { ParseIntTransform } from "src/transforms/parse-int.transform"

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    key: string
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @CategoryExists({ each: true })
    @ParseIntTransform({ each: true })
    children: number[]

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @CategoryExists({ each: true })
    @ParseIntTransform({ each: true })
    parents: number[]
}
