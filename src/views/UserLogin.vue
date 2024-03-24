<template>
  <main class="container bg-transparent">
    <div
      class="card mt-96 mx-auto"
      style="width: 500px;">
      <div class="card-body p-5">
        <h5 class="h3 card-title text-center py-16">登入</h5>
        <form id="form" class="d-flex flex-column" @submit.prevent="login">
          <div class="mb-12">
            <label for="useremail" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="useremail"
              v-model="user.username"
              autocomplete="username"
              required>
          </div>
          <div class="mb-12">
            <label for="userspassword" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="userspassword"
              v-model="user.password"
              autocomplete="current-password"
              required>
          </div>
          <button
            type="submit"
            class="btn btn-primary my-20 px-4">
            登入
          </button>
        </form>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-secondary">
          <RouterLink class="text-white" to="/">返回首頁</RouterLink>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
const { VITE_APP_API_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${VITE_APP_API_URL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
          this.$swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            title: '歡迎回來',
          });
          // 跳轉頁面
          this.$router.push('/admin/products');
        });
    },
  },
};
</script>
