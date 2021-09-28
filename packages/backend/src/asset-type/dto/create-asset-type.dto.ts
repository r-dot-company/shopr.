import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateAssetTypeDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    key: string

    @IsString()
    @MaxLength(255)
    mimeType?: string
}
