<template>
  <div id="home">
    <div class="container" style="z-index: 1;">
      <nav class="nav justify-content-between align-items-center py-8">
        <RouterLink class="nav-link text-secondary" to="/">首頁</RouterLink>
        <RouterLink class="nav-link text-secondary" to="/user/products">產品</RouterLink>
        <RouterLink class="nav-link text-secondary" to="/user/about">關於我們</RouterLink>
        <nav class="d-flex justify-content-between align-items-center">
          <RouterLink class="nav-link text-secondary" to="/login" v-if="token === ''">
            <font-awesome-icon icon="user" />
          </RouterLink>
          <button class="btn nav-link text-secondary d-none">登出</button>
          <RouterLink class="nav-link text-secondary" to="/user/cart">
            <font-awesome-icon icon="cart-shopping" />
          </RouterLink>
          <button class="nav-link text-secondary btn" @click="checkLogin()">進入後台</button>
        </nav>
      </nav>
    </div>
    <main
      class="w-full min-vh-100 fixed-top
      d-flex flex-column align-items-center justify-content-center"
      style="
        z-index: -1;
        background-size: cover;
        background-position: center;
        background-image:
        linear-gradient(to bottom,rgb(0 0 0 / 50%),rgb(0 0 0 / 0%)),
        linear-gradient(to top,rgb(0 0 0 / 50%),rgb(0 0 0 / 0%)),
        url('https://images.unsplash.com/photo-1603786420263-ad59136a7409?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
      >
      <h1 class="text-secondary">Celine's Choice</h1>
      <h5 class="text-secondary"> - 藝術品鑑賞與收藏 - </h5>
    </main>
  </div>
  <RouterView />
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>

<script>
const { VITE_APP_API_URL } = import.meta.env;
export default {
  data() {
    return {
      token: '',
    };
  },
  methods: {
    checkLogin() {
      if (this.token === '') {
        this.$swal.fire({
          showConfirmButton: false,
          timer: 1500,
          icon: 'error',
          title: '請先登入',
        });
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
        return;
      }
      this.$http
        .post(`${VITE_APP_API_URL}/api/user/check`)
        .then(() => {
          this.$router.push('/admin/products');
        })
        .catch(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: '身份驗證有誤，請重新登入',
          });
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = this.token;
  },
};
</script>
