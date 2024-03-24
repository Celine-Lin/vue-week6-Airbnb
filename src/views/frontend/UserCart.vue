<template>
  <main class="container py-48">
    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        :disabled="cartData.total === 0"
        class="btn btn-outline-danger"
        type="button"
        @click="removeCart()">
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th width="10%"></th>
          <th width="40%">品名</th>
          <th width="20%">數量/單位</th>
          <th width="15%" class="text-end">單價</th>
          <th width="15%" class="text-end">總計</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="cart in cartData.carts" :key="cart.id">
            <!-- 刪除單筆購物車按鈕 -->
            <td>
            <button
              type="button"
              class="btn btn-outline-none btn-sm"
              :disabled="cart.id === status.removeCartItemLoading"
              @click="removeCartItem(cart.id)">
              <font-awesome-icon icon="fa-solid fa-spinner" spin-pulse
               v-if="cart.id === status.removeCartItemLoading" />
              <font-awesome-icon icon="x" v-else />
            </button>
            </td>
            <!-- 名稱 -->
            <td>{{ cart.product.title }}</td>
            <!-- 數量 -->
            <td>
              <div class="input-group input-group-sm" style="max-width: 200px; min-width: 120px;">
                <div class="input-group my-1">
                  <!-- 刪除該筆購物車 -->
                  <button
                    type="button"
                    class="input-group-text"
                    id="basic-addon2"
                    :disabled="cart.id === status.changeCartQtyLoading"
                    v-if="cart.qty === 1"
                    @click="removeCartItem(cart.id)">
                    <font-awesome-icon icon="trash-can" />
                  </button>
                  <!-- 數量 -1 -->
                  <button
                    type="button"
                    class="input-group-text"
                    id="basic-addon2"
                    :disabled="cart.id === status.changeCartQtyLoading"
                    v-else
                    @click="changeCartQty(cart, cart.qty-1)">
                    <font-awesome-icon icon="minus" />
                  </button>
                  <!-- 數量 文字 -->
                  <span class="form-control text-center">{{cart.qty}}</span>
                  <!-- 數量 +1 -->
                  <button
                    type="button"
                    class="input-group-text"
                    id="basic-addon2"
                    :disabled="cart.id === status.changeCartQtyLoading || cart.qty === 10"
                    @click="changeCartQty(cart, cart.qty+1)">
                    <font-awesome-icon icon="plus" />
                  </button>
                </div>
              </div>
            </td>
            <!-- 單價 -->
            <td class="text-end">{{ cart.product.price }}</td>
            <!-- 總計 -->
            <td class="text-end">
              <font-awesome-icon icon="fa-solid fa-spinner" spin-pulse
               v-if="cart.id === status.changeCartQtyLoading" />
              {{ cart.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end fw-bold">總金額</td>
          <td class="text-end fw-bold">{{ cartData.total }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- Form -->
    <div class="my-96 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors, resetForm }" @submit="onSubmit">
        <!-- Email -->
        <div class="mb-24">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="Email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['Email'] }"
            placeholder="請輸入 Email"
            rules="required|email"
            v-model="form.user.email" >
        </v-field>
          <error-message name="Email" class="invalid-feedback"></error-message>
        </div>
        <!-- Name -->
        <div class="mb-24">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            :rules="isName"
            v-model="form.user.name" >
          </v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <!-- Phone -->
        <div class="mb-24">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="isPhone"
            v-model="form.user.tel" >
          </v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>
        <!-- Address -->
        <div class="mb-24">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address" >
          </v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <!-- Message -->
        <div class="mb-24">
          <label for="message" class="form-label">留言</label>
          <v-field
            as="textarea"
            id="message"
            name="message"
            type="text"
            class="form-control"
            cols="30"
            rows="5"
            v-model="form.message" >
          </v-field>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
          <button type="button" class="btn btn-primary ms-2" @click="resetForm">重設</button>
        </div>
      </v-form>
    </div>
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
      // isLoading: true,
      products: [],
      tempProductOuter: {},
      cartData: [],
      status: {
        addCartLoading: '',
        changeCartQtyLoading: '',
        removeCartItemLoading: '',
      },
      // VeeValidate
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCarts() {
      this.$http
        .get(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: '很抱歉，目前無法讀取購物車內容。',
          });
        });
    },
    changeCartQty(item, qty = 1) {
      this.status.changeCartQtyLoading = item.id;
      const order = {
        product_id: item.product_id,
        qty,
      };
      this.$http
        .put(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`, { data: order })
        .then(() => {
          this.status.changeCartQtyLoading = '';
          this.getCarts();
        })
        .catch(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: '請重新操作。',
          });
        });
    },
    removeCartItem(id) {
      this.status.removeCartItemLoading = id;
      this.$http
        .delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${id}`)
        .then(() => {
          this.status.removeCartItemLoading = '';
          this.getCarts();
        });
    },
    removeCart() {
      this.$swal
        .fire({
          title: '確定要清除購物車所有內容？',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: '取消',
          confirmButtonText: '刪除',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http
              .delete(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`)
              .then(() => {
                this.$swal.fire({
                  icon: 'success',
                  title: '成功清除購物車！',
                });
                this.getCarts();
              })
              .catch(() => {
                this.$swal.fire({
                  icon: 'error',
                  title: '清除失敗，請重新操作。',
                });
              });
          }
        });
    },
    // 以下皆為 VeeValidate
    isName(value) {
      if (value.length === 0) return '姓名 為必填欄位';
      const nameRegex = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;
      if (!nameRegex.test(value)) return '姓名 不能包含特殊字元';
      // 最後必須為 return 開頭的寫法，不然會有問題
      return !(value.length < 3) || '姓名 不能小於3個字';
    },
    isPhone(value) {
      if (value.length === 0) return '電話 為必填欄位';
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) || '需要填寫正確的台灣手機號碼';
    },
    onSubmit() {
      if (this.cartData.carts.length === 0) {
        this.$swal.fire({
          title: '請先加入商品到購物車！',
          icon: 'warning',
        });
        return;
      }
      this.$http
        .post(`${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order`, { data: this.form })
        .then(() => {
          this.$refs.form.resetForm();
          this.getCarts();
          this.$swal.fire({
            icon: 'success',
            title: '訂單送出成功！',
          });
        })
        .catch(() => {
          this.$swal.fire({
            title: '訂單送出失敗，請重新操作。',
            icon: 'error',
          });
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
