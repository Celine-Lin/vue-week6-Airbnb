<template>
  <!-- Banner -->
  <section
    class="
      w-full
      d-flex justify-content-center align-items-end"
    style="
      height: 300px;
      background-size: cover;
      background-position: center;
      background-image:
      radial-gradient(rgb(0 0 0 / 0%),rgb(0 0 0 / 40%)),
      url('https://images.unsplash.com/photo-1568108499813-b04341f126b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
    >
    <h5 class="text-secondary"> - 藝術品鑑賞與收藏 - </h5>
  </section>
  <!-- Products -->
  <main class="container">
    <section class="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-2xl-4 g-4 py-60">
      <article
        class="col"
        v-for="product in products"
        :key="product.id">
        <div class="card rounded mb-3">
          <RouterLink :to="`/user/products/${product.id}`">
          <img
            :src="`${product.imageUrl}`"
            class="card-img-top"
            style="height: 350px; object-fit: cover;">
          </RouterLink>
          <div class="card-body">
            <h4 class="card-title">{{ product.title }}</h4>
          </div>
          <div class="
            card-footer
            d-flex
            justify-content-between
            align-items-center"
            >
            <div
              v-if="!product.price"
              class="h5">
              {{ product.origin_price }} 元
            </div>
            <p v-else class="m-0">
              <del
                class="text-gray-300 align-middle">
                原價 {{ product.origin_price }} 元
              </del>
              <span class="h5 ms-3 align-middle">
                現在只要 {{ product.price }} 元
              </span>
            </p>
            <button
              type="button"
              class="btn btn-lg"
              :disabled="product.id === status.addCartLoading"
              @click="addCart(product.id)">
              <!-- Bootstrap 的 讀取圖示(Spinners) -->
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
              v-if="product.id === status.addCartLoading"></span>
              <!-- 加入一筆到購物車 -->
              <font-awesome-icon v-else :icon="['fas', 'circle-plus']" />
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>

<script>
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env;
export default {
  data() {
    return {
      isLoading: true,
      products: [],
      cartData: [],
      status: {
        addCartLoading: '',
      },
    };
  },
  methods: {
    getProducts() {
      setTimeout(() => {
        this.$http
          .get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products`)
          .then((res) => {
            this.isLoading = false;
            this.products = res.data.products;
          })
          .catch(() => {
            this.$swal.fire({
              toast: true,
              position: 'bottom-end',
              showConfirmButton: false,
              timer: 1500,
              icon: 'error',
              title: '很抱歉，目前無法載入資料。',
            });
          });
      }, 1000);
    },
    addCart(productId, qty = 1) {
      this.status.addCartLoading = productId;

      const order = {
        product_id: productId,
        qty,
      };

      this.$http
        .post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`, { data: order })
        .then(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            title: '成功加入購物車！',
          });
          this.status.addCartLoading = '';
        })
        .catch(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: '加入購物車失敗，請重新操作。',
          });
          this.status.addCartLoading = '';
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
