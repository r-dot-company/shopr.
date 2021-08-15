import express from "express"
import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(__dirname, "..", "..", ".env")
})

export function start() {
    const app = express()

    app.get("/", (req, res) => res.send("Hello World"))

    app.listen(process.env.REST_API_PORT, () => {
        console.log(`REST API listening on port ${process.env.REST_API_PORT}`)
    })
}

if (require.main === module) {
    start()
}
