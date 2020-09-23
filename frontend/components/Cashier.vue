<template>
  <div class="content-wrapper">
    <section class="content">
      <div class="row">
        <div class="col-md-8">
          <div class="box box-success">
            <div class="box-header with-border">
              <h1 class="bordercool mt-3">Point Of Sale</h1>
              <autocomplete
                :source="products"
                input-class="form-control"
                @selected="getObject"
                @input="addTocart"
                ref="autocomplete"
                :results-display="formattedDisplay"
              >
              </autocomplete>
            </div>
            <!--./ box header-->
            <div class="box-body">
              <!-- <div class="box-body table-responsive no-padding"> -->
              <Cart />
              <!-- </div> -->
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col-md-8 -->
        <div class="col-md-4 mt-3">
          <div class="box box-danger">
            <div class="box-header with-border">
              <button
                @click.prevent="clearCart"
                type="submit"
                class="btn btn-outline-danger mb-4"
                id="btncancel"
              >
                <i class="fa fa-remove"></i> Reset / clear cart
              </button>
            </div>
            <!--./ box header-->
            <div class="box-body">
              <div class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Trans. Id </label>
                    <div class="col-sm-9">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          id="txtidsales"
                          :value="trans_id"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3">Date</label>
                    <div class="col-sm-9">
                      <input
                        readonly=""
                        type="text"
                        class="form-control"
                        id="txtsalesdate"
                        :value="date"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Cashier</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        id="txtchasiername"
                        :value="username"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h4 style="color: red">Amount Due</h4>
              <div class="info-box" style="margin-top: 10px">
                <span class="info-box-icon bg-yellow">₦</span>
                <div class="info-box-content">
                  <h1 class="info-box-number newbox" id="txttotal">
                    {{ total }}
                  </h1>
                </div>
                <!-- /.info-box-content -->
              </div>
              <div class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <div class="input-group m-2">
                      <div class="col-sm-9">
                        <span class="input-group-addon">
                          <input
                            type="radio"
                            v-model="payMode"
                            :name="0"
                            id="paymodel"
                            value="a"
                          />
                          Cash Payment
                        </span>
                        <span class="input-group-addon ml-2">
                          <input
                            type="radio"
                            v-model="payMode"
                            :name="1"
                            id="paymodel"
                            value="b"
                          />
                          Card Payment
                        </span>
                      </div>
                    </div>
                    <label class="col-sm-12" control-label="">
                      <button
                        class="btn btn-primary btn-success btn-block btnpayment"
                        id="btnpayment"
                        :disabled="isDisabled"
                        @click="postOrder"
                      >
                        <span class="glyphicon glyphicon-shopping-cart"></span
                        >[F9] Proccess Payment
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col-md-4 -->
      </div>

      <!-- /.row -->
    </section>
    <!-- /.content -->

    <div
      class="modal fade"
      id="ReceiptModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Receipt Demo</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ReceiptView
              :total="total"
              :trans_id="trans_id"
              :date="date"
              :receiptItems="receiptItems"
              :paymentMode="payMode"
            />
          </div>
          <div class="modal-footer">
            <button
              @click="clearCart"
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
            >
              PRINT RECEIPT
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.content -->
  </div>
</template>

<script>
import Autocomplete from "vuejs-auto-complete";
import Cart from "./cart.vue";
import { mapGetters, mapActions } from "vuex";
import api from "../services/api";
import ReceiptView from "./ReceiptView.vue";

export default {
  name: "Cashier",
  data() {
    return {
      cartItem: null,
      trans_id: null,
      payMode: 'a',
    };
  },
  components: {
    Autocomplete,
    Cart,
    ReceiptView,
  },
  methods: {
    postOrder() {
      var data = {
        product_ids: this.product_ids,
        total_price: this.total,
        payment_mode: this.payMode
      };
      const payload = JSON.stringify(data);
      api
        .post(`order/`, payload)
        .then((res) => {
          this.trans_id = res.data;
        })
        .then($("#ReceiptModal").modal("show"))
        .then((res) => {
          this.$store.dispatch("transaction/getTransactions");
        })
        .catch((err) => console.log(err));
    },
    getObject(group) {
      this.cartItem = group.selectedObject.id;

      // access the autocomplete component methods from the parent
      this.$refs.autocomplete.clear();
    },
    clearCart() {
      this.$store.dispatch("cart/clearCart");
    },

    addTocart(result) {
      this.$store.dispatch("cart/addToCart", this.cartItem);
      this.showAlert();
    },
    formattedDisplay(result) {
      return "#" + result.id + " |     " + result.name.toUpperCase();
    },
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Added to Cart",
      });
    },
  },
  computed: {
    ...mapGetters({
      products: "products/products",
      username: "transaction/username",
      product_ids: "cart/cartIds",
      cartItemsTotal: "cart/cartItemsTotal"
    }),
    date() {
      return this.$moment().format("Do MMM, YYYY");
    },
    total() {
      return this.cartItemsTotal.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
    isDisabled() {
      return this.product_ids.length < 1;
    },
    receiptItems() {
      return this.product_ids.map(({ id, quantity }) => {
        const product = this.products.find((p) => p.id === id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        };
      });
    },
  },
};
</script>

<style>
#txtidsales {
  flex: none;
}
#app
  > div
  > div
  > section
  > div
  > div.col-md-4.mt-3
  > div
  > div.box-body
  > div.info-box {
  width: 85%;
}

#btnpayment {
  width: 85%;
}
</style>