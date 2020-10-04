<template>
  <div class="content-wrapper">
    <section class="content">
      <div class="card mb-3">
        <div class="card-header bg-primary text-white">
          <i class="fa fa-table"></i>
          Products
          <a
            href="#"
            class="text-white"
            data-toggle="modal"
            data-target="#addProductModal"
          >
            <span class="float-right">
              <i class="fa fa-plus"></i>
              Add New Product
            </span>
          </a>
        </div>
      </div>
      <div id="producttable" class="mx-1 mt-3">
        <data-table v-bind="bindings" />
      </div>
      <div
        class="modal fade"
        id="addProductModal"
        tabindex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProductModalLabel">ADD PRODUCT</h5>
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
              <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                <form @submit.prevent="handleSubmit(addProduct)" ref="productForm">
                  <ValidationProvider name="name" vid="name" rules="required|max_value:200" v-slot="{ errors }">
                    <div class="form-group">
                    <label for="name">Product Name</label>
                    <input class="form-control" v-model="name" type="text">
                    <br>
                    <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="Product category" vid="category" rules="required" v-slot="{ errors }">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1"
                      >Product Category</label
                    >
                    <select
                      v-model="productCategory"
                      class="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                        >{{ category.title }}</option
                      >
                    </select>
                    <br>
                    <span>{{ errors[0] }}</span>
                  </div>
                  </ValidationProvider> 
                  <div class="form-row">
                    <ValidationProvider name="Price" vid="price" rules="required" v-slot="{ errors }">
                      <div class="col">
                        <label for="price">Price:</label>
                        <input
                          v-model="price"
                          id="price"
                          type="number"
                          class="form-control"
                          placeholder="enter price"
                        />
                        <br>
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="quantity" vid="quantity" rules="required" v-slot="{ errors }">
                      <div class="col">
                        <label for="quantity">Quantity:</label>
                        <input
                          v-model="quantity"
                          id="quantity"
                          type="number"
                          class="form-control"
                          placeholder="enter quantity"
                        />
                      </div>
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                  <ValidationProvider name="Description" vid="description" rules="required|max_value:200" v-slot="{ errors }">
                <div class="form-group">
                  <label for="exampleFormControlTextarea1"
                    >Product Description</label
                  >
                  <input
                    v-model="description"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="2"
                  />
                </div>
                <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    class="btn btn-primary"
                  >
                   
                </div>
                </form>
              </ValidationObserver>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  data() {
    return {
      name: null,
      productCategory: null,
      price: null,
      quantity: null,
      description: null,
      submitted: false,
    };
  },
  computed: {
    ...mapGetters({
      products: "products/products",
      errors: 'products/errors',
      categories: "category/categoriesList",
    }),
    productNames(){
      return this.products.map(a => a.name)
    },
    bindings() {
      return {
        columns: [
          {
            key: "id",
            title: "id",
            searchable: true,
          },
          {
            key: "name",
            title: "Name",
          },
          {
            key: "category",
            title: "Category",
            sortable: true,
          },
          {
            key: "description",
            title: "Description",
          },
          {
            key: "price",
            title: "Price",
          },
          {
            key: "quantity",
            title: "Stock",
          },
        ],
        data: this.products,
        showDownloadButton: false,
        tableClass: "table table-striped table-bordered mt-2",

        /* other props...*/
      };
    },
  },
  components: {},
  methods: {
    addProduct() {
      const payload = {
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        category: this.productCategory,
        description: this.description,
      };
     this.$store.dispatch("products/addProduct", payload)
      .then((res) => {
        if(res.status_code === 400){
            this.$refs.observer.setErrors(res.errors);
        }else{
          this.showAlert()
          $('#addProductModal').modal('hide');
          this.resetForm();
          this.$store.dispatch("products/getProducts")
        }
      })
    },
    resetForm(){
        this.name = '';
        this.price = '';
        this.quantity = '';
        this.productCategory = null;
        this.description = '';
    },
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Product created successfully",
      });
    },
  },
};
</script>
<style>
#producttable > div > div.table-footer > div.pagination-container > div > input{
  width: auto;
}
#producttable .btn-outline-primary {
  margin-right: 3px;
}
.table td,
.table th {
  padding: 0.5rem;
  width: auto;
}
.modalbody span{
  color: red;
}
#producttable > div > div.table-footer > div.pagination-container > div {
  display: inline-flex;
  padding: 3px;
}
</style>
