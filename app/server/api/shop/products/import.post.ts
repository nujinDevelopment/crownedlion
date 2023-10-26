import { v4 as uuid } from 'uuid'
import { Product } from '../../../lib/interfaces/product.interface'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    const productsDatabase = event.context.productsDatabase
    const categoriesDatabase = event.context.categoriesDatabase
    const subcategoriesDatabase = event.context.subcategoriesDatabase

    // Check if auth
    if (!session) {
      throw createError({
        statusCode: 403, // Forbidden
        statusMessage: 'Permission denied',
      })
    }
    // Check if the user has the required role (e.g., admin)
    // if (userRole !== 'admin') {
    //   throw createError({
    //     statusCode: 403, // Forbidden
    //     statusMessage: 'Permission denied',
    //   })
    // }
    const { data } = await readBody(event) // Array of products

    // Import the array of products
    for (let product of data) {
      // Generate a unique user ID
      product.id = uuid()

      // Do the Data Processing
      // Write the Code I asked for here

      // The fallowing is to store the Data
      // await productsDatabase.put(product.slug, product)
      // await categoriesDatabase.put(product.slug, product)
      // await subcategoriesDatabase.put(product.slug, product)
    }

    for (const rawProduct of data) {
      console.log(rawProduct);

      // Create a product object from the raw data
      const product = {
        id: uuid(), // Generate a unique ID
        brand: rawProduct.brand,
        name: rawProduct.name,
        slug: slugify(rawProduct.slug), // You need to implement slug generation
        images: rawProduct.images,
        quantity: rawProduct.quantity,
        description: rawProduct.description,
        propertyName: rawProduct.propertyName,
        propertyValue: rawProduct.propertyValue,
        variant: rawProduct.variant,
        variants: rawProduct.variants,
        properties: rawProduct.properties,
        boughtPrice: rawProduct.boughtPrice,
        sellingPrice: rawProduct.sellingPrice,
        account: rawProduct.account,
        tax: rawProduct.tax,
        EAN: rawProduct.EAN,
        featured: rawProduct.featured,
      };

      // Generate a slug based on the product name (you can implement your slug generation logic here)
      product.slug = slugify(product.name);

      // Store the product in the product database
      await productsDatabase.put(product.slug, product);

      // Sort the product into the appropriate category
      let category;
      const categoryExists = await categoriesDatabase.exists(slugify(product.group));
      if (!categoryExists) {
        category = {
          id: uuid(),
          name: product.group,
          slug: slugify(product.group),
          image: '',
          description: '',
          products: [],
          featured: [],
          subcategories: [],
          created: '',
          updated: '',
        };
      } else {
        category = await categoriesDatabase.get(slugify(product.group))
      }

      category.products.push(product.slug);

      let subcategory;
      const subcategoryExists = await subcategoriesDatabase.exists(slugify(product.subgroup));
      if (!subcategoryExists) {
        subcategory = {
          id: uuid(),
          parent: slugify(product.group),
          name: product.subgroup,
          slug: slugify(product.subgroup),
          image: '',
          description: '',
          products: [],
          featured: [],
          created: '',
          updated: '',
        };
      } else {
        subcategory = await subcategoriesDatabase.get(slugify(product.subgroup))
      }

      subcategory.products.push(product.slug);

      await categoriesDatabase.put(category.slug, category);
      await subcategoriesDatabase.put(subcategory.slug, subcategory);
    }

    setResponseStatus(event, 202)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }
})
