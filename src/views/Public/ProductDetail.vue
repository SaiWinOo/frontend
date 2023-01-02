<template>
     <div>
         <div class="max-w-6xl mx-auto ">
             <router-link class="text-secondary text-3xl" :to="{name: 'shop'}"><i class="bi bi-arrow-left"></i>Go back</router-link>
         </div>
         <div v-if="product !== null" class="grid mb-10  p-10 gap-10 items-center min-h-[70vh]  grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto  ">
             <div class="shadow-lg p-0 sm:p-10  ">
                 <el-carousel indicator-position="outside">
                     <el-carousel-item v-for="photo in product.photos" :key="photo">
                        <div class="sm:h-[350px] sm:w-[350px] h-[290px]  w-[250px]  mx-auto text-center">
                            <img class=" h-[290px] mx-auto  w-[250px]  object-contain" :src="photo" alt="">
                        </div>
                     </el-carousel-item>
                 </el-carousel>
             </div>
             <div>
                 <h1 class="text-3xl ">{{ product.title }}</h1>
                 <p class="my-5 text-xl">{{ product.description }}</p>
                 <div class="my-3">
                     <label for="quantity" class="text-xl mr-3">Quantity</label>
                     <input v-model="quantity" type="number" class="bg-primary w-[60px] p-2"  id="quantity">
                 </div>
                 <h1 class="text-xl my-3"> <span class="font-bold">{{ new Intl.NumberFormat('en-US').format(totalCost) }} <span class="text-xs">mmk</span> </span></h1>
                 <button class="py-3" @click="addToCart(product)">Add to Cart</button>
             </div>
         </div>
     </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
    name: "ProductDetail",
    data() {
        return {
            product: null,
            quantity: 1,
            totalCost : 0,
        }
    },
    watch:{
      quantity(){
          this.calculateCost();
      }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['setCarts']),
        calculateCost(){
            if(this.quantity < 1){
                this.totalCost = 1;
                this.quantity = 1;
            }
            let cost = this.quantity * this.product.price
            this.totalCost= cost;
        },
        fetchProduct() {
            axios.get(this.url+"products/"+this.$route.params.id )
            .then(res => {
                this.product = res.data.product;
                this.totalCost = this.product.price;
            })
        },
        addToCart(product){
            product['quantity'] = this.quantity
            product['cost'] = this.totalCost
            this.setCarts(product)
        }
    },
    mounted() {
        this.fetchProduct();
    }
}
</script>

<style scoped>

</style>
