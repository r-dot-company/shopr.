import { Injectable } from "@nestjs/common"
import fs from "fs"
import mime from "mime"
import path from "path"
import { v4 as uuid } from "uuid"

@Injectable()
export class StorageService {
    private readonly STORAGE_DIR = "storage"
    
    async storeUploadedFile(file: Express.Multer.File) {
        const ext = mime.getExtension(file.mimetype)
        if (!ext) {
            throw new Error(`No extension found for mimetype ${file.mimetype}`)
        }
        const filename = this.generateFilename(ext)
        const newPath = this.getPath(filename)
        await fs.promises.writeFile(newPath, file.buffer)
        return filename
    }

    async delete(filename: string) {
        const filepath = this.getPath(filename)
        await fs.promises.unlink(filepath)
    }

    private generateFilename(ext: string) {
        return `${uuid()}.${ext}`
    }

    private getPath(filename: string) {
        return path.join(this.STORAGE_DIR, filename)
    }
}
