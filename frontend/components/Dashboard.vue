<template>
  <div class="content-wrapper">
      <section class="content">
        <div class="container-fluid">
          <!-- Small boxes (Stat box) -->
          <h1 class="mt-2 text-dark">Dashboard</h1>
          <div class="row mt-3">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{transactions.length}}</h3>

                <p>Total Orders</p>
              </div>
              <div class="icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <router-link to="transaction" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>53<sup style="font-size: 20px">%</sup></h3>

                <p>Total Revenue</p>
              </div>
              <div class="icon">
                <i class="fas fa-chart-pie"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{products.length}}</h3>

                <p>Total Products</p>
              </div>
              <div class="icon">
                <i class="nav-icon fas fa-boxes"></i>
              </div>
              <router-link to="products" class="small-box-footer">More info <i class="fas fa-arrow-circle-right">
                </i></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{categories.length}}</h3>

                <p>Total Categories</p>
              </div>
              <div class="icon">
                <i class=" nav-icon fas fa-object-group"></i>
              </div>
              <router-link to="categories" class="small-box-footer">More info <i class="fas fa-arrow-circle-right">
                </i></router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <div class="container">
          <div v-if="loading"  class="d-flex justify-content-center">
            <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else-if="!loading">
            <line-chart :chartData="chartData" :options="options"></line-chart>
          </div>
        </div>
          <!-- /.row (main row) -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
      </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import lineChart from './chart.vue'


export default {
  name: 'Dashboard',
  mounted(){
    this.fillData();
    
  },
  data() {
    return {
      loading: false,
      chartData: null,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
  },
  components: {
    lineChart
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.dates,
        datasets: [
            {
              label: 'Earnings per Sale chart',
              data: this.totals,
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
      }
      this.loading = false;
    }
  },
  computed:{
    ...mapGetters({
      transactions : 'transaction/transactions',
      products : 'products/products',
      categories : 'category/categoriesList'
    }),
    dates(){
      return this.$store.state.transaction.transactions.map(
        a => this.$moment(a.date).format('DD-MMM-YY')
      )
    },
    totals(){
      return this.transactions.map(
        b => b.total_price
      )
    }
  }
}
</script>

<style>

</style>