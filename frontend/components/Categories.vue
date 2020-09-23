<template>
  <div class="content-wrapper">
      <section class="content">
        <div class="card-header bg-primary text-white">
                <i class="fa fa-table"></i>
                Product Categories
                <a href="#" class="text-white" data-toggle="modal" data-target="#brandModal">
                  <span class="float-right">
                    <i class="fa fa-plus"></i>
                    Add New Brand
                  </span>
                </a>
        </div>
        <div id='categoryTable' >
            <data-table v-bind="bindings"/>
        </div>
     <div class="modal fade" id="brandModal" tabindex="-1" role="dialog" aria-labelledby="brandModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <form @submit.prevent="handleSubmit(addCategory)">
                <ValidationProvider name="category" vid="title" rules="required" v-slot="{ errors }">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Category Name</label>
                  <input v-model="productName" type="text" class="form-control" id="exampleFormControlInput1" placeholder="e.g xiaomi phones ">
                </div>
               
                <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button  type="submit" class="btn btn-primary">Save</button>
                </div>
                </form>
              </ValidationObserver>
            </div>
            </div>
        </div>
        </div>
      </section>
      <!-- /.content -->
      </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Categories',
  data (){
    return {
      productName: null
    }
  },
  methods: {
    async addCategory(){
      const payload = this.productName;
      this.$store.dispatch('category/addCategories', payload)
      .then(res => {
        console.log(res)
        if(res.status_code === 400){
            this.$refs.form.setErrors(res.errors);
        }else{
          this.$store.dispatch('category/getCategories')
          $('#brandModal').modal('hide');
          this.productName = null;
          this.showAlert()
          
        }})   
    },
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Product category created successfully'
      })
  }
  },
  computed: {
     ...mapGetters({
      categories: "category/categoriesList"
    }),
  bindings() {
          return {
              columns: [{
                key: 'id',
                title: 'Id'
              },{
                key: 'title',
                title: 'Category'
              },],
                data: this.categories,
                showDownloadButton: false, tableClass: 'table table-striped mt-2',
                actionMode: 'single',
                actions: ['delete']
                ,tableClass: 'table table-striped table-bordered mt-2',
                /* other props...*/
            }
      },
    },
   
}
</script>

<style >
#categoryTable 
    .table{
      width: 420px;
    }
    .action-column{
      width: 10%;
    }
    #categoryTable.form-control{
    display: inline-block;
    width: auto;
    margin: 5px;
  } 
#categoryTable .btn-outline-primary{
    margin-right: 3px;
  }
.card-header {
    padding: 0.75rem 1.25rem;
    margin-top: 10px;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
 }
#categoryTable{
  padding: auto;
  margin: 10px 10px;  
}
#categoryTable > div > div.table-footer > div.pagination-container > div > input{
  width: auto;
}
#categoryTable > div > div.table-footer > div.pagination-container > div {
  display: inline-flex;
  padding: 3px;
}
</style>>

