<template>
   <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="#" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">KNIGHT STORES</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/img/avatar.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{userName}}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item ">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                DASHBOARD
                <!-- <i class="right fas fa-angle-left"></i> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item ">
            <router-link to="pos" class="nav-link">
              <i class="nav-icon fas fa-cash-register"></i>
              <p>
                CASHIER POS
                <!-- <i class="right fas fa-angle-left"></i> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="categories" class="nav-link">
              <i class=" nav-icon fas fa-object-group"></i>
              <p>
                PRODUCT BRANDS
                <!-- <span class="right badge badge-danger">New</span> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="products" class="nav-link">
              <i class="nav-icon fas fa-boxes"></i>
              <p>
                PRODUCT LIST
                <!-- <span class="right badge badge-danger">New</span> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item ">
            <router-link to="transaction" class="nav-link">
              <i class="nav-icon fas fa-cogs"></i>
              <p>
                TRANSACTIONS
                <!-- <i class="right fas fa-angle-left"></i> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="logout/" class="nav-link">
              <i class="nav-icon fa fa-power-off"></i>
              <p>
                Logout
                <!-- <span class="right badge badge-danger">New</span> -->
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      userName : 'transaction/username'
    })
  }
}
</script>

<style>
.router-link-exact-active{
  background-color:turquoise;
  color: white !important;
}
</style>