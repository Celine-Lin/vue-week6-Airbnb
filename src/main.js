import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import Loading from 'vue-loading-overlay';

// Font Awsome (part.1/2)
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// VeeValidate
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// Font Awsome
library.add(fas, far);

// VeeValidate
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VueLoading', Loading);
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.use(VueSweetalert2);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.mount('#app');
