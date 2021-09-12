import { Transform } from "class-transformer"
import { IsInt, IsOptional, Min } from "class-validator"

export class PaginationDTO {
    @IsInt()
    @Min(0)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page: number

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    per_page: number
}
