import { DataTypes, Model, Optional, Sequelize } from "sequelize"

type ProductAttributes = {
    id: number,
    name: string,
    price: number
}

type ProductCreationAttributes = Optional<ProductAttributes, "id">

export class Product extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes {
    public id!: number
    public name!: string
    public price!: number
    public createdAt!: Date
    public updatedAt!: Date
}

export function init(sequelize: Sequelize) {
    Product.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(16, 2).UNSIGNED,
            allowNull: false
        }
    }, { sequelize })
}
