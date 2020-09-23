<template>
  <footer class="main-footer navbar-fixed-bottom">
    <div class="float-right d-none d-sm-block">
      <b>Version</b> 1.0.0
    </div>
    <strong>Copyright &copy; 2020- <a href="#">Orexknight</a>.</strong> All rights
    reserved.
    <a class="scroll-to-top rounded" href="#" style="display: inline;">
        <i class="fa fa-angle-up"></i>
    </a>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
.scroll-to-top {
  position: fixed;
  right: 15px;
  bottom: 15px;
  display: none;
  width: 50px;
  height: 50px;
  text-align: center;
  color: #fff;
  background: #00a63f;
  line-height: 46px;
}

.scroll-to-top:focus, .scroll-to-top:hover {
  color: white;
}

.scroll-to-top:hover {
  background: #00a63f;
}

.scroll-to-top i {
  font-weight: 800;
}

</style>