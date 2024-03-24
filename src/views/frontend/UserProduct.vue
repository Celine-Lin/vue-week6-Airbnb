<template>
  <main>
    <article class="py-96">
      <p>  -下次排程：產品頁 Layout- </p>
      <h4>{{ product.title }}</h4>
      <img
      class="object-fit-cover"
      style="width: 400px; height: 400px;"
      :src="product.imageUrl"
      :alt="`${product.title}圖片`">
    </article>
  </main>
</template>

<script>
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env;
export default {
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.$http
      .get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${id}`)
      .then((res) => {
        this.product = res.data.product;
      })
      .catch(() => {
        this.$swal.fire({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
          icon: 'error',
          title: '目前無法取得產品資料',
        });
      });
  },
};
</script>
