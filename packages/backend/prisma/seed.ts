import { PrismaClient } from "@prisma/client"
import { makeRunnable, run } from "@m.moelter/task-runner"
import * as bcrypt from "bcrypt"
import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.resolve(__dirname, "..", ".env")
})

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) ?? 5

const client = new PrismaClient()

async function seedAdmin() {
    await client.admin.create({
        data: {
            protected: true,
            user: {
                create: {
                    email: "admin@mail.com",
                    password: bcrypt.hashSync("admin", SALT_ROUNDS),
                    firstname: "Admin",
                    lastname: "Admin"
                }  
            }
        }
    })
}

async function seedAssetType() {
    await client.assetType.create({
        data: {
            key: "image",
            mimeType: "image/png,image/jpeg"
        }
    })
}

const seed = makeRunnable(async () => {
    await run(seedAdmin, "Admin")
    await run(seedAssetType, "Asset Type")
})

seed().then(client.$disconnect.bind(client))
