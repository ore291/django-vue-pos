<template>
    <div id="app" class="layout-navbar-fixed">
       <Header/>
       <Sidebar/>
        <div v-if="loading"  class="d-flex justify-content-center">
            <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else class="container-fluid">
            <router-view/>
        </div>
       <Footer/>  
    </div>
   
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'app',
    async created() {
        this.loading = true;
        await this.getUserName();
        await this.getProducts();
        await this.getCategories();
        await this.getTransactions();
        this.loading = false; 
    },
    data () {
        return {
            loading: false
        }
    },
    components: {
      Header,
      Sidebar,
      Footer,
    },
    methods:{
        getProducts(){
            this.$store.dispatch('products/getProducts');
            },
        getCategories(){
            this.$store.dispatch('category/getCategories')
        },
        getUserName(){
            this.$store.dispatch('transaction/getUserName');
        },
        getTransactions(){
            this.$store.dispatch('transaction/getTransactions')
        }
    },
    computed: {
        
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    
}


.layout-fixed .main-sidebar {
    bottom: 0;    
    left: 0;
    position: fixed;
    top: 0;
    width: auto;
    overflow-y: hidden;
}
</style>
