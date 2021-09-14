import { PrismaClient } from "@prisma/client"
import { makeRunnable, run } from "@m.moelter/task-runner"
import * as bcrypt from "bcrypt"

const client = new PrismaClient()

async function seedAdmin() {
    await client.admin.create({
        data: {
            protected: true,
            user: {
                create: {
                    email: "admin@mail.com",
                    password: bcrypt.hashSync("admin", 5)
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
