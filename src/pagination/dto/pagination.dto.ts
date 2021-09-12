import { Transform } from "class-transformer"
import { IsInt, IsOptional, Max, Min } from "class-validator"

export class PaginationDTO {
    @IsInt()
    @Min(0)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page: number = 0

    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    per_page: number = 10
}
