import { ConflictException } from "@nestjs/common"

export class TakenException extends ConflictException {
    constructor(fieldName: string) {
        super(`${fieldName} is already taken`)
    }
}
