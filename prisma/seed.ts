import { PrismaClient } from "@prisma/client"
import { makeRunnable, run } from "@m.moelter/task-runner"
import * as bcrypt from "bcrypt"

const client = new PrismaClient()

async function seedAdmin() {
    const admin = await client.admin.findMany()
    if (admin.length === 0) {
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
}

const seed = makeRunnable(async () => {
    await run(seedAdmin, "Admin")
})

seed().then(client.$disconnect.bind(client))
