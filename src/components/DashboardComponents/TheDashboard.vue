<template>
    <div>
        <div class="grid p-5  grid-cols-1 mx-auto my-10 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            <div class="custom_shadow bg-gradient  rounded p-10 bg-blue-700">
                <div class="text-lg font-mono">Today Total Sales</div>
                <h4 class="text-xs "><span class="font-bold text-xl">{{ new Intl.NumberFormat('en-US').format(todaySales) }} MMK</span></h4>
            </div>
            <div class="custom_shadow rounded p-10 bg-gradient">
                <div class="text-lg font-mono">Today Quantity</div>
                <h4 class="text-xl font-bold ">{{ todayQuantity }}</h4>
            </div>
            <div class="custom_shadow rounded bg-gradient p-10 bg-blue-400">
                <div class="text-lg font-mono">Today Total Order</div>
                <h4 class="text-xl font-bold "> {{ todayOrder }}</h4>
            </div>
        </div>
        <h1 class="text-center text-3xl font-mono font-semibold mt-10">Top <span
            class="bg-yellow-300 rounded-full p-3 px-6">3</span> Best Selling Products of All Time</h1>
        <div class="max-w-6xl grid  p-5 mb-10  gird-cols-1 mx-auto gap-10  mt-10 sm:grid-cols-2  md:grid-cols-3">
            <div v-for="p in products" :key="p.id"
                 class="border overflow-hidden relative rounded-xl shadow-md hover:shadow-xl">
                <img class="w-full object-contain h-[300px]" :src="p.featured_image" alt="">
                <router-link class="hover:text-secondary hover:underline"
                             :to="{name:'productDetail' , params: {id : p.id}}">
                    <h4 class=" p-2">{{ p.title_excerpt }}</h4>
                </router-link>
                <h3 class="p-2 ">Order Counts - <span class="font-semibold">{{ p.order_counts }}</span></h3>
                <div class="absolute top-0 right-0 bg-red-500  px-3 py-1">Best Selling</div>
                <h4 class="px-2 py-1 font-bold text-xl">Price - <span class="font-normal text-xs"></span> {{ new Intl.NumberFormat('en-US').format(p.price) }} <span class="text-xs">MMK</span>
                </h4>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-10 px-10  lg:grid-cols-2">
            <this-year></this-year>
            <this-month></this-month>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import ThisYear from "./ThisYear.vue";
import ThisMonth from "./ThisMonth.vue";

export default {
    name: "TheDashboard",
    components: {ThisMonth, ThisYear},
    data() {
        return {
            products: null,
            todaySales : null,
            todayQuantity : null,
            todayOrder : null,
        }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {},
    mounted() {
        axios.get(this.url + 'admin/popular-products')
            .then(res => {
                if (res.data.success === true) {
                    this.products = res.data.products;
                }
            })
        axios.get(this.url + 'admin/orders-chart')
            .then(res => {
                this.todaySales = res.data.todaySales.toFixed(0);
                this.todayQuantity = res.data.todayQuantity;
                this.todayOrder  = res.data.todayOrder;
            })
    }
}
</script>

<style scoped>
.bg-gradient{
    background: rgb(253,197,0) !important;
    background: linear-gradient(114deg, rgba(253,197,0,1) 0%, rgba(0,254,239,1) 100%) !important;
}
</style>
