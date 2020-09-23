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
import jquery from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false
Vue.use(require('regenerator-runtime/runtime'))
Vue.use(jquery)


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


