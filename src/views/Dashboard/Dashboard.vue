<template>
<div>
<!--    Product Create Component-->
    <el-dialog  class="w-[90vw] sm:max-w-5xl" v-model="dialogTableVisible" title="Create Product">
        <product-create-component></product-create-component>
    </el-dialog>
    <div  class="fixed bottom-12 z-50  text-5xl text-blue-900 cursor-pointer right-12">
        <el-tooltip content="Create New Product" placement="top">
            <div text @click="dialogTableVisible = true">
                <i class="bi text-4xl bi-pencil-square"></i>
            </div>
        </el-tooltip>
    </div>

    <!-- drawer init and show -->
    <div class="flex  min-h-screen">
        <div  class="w-full ">
            <div class="bg-gray-400 h-[6vh] sm:h-[9vh]  flex justify-between items-center  px-3">
                <div  class="cursor-pointer">
                    <div  data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">

                    </div>
                    <button class="font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                        <img  class="w-[40px] " src="/src/assets/open.svg" alt="">
                    </button>
                </div>
                <div class="w-[130px] h-[6vh]  bg-primary p-2  flex items-center ">
                    <img class="w-[30px]  rounded-full mr-3 " src="/src/assets/myself.jpg" alt="">
                    Admin
                </div>
            </div>

            <the-dashboard v-if="$route.params.cmp === 'the-dashboard'"></the-dashboard>
            <the-product v-if="$route.params.cmp === 'the-product'"></the-product>
            <the-category v-if="$route.params.cmp === 'the-category'"></the-category>
            <the-order v-if="$route.params.cmp === 'the-order'"></the-order>


        </div>
    </div>
    <!-- drawer component -->
    <div id="drawer-navigation" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
        <h5 id="drawer-navigation-label" class="text-bas px-3 text-xl font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200  hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
            <ul class="space-y-2">
                <li>
                    <router-link :to="{name: 'dashboard', params : {cmp : 'the-dashboard'}}" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span class="ml-3">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard', params : {cmp : 'the-category'}}" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Category</span>
                        <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ categories.length }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard', params : {cmp : 'the-order'}}" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Order</span>
                    </router-link>
                </li>
                <li>
                    <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                    </a>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard', params : {cmp : 'the-product'}}"  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                        <div>
                            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{{ products.length }}</span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <a href="/"  class="flex justify-between items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div>
                            <i class="flex-shrink-0  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi bi-house-fill text-2xl" ></i>
                            <span class="flex-1 ml-3 whitespace-nowrap">Home</span>
                        </div>

                    </a>
                </li>
                <li @click="logout">
                    <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import TheCategory from "../../components/DashboardComponents/TheCategory.vue";
import TheDashboard from "../../components/DashboardComponents/TheDashboard.vue";
import ProductCreateComponent from "../../components/DashboardComponents/ProductCreateComponent.vue";
import TheProduct from "../../components/DashboardComponents/TheProduct.vue";
import {mapActions, mapState} from "vuex";
import TheOrder from "../../components/DashboardComponents/TheOrder.vue";
import axios from "axios";
export default {
    name: "Drawer",
    data() {
        return {
            dialogTableVisible:false,
        }
    },
    computed: {
        ...mapState(['categories','products','url']),
    },
    components: {TheOrder, TheProduct, TheDashboard, TheCategory, ProductCreateComponent},
    methods: {
        ...mapActions(['fetchProducts','setToken','setUser','showAlert']),
        logout() {
            axios.post(this.url + 'logout')
                .then(res => {
                    if (res.data.success === true) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        this.setToken(null);
                        this.setUser(null);
                        this.showAlert(['Success',res.data.message,'success']);
                        // this.$router.push('/login');
                        location.href='/login';
                    }
                })
        },

    },
    mounted() {
        this.fetchProducts(this.url + 'admin/products')
    }
}
</script>

<style scoped>

</style>
