import { Sequelize } from "sequelize"
import * as models from "./models"

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "root",
    database: "shopr"
})

export async function init() {
    models.init(sequelize)
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
}

export * from "./models"
