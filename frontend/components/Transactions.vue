<template>
  <div class="content-wrapper">
    <section class="content">
      <div class="card mb-3">
        <div class="card-header bg-primary text-white">
          <i class="fa fa-table"></i>
          Transactions
        </div>
      </div>
      <div id='transactionstable' class=" mx-1 mt-3">
        <data-table v-bind="bindings" @actionTriggered="handleAction"/>
      </div>
      <div class="modal fade" id="receiptModal" tabindex="-1" role="dialog" aria-labelledby="receiptModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">RECEIPT</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">      
              <receipt-view :total="total" :trans_id="trans_id" :date="date" :receiptItems="product_ids" />
            </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import receiptView from './ReceiptView.vue';
  
  export default {
    name: "Transactions",
    data() {
      return {
        trans_id: null,
        total: null,
        date: null,
        product_ids: null
      };
    },
    components:{
      receiptView
    },
    methods: {
      async handleAction(actionName, data){
        switch(actionName) {
          case "view":
            console.log(data);
            await this.setReceiptItems(data);
                  $('#receiptModal').modal('show');
                  break
        }
      },
      setReceiptItems(data){
        this.trans_id = data.trans_id;
        this.date = data.date;
        this.total = data.total_price;
        this.product_ids = this.receiptItems(data.data_source);
      },
      receiptItems (product_ids) {
				return product_ids.map(({product, quantity}) => {
				const productStuff = this.products.find(p => p.id === product)

				return {
					id: productStuff.id,
					name: productStuff.name,
					price: productStuff.price,
					quantity
				}
      })
    },
    },
    computed: {
      ...mapGetters({
        transactions: "transaction/transactions",
        products: "products/products"
      }),
      bindings() {
            return {
                columns: [
                  {
                    key: 'trans_id',
                    title: 'Receipt id',
                    searchable: true,
                    sortable: true
                  },
                  {
                    key: 'date',
                    title: 'Date',
                    sortable: true
                  },
                  {
                    key: 'total_price',
                    title: 'Total price'
                  },
                  {
                    key: 'payMode',
                    title: 'Payment Type'
                  }
        ],
                data: this.transactions,
                showDownloadButton: false, tableClass: 'table table-striped table-bordered mt-2',
                  actionMode: 'single',
                  actions: ['view'],
                  text: {
                    actionsText: {
                      "*": "Receipts"
                    }
                  }
                
            }
        }
    },
  };
</script>

<style >
#transactionstable > div > div.table-footer > div.pagination-container > div > input{
  width: auto;
}
#transactionstable > div > div.table-footer > div.pagination-container > div {
  display: inline-flex;
  padding: 3px;
}

#transactionstable.table td, .table th {
    padding: 0.5rem;
    width: auto;
}
</style>