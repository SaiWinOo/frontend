<template>
    <public-layout>
        <div class="py-10">
            <div class="max-w-2xl mx-auto font-serif">
                <h1 class="text-center text-5xl mb-5 magic-color font-mono">Let's do some magic!</h1>
                <h1 class="text-center text-2xl mb-10  font-mono">Search Your Favourite Item</h1>
            </div>
            <div class="block max-w-2xl mx-auto mb-5">
                <input v-model="keyword" type="text" class="w-full bg-primary px-3 py-2 rounded" placeholder="Search For Products">
            </div>
            <ul class="flex flex-wrap max-w-3xl mx-auto">
                <li :class="{'bg-secondary' : selectedCategory === 'all'  }"  @click="fetchProducts(url+'products')"
                    class="border p-2 cursor-pointer text-lg px-3 rounded mr-2 mb-2">
                   All
                </li>
                <li  @click="fetchProductsByCategory([c.id,c.slug])"  class="cursor-pointer border   text-lg py-2 px-4  rounded  mr-2 mb-2" v-for="c in categories" :key="c.id" :class="{'bg-secondary' : selectedCategory === c.slug  }" >
                    {{ c.slug }}
                </li>
            </ul>
        </div>
        <div v-if="isLoadingProducts || isLoading"  class="max-w-4xl flex justify-center items-center  px-3 grid mx-auto h-[30vh]"  style="width: 100%">

            <div role="status">
                <svg class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

        </div>
        <transition mode="out-in">
            <div v-if="products.length !== 0"  class="max-w-4xl px-3 grid mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 mb-10">
                <div v-if="!isLoading && !isLoadingProducts" v-for="p in products" :key="p.id" class="border rounded-xl shadow-md hover:shadow-xl">
                    <img class="w-full object-contain  h-[200px]" :src="p.featured_image" alt="">
                    <router-link class="hover:text-secondary hover:underline"
                                 :to="{name:'productDetail' , params: {id : p.id}}">
                        <h4 class=" p-2">{{ p.title_excerpt }}</h4>
                    </router-link>
                    <h4 class="px-2 py-1 font-bold text-xl"><span class="font-normal text-xs"></span> {{ new Intl.NumberFormat('en-US').format(p.price)}} <span class="text-xs">MMK</span></h4>
                    <h4 class="font-bold px-2 pb-2">Free Shipping <span class="font-normal">to Myanmar</span></h4>
                </div>
                <div  class="block col-span-1 md:col-span-2 lg:col-span-3 text-center flex justify-center">
                    <nav v-if="!isLoading" class="my-5 " aria-label="Page navigation example">
                        <ul v-if="paginateUrl"  class="inline-flex -space-x-px">
                            <li   v-for="p in paginateUrl"  >
                                <button  :disabled="p.url === null" :class="{'bg-black text-white' : p.active === true}" class="py-2 disabled:bg-white disabled:text-gray-400  disabled:cursor-not-allowed  px-5 border disabled bg-white   inline-block  "  @click.prevent="fetchProducts(p.url)">{{ returnLabel(p.label)  }}</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div v-else>
                <div v-if="!isLoadingProducts && !isLoading  && products.length === 0"  class="flex flex-col justify-center mb-10 ">
                    <div>
                        <img  class="max-w-xl mx-auto h-[300px]" src="/src/assets/no_product.png" alt="">
                    </div>
                    <h2 class="text-center text-md my-3">No result found!</h2>
                </div>
            </div>
        </transition>
    </public-layout>
</template>

<script>
import PublicLayout from "../../components/Layout/PublicLayout.vue";
import {mapActions,  mapState} from "vuex";
import { debounce } from 'lodash';
export default {
    name: "TheShop",
    components: {PublicLayout,},
    data() {
        return {
            keyword: null,
        }
    },
    watch:{
      keyword:debounce(function(keyword){
            this.fetchProducts(this.url+'products?keyword='+ keyword);
      },400),
    },
    computed: {
        ...mapState(['products','paginateUrl','url' ,'categories','selectedCategory','isLoading','isLoadingProducts']),
    },
    methods: {
        ...mapActions(['fetchProducts','fetchProductsByCategory']),
        returnLabel(label){
            if(label === "&laquo; Previous"){
                return "Pre";
            }else if(label  === "Next &raquo;"){
                return "Next"
            }else{
                return label;
            }
        },
    },
    mounted() {
        this.fetchProducts(this.url +'products');
    },
}
</script>

<style scoped>
.magic-color {
    background: -webkit-linear-gradient(113deg, #fdc500, #00feef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>
