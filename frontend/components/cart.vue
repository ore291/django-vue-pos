<template>
<div class="main-section" id="cart">
		<div class="row">
			<div class="col-lg-12 pb-1">
				<h4 style="text-align:center; color:green">Cart Items [{{cartItems.length}}]</h4>
			</div>
			<div class="col-lg-12 pl-2 pt-1">
				<table class="table table-hover border bg-white">
				    <thead>
				      	<tr>
					        <th>Product</th>
					        <th>Price</th>
					        <th style="width:10%;">Quantity</th>
					        <th>Subtotal</th>
					        <th>Action</th>
				      	</tr>
				    </thead>
				    <tbody>
				      	<tr v-for="(product, index ) in cartItems" :key="index">
					        <td>
					        	<div class="row">
									<div class="col-lg-10">
										<h6>{{product.name.toUpperCase()}}</h6>
									</div>
								</div>
					        </td>
					        <td> ₦{{product.price}}</td>
					        <td data-th="Quantity">
								<input type="number" class="form-control text-center"
								v-model.number="product.quantity"
								@change="changeQuantity(product.id, product.quantity)" 
								step="1"
								min="1"
								max="99"
								>
							</td>
							<td>₦{{product.price * product.quantity}}</td>
					        <td class="actions" data-th="" style="width:10%;">
								<button @click.prevent="removeFromCart(index)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>								
							</td>
				      	</tr>
				    </tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
	name: 'Cart',
    data (){
        return {
          
        }
	},
    methods: {
        removeFromCart(index){
			this.$store.dispatch('cart/removeFromCart', index )
		},
		changeQuantity(index, quantity){
			this.$store.dispatch('cart/changeQuantity', {index, quantity} )
		}
    },
   computed: {
	   ...mapGetters({
		   cart : 'cart/cartIds',
		   products: 'products/products'
	   }),
      cartItems () {
        return this.cart.map(({id, quantity}) => {
        const product = this.products.find(p => p.id === id)

        return {
			id: product.id,
          name: product.name,
          price: product.price,
          quantity
        }
      })
	},
	
   }
}
</script>

<style>
#cart{
	background-color: #f5f5f5;
}

#cart.main-section{
	font-family: 'Roboto Condensed', sans-serif;
	margin-top:20px;
}

.table td, .table th {
    padding: .75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
}
</style>>


