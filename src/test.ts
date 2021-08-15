import db from "./db"
import crypto from "crypto"

function hash(input: string) {
    return crypto
        .createHash("sha256")
        .update(input, "utf8")
        .digest("hex")
}

async function run() {
    await db.user.deleteMany()

    await db.user.create({
        data: {
            email: "my-email@mail.com",
            password: hash("123456")
        }
    })
}

run().then(db.$disconnect.bind(db))
