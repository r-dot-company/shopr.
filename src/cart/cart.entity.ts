export class CartEntity {
    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial)
    }
}
