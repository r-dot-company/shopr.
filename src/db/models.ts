import { DataTypes, Model, Optional, Sequelize } from "sequelize"

type ProductAttributes = {
    id: number,
    name: string,
    price: number
}

type ProductCreationAttributes = Optional<ProductAttributes, "id">

export class Product extends Model<
    ProductAttributes,
    ProductCreationAttributes
> implements ProductAttributes {
    public id!: number
    public name!: string
    public price!: number
    public createdAt!: Date
    public updatedAt!: Date
}

type UserAttributes = {
    id: string,
    email: string,
    password: string
}

type UserCreationAttributes = Optional<UserAttributes, "id">

export class User extends Model<
    UserAttributes,
    UserCreationAttributes
> implements UserAttributes {
    public id!: string
    public email!: string
    public password!: string
}

type AddressAttributes = {
    id: string,
    country: string,
    city: string,
    street: string,
    zip: string
}

type AddressCreationAttributes = Optional<AddressAttributes, "id">

export class Address extends Model<
    AddressAttributes,
    AddressCreationAttributes
> implements AddressAttributes {
    public id!: string
    public country!: string
    public city!: string
    public street!: string
    public zip!: string
}

type OrderAttributes = {
    id: string,
    status: number
}

type OrderCreationAttributes = Optional<OrderAttributes, "id">

export class Order extends Model<
    OrderAttributes,
    OrderCreationAttributes
> implements OrderAttributes {
    public id!: string
    public status!: number
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

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize })

    Address.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
    }, { sequelize })

    Order.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }, { sequelize })

    User.hasOne(Address)
    Address.belongsTo(User)

    User.hasMany(Order)
    Order.belongsTo(User)

    Product.hasMany(Order)
    Order.belongsTo(Product)
}
