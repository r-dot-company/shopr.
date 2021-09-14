import { IsInt, IsOptional, Max, Min } from "class-validator"
import { ParseIntTransform } from "src/transforms/parse-int.transform"

export class PaginationDTO {
    @IsInt()
    @Min(0)
    @IsOptional()
    @ParseIntTransform()
    page: number = 0

    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    @ParseIntTransform()
    per_page: number = 10
}
