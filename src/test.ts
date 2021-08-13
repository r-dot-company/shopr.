import { init, sequelize, Product } from "./db"

async function run() {
    await init()

    await Product.create({
        name: "My First Product",
        price: 19.99
    })

    await sequelize.close()
}

run()
