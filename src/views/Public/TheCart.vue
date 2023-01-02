<template>
    <div>
        <h1 class="font-semibold max-w-5xl px-2 mx-auto text-3xl pt-10">Shoppping Cart </h1>
        <div v-if="carts.length !== 0" class="max-w-6xl mx-auto  grid grid-cols-1 lg:grid-cols-4">
            <div class=" col-span-3 p-5 ">
                <div v-for="product in carts" :key="product.id"
                     class="flex justify-between gap-3 mb-3 items-center rounded-lg flex-col lg:flex-row border p-5 shadow-md hover:shadow-lg">
                    <div>
                        <img class="w-[250px] h-[100%] object-cover" :src="product.featured_image" alt="">
                    </div>
                    <div>
                        <h4 class="text-md w-[200px] truncate font-medium">{{ product.title }}</h4>
                    </div>
                    <div class="flex flex-row lg:flex-col gap-5">
                        <div>
                            <label for="qty" class="mr-2 text-xl text-gray-500">Qty</label>
                            <input id="qty" @change="updateQuantityLocal($event,product.id)" :value="product.quantity"
                                   class="w-[60px] border p-2" type="number">
                        </div>
                        <div>
                            <h3 @click="removeProduct(product.id)"
                                class="text-lg cursor-pointer inline-block hover:underline hover:text-secondary mt-2">
                                Remove</h3>
                        </div>
                    </div>
                    <div>
                        <h5 class="text-lg font-medium">$ {{ product.cost }}</h5>
                    </div>
                </div>
            </div>
            <div class="bg-primary rounded shadow-md hover:shadow-lg lg:w-full  m-5 h-[300px] ">
                <div class="flex justify-between mx-4 py-4 border-gray-500 border-b border-b-2 ">
                    <h1 class="text-gray-600 ">Subtotal </h1>
                    <h1 class="font-medium text-lg "> {{ formatNum(productTotalCost) }} <span class="text-xs">MMK</span> </h1>
                </div>
                <div class="flex justify-between mx-4 py-4 border-gray-500 border-b border-b-2 ">
                    <h1 class="text-gray-600 ">Shipping </h1>
                    <h1 class="font-medium text-lg "> {{ formatNum(shipping) }} <span class="text-xs">MMK</span> </h1>
                </div>
                <div class="flex justify-between mx-4 py-4 border-gray-500 border-b border-b-2 ">
                    <h1 class="text-gray-600 ">Tax </h1>
                    <h1 class="font-medium text-lg ">  {{ formatNum(tax) }} <span class="text-xs">MMK</span> </h1>
                </div>
                <div class="flex text-2xl justify-between mx-4 py-4  ">
                    <h1 class="text-gray-600 ">Total </h1>
                    <h1 class="font-medium  ">  {{ formatNum(totalCost) }} <span class="text-xs">MMK</span> </h1>
                </div>
                <div class="text-center ">
                    <router-link v-if="token === null" class="py-3   " :to="{name: 'login'}">
                        <button class="w-[90%] ">Login to Checkout</button>
                    </router-link>
                    <button  :class="{'bg-yellow-500 cursor-not-allowed ' : isLoading}"  @click="checkout" v-else class="py-2 justify-center  w-[100%] flex ">
                        <div v-if="isLoading"  role="status">
                            <svg class="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl text-gray-600 py-3">There is no products in cart!</h1>
            <button>
                <router-link :to="{name: 'shop'}">Shop Now</router-link>
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import axios from "axios";

export default {
    name: "TheCart",
    data() {
        return {
            isLoading: false,
        }
    },
    computed: {
        ...mapState(['carts', 'url', 'totalCost', 'productTotalCost', 'tax', 'shipping', 'token']),
    },
    methods: {
        ...mapActions(['updateQuantity', 'removeFromCart','showAlert','setCarts','clearCart']),
        ...mapMutations(['calculateProductCost']),
        formatNum (num){
            return new Intl.NumberFormat('en-US').format(num);
        },
        updateQuantityLocal(event, productId) {
            this.updateQuantity([event.target.value, productId]);
        },
        removeProduct(productId) {
            this.removeFromCart(productId);
        },
        checkout() {
            let formData = new FormData();
            formData.append('products' , JSON.stringify(this.carts));
            formData.append('totalPrice' , this.totalCost);
            formData.append('tax', this.tax);
            formData.append('productTotalCost', this.productTotalCost);
            formData.append('shipping' , this.shipping);
            this.isLoading = true;
            axios.post(this.url + 'checkout',formData)
            .then(res => {
                this.showAlert(['Success',res.data.message,'success']);
                this.clearCart();
                this.isLoading =false;
            })
            .catch(e => {
                this.showAlert(['Error',e.response.data.message,'error']);
                this.isLoading = false;
            })
        }
    },
    mounted() {
        this.calculateProductCost();
    }
}
</script>

<style scoped>

</style>
