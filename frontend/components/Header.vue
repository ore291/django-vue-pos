<template>
<nav class="main-header navbar navbar-expand navbar-white navbar-light layout-navbar-fixed">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/" class="nav-link">Dashboard</router-link>
      </li>
    </ul>

    <h2 id="header">KNIGHT POS</h2>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <i class=" nav-icon fas fa-user"></i>
      <span class="mx-1">{{userName}}</span>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Header',
  computed: {
      ...mapGetters({
      userName : 'transaction/username'
    })
  },
}
</script>

<style>
#header{
  margin: auto;
  font-weight: bolder;
  color: turquoise;
}
</style>