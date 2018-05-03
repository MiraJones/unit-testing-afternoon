var cart = require("./cart");
var data = require("./data/cars")

afterEach(() => {
    cart.total = 0;
    cart.cart = []
})

describe("Cart Properties", () => {
    test("check if cart is an empty array", () => {
        var type = Array.isArray(cart.cart)
        var length = cart.cart.length
        expect(type).toBeTruthy
        expect(length).toBe(0)
    })
    test("Check that the total is 0", () => {
        expect(cart.total).toBe(0)
    })
})

describe("Cart Methods", () => {
    test("add to cart method should change the length of the array", () => {
        cart.addToCart(data[8]);
        cart.addToCart(data[6]);
        expect(cart.cart.length).toBe(2);
        expect(cart.cart[0]).toEqual(data[8])
        expect(cart.cart[1]).toEqual(data[6])
    })
    test("when adding to the cart, the total is updated", () => {
        cart.addToCart(data[2]);
        cart.addToCart(data[3]);
        expect(cart.total).toEqual(data[2].price + data[3].price)
    })
    test("check that delete from cart removes an item", () => {
        cart.addToCart(data[8]);
        cart.addToCart(data[6]);
        cart.addToCart(data[4])
        cart.removeFromCart(1, data[6].price)
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(data[8])
        expect(cart.cart[1]).toEqual(data[4])
    })
    test("check that when we remove a car, the total updates", () => {
        cart.addToCart(data[8]);
        cart.addToCart(data[6]);
        cart.addToCart(data[4])
        cart.removeFromCart(1, data[6].price)
        expect(cart.total).toEqual(data[8].price + data[4].price)
    })
    test("check that checkout re-initializes total and cart", () => {
        cart.addToCart(data[8]);
        cart.addToCart(data[6]);
        cart.addToCart(data[4]);
        cart.checkout() 
        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0)
    })
})