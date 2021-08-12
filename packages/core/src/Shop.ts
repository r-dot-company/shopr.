import ProductsManager from "./managers/ProductsManager"

export default class Shop {
    public static main() {
        const shop = new Shop()
        console.log(shop.products)
    }

    public readonly products = new ProductsManager()
}
