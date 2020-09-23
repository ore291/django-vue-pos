<template>
    <div>
    <div id="invoice-POS">
    
    <center id="top">
      <div class="logo"></div>
      <div class="info"> 
        <h2>KnightStores Inc</h2>
      </div><!--End Info-->
    </center><!--End InvoiceTop-->
    
    <div id="mid">
      <div class="info">
		<small>Date: <b>{{date}} </b></small>
		<small>Transaction id: <b> {{transID}}</b></small>
		<small>Payment Method: <b> {{payType}}</b></small>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

					<div id="table ">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>Item</h2></td>
								<td class="Hours"><h2>Qty</h2></td>
								<td class="Rate"><h2>Sub Total</h2></td>
							</tr>

							<tr class="service" v-for="item in receiptItems" :key="item.id">
								<td class="tableitem"><p class="itemtext">{{item.name}}</p></td>
								<td class="tableitem" ><p class="itemtext" style="color:red">{{item.quantity}}</p></td>
								<td class="tableitem"><p class="itemtext"> ₦{{item.price * item.quantity}}</p></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>VAT.</h2></td>
								<td class="payment"><h2> ₦0</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2> ₦{{totalPrice}}</h2></td>
							</tr>

						</table>
					</div><!--End Table-->

					<div id="legalcopy">
						<p class="legal"><strong>Thank you for your business!</strong> </p>
					</div>
					

				</div><!--End InvoiceBot-->
  </div><!--End Invoice-->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
	export default {
		name: "ReceiptView",
		data() {
			return {
				choices: 
					{'a' : 'Cash', 
					'b' : 'Card'},
					
			};
		},
		props: 
			['total', 'trans_id', 'date', 'receiptItems', 'paymentMode'],
		methods: {
	
		},
		computed: {
			...mapGetters({
				cart: 'cart/cartIds',
				products: 'products/products'
			}),
			// receiptItems () {
			// 	return this.cart.map(({id, quantity}) => {
			// 	const product = this.products.find(p => p.id === id)

			// 	return {
			// 		id: product.id,
			// 		name: product.name,
			// 		price: product.price,
			// 		quantity
			// 	}
			// })
			// },

			totalPrice(){
				return this.total
			},
			transID(){
				return this.trans_id
			},
			payType(){
				return this.choices[this.paymentMode]
			}
		}
		
	};
</script>

<style scoped>
#invoice-POS {
	 box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
	 padding: 2mm;
	 margin: 30px  auto;
	 width: 44mm;
	 background: #fff;
}
 #invoice-POS ::selection {
	 background: #f31544;
	 color: #fff;
}
 #invoice-POS ::moz-selection {
	 background: #f31544;
	 color: #fff;
}
 #invoice-POS h1 {
	 font-size: 1.5em;
	 color: #222;
}
 #invoice-POS h2 {
	 font-size: 1.3em;
}
 #invoice-POS h3 {
	 font-size: 1.2em;
	 font-weight: 300;
	 line-height: 2em;
}
 #invoice-POS p {
	 font-size: 0.7em;
	 color: #666;
	 line-height: 1.2em;
}
 #invoice-POS #top, #invoice-POS #mid, #invoice-POS #bot {
	/* Targets all id with 'col-' */
	 border-bottom: 1px solid #eee;
}
 #invoice-POS #top {
	 min-height: 100px;
}
 #invoice-POS #mid {
	 min-height: 80px;
}
 #invoice-POS #bot {
	 min-height: 50px;
}
 #invoice-POS #top .logo {
	 height: 60px;
	 width: 60px;
	 background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
	 background-size: 60px 60px;
}
 #invoice-POS .clientlogo {
	 float: left;
	 height: 60px;
	 width: 60px;
	 background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
	 background-size: 60px 60px;
	 border-radius: 50px;
}
 #invoice-POS .info {
	 display: block;
	 margin-left: 0;
}
 #invoice-POS .title {
	 float: right;
}
 #invoice-POS .title p {
	 text-align: right;
}
 #invoice-POS table {
	 width: 100%;
	 border-collapse: collapse;
}
 #invoice-POS .tabletitle {
	 font-size: 0.5em;
	 background: #eee;
}
 #invoice-POS .service {
	 border-bottom: 1px solid #eee;
}
 #invoice-POS .item {
	 width: 24mm;
}
 #invoice-POS .itemtext {
	 font-size: 0.7em;
}
 #invoice-POS #legalcopy {
	 margin-top: 5mm;
}
 

	@media print {
    .hidden-print,
    .hidden-print * {
        display: none !important;
    }
    body * {
    visibility: hidden;
  }
  #invoice-POS, #invoice-POS * {
    visibility: visible;
  }
  #invoice-POS {
    position: absolute;
    left: 0;
    top: 0;
  }
	}
</style>