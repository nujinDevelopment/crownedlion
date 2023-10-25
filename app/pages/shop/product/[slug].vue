<script setup lang="ts">
import { useUserStore } from '../../../stores/user'
import { useProductsStore } from '../../../stores/products'
import { useCartStore } from '../../../stores/cart'

// const { $mdit } = useNuxtApp()

const userStore = useUserStore()
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

const product = await getProduct(route.params.slug)

async function addToCart(product) {
  await cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.sellingPrice,
    currency: 'EUR',
    // stripePriceId: product.stripePriceId,
  })
}

const selectedImage = ref({})

const selectImage = (image) => {
  selectedImage.value = image
}

// TODO replace with Markdown
const formatText = (text) => {
  return text.replace(/\n/g, "<br />")
}

onMounted(() => {
  if (product) {
    selectedImage.value = product.images[0]
  }
})
definePageMeta({
  auth: false,
})

</script>
<template>
  <div class="">
    <!-- Header -->
    <section>
      <div class="w-full flex flex-col justify-end  bg-cover bg-fixed bg-center bg-no-repeat" :style="{ 'background-image': `url(/uploads/shop/products/${selectedImage})` }">
        <div class="flex flex-col justify-start items-center text-center w-full h-24">
          <!-- <h1 class="text-3xl text-white">{{ group.name }}</h1> -->
        </div>
        <div class="custom-shape-divider-bottom-1697729642">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" class="fill-base-200"></path>
          </svg>
        </div>
      </div>
    </section>
    <div class="container mx-auto flex justify-center items-start min-h-screen pt-12">

      <!-- Product Content -->
      <div class="flex flex-wrap h-full">
        <div class="w-full md:w-1/4 m-8 h-full flex flex-col justify-center items-center">
          <!-- Images -->
          <div class="">
            <div class="flex justify-center md:justify-end p-2">
              <img
              class="rounded-3xl border border-base-200 h-24 w-24 p-1 object-cover"
                v-if="product.images.length > 1"
                v-for="image in product.images"
                :src="(product.images) ? `/uploads/shop/products/${image}` : '/uploads/shop/products/product-placeholder.png'"
                @click="selectImage(image)"
              >
            </div>
            <div class="">
              <img
                class="rounded-3xl border border-base-200 h-full w-full"
                :src="(selectedImage) ? `/uploads/shop/products/${selectedImage}` : '/uploads/shop/products/product-placeholder.png'"
              >
            </div>
          </div>

          <!-- Buy Button -->
          <div class="my-8 flex flex-col items-center justify-center md:items-end md:justify-end w-full">
            <span class="text-gray-500 italic text-left">MvSt incl: {{ product.tax }}</span>
            <button
              class="px-6 py-4 btn-success rounded-xl"
              @click="addToCart(product)"
            >
            In den Warenkorb {{ Number(product.sellingPrice).toFixed() }}€
          </button>

          <!-- Edit -->
          <button class="btn" v-if="userStore.isAdmin" @click="router.push(`/admin/shop/products/edit/${route.params.slug}`)">Edit</button>
        </div>
      </div>

      <!-- Product Description -->
      <div class="w-full md:w-2/4 lg:m-8 flex flex-col items-start justify-center max-h-screen">
        <div>
          <h2 class="text-5xl">{{ product.name }}</h2>
          <div class=" flex">
            <!-- <h3>Brand</h3> -->
            <h3 class="text-4xl font-bold text-primary">{{ product.brand }}</h3>
          </div>
          <div class="flex flex-col p-2">
            <div class="flex flex-col">
              <p>Produkt Farbe: {{ product.color }}</p>
              <div class="">
                <select class="select select-bordered w-full max-w-xs">
                  <option disabled selected>Wähle Farbe</option>
                  <option>Variante A</option>
                  <option>Variante B</option>
                </select>
              </div>
            </div>
            <div class="flex">
              <p><span>{{ product.propertyName }}: </span>{{ product.propertyValue }}</p>
            </div>
          </div>
        </div>
        <div class="italic">
          <p>Quantity: <span>{{ product.quantity }}</span></p>
        </div>
        <div class="py-2">
          <div class="flex-1 " v-if="product.description">
            <h3 class="font-bold">Beschreibung: </h3>
            <!-- <p v-html="formatText(product.description)"></p> -->
            <div v-html="$mdit.render(product.description)"></div>
          </div>
          <div class="flex-1 pt-4" v-if="product.facts">
            <h3 class="font-bold">Fakten: </h3>
            <div v-html="$mdit.render(product.facts)"></div>
            <!-- <p v-html="formatText(product.facts)"></p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.custom-shape-divider-bottom-1697729642 {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-bottom-1697729642 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 69px;
}
</style>