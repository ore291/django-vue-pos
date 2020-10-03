import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import DataTable from '@andresouzaabreu/vue-data-table'
import '@andresouzaabreu/vue-data-table/dist/DataTable.css'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate'
import regeneratorRuntime from 'regenerator-runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import "~admin-lte/dist/css/adminLTE.css";
import "~admin-lte/dist/css/skins/_all-skins.css";

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false
Vue.use(require('regenerator-runtime/runtime'))



Vue.component("data-table", DataTable)
 
Vue.use(VueSweetalert2);

Vue.use(require('vue-moment'));






// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


