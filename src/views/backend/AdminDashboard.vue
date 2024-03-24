<template>
  <div class="container text-center">
    <h2 class="pt-5">你現在在後台頁</h2>
    <nav class="nav justify-content-center align-items-center py-3">
      <RouterLink class="nav-link" to="/admin/products">產品管理</RouterLink>｜
      <RouterLink class="nav-link" to="/admin/orders">訂單管理</RouterLink>
      <button class="btn btn-light">
        <RouterLink to="/">返回前台</RouterLink>
      </button>
    </nav>
    <RouterView />
  </div>
</template>

