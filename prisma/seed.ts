import { PrismaClient } from "@prisma/client"
import { makeRunnable, run } from "@m.moelter/task-runner"
import crypto from "crypto"

const client = new PrismaClient()

function hash(input: string) {
    return crypto
        .createHash("sha256")
        .update(input, "utf8")
        .digest("hex")
}

async function seedAdmin() {
    const admin = await client.admin.findMany()
    if (admin.length === 0) {
        await client.admin.create({
            data: {
                username: "admin",
                password: hash("admin")
            }
        })
    }
}

const seed = makeRunnable(async () => {
    await run(seedAdmin, "Admin")
})

seed().then(client.$disconnect.bind(client))
