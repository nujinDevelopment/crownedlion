export const useProductsStore = definePiniaStore('products', () => {
    const products = [
      {
        "id": 1,
        "name": "Hey Sunglasses!",
        "price": 10.99,
        "image": "product-placeholder.png",
        "slug": "sunglasses",
        "stripePriceId": "price_xxxxxxxxxxxxxxxxxxxx1",
        "quatity": 10
      },
      {
        "id": 2,
        "name": "Fruity Shoes",
        "price": 99.01,
        "image": "product-placeholder.png",
        "slug": "shoes",
        "stripePriceId": "price_xxxxxxxxxxxxxxxxxxxx2",
        "quatity": 10
      }
    ]

    const fetchProducts = async () => {
      return products.value = await useFetch('/api/shop/fetch-products')
    }

    const addProduct = async (product) => {
      products.value.push(product)
    }

    return {
      products,
      fetchProducts,
      addProduct
    }
})