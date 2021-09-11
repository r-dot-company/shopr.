import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common"
import { Response } from "express"
import { StorageService } from "./storage.service"

@Controller("storage")
export class StorageController {
    constructor(private storage: StorageService) {}
    
    @Get(":filename")
    async getFile(@Param("filename") filename: string, @Res() res: Response) {
        const exists = await this.storage.exists(filename)
        if (!exists) {
            throw new NotFoundException()
        }
        const stream = this.storage.getFileStream(filename)
        res.type(this.storage.getMimeType(filename))
        stream.pipe(res)
    }
}
