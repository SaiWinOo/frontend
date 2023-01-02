<template>
    <div>

        <div class="overflow-x-auto mx-5 lg:mx-10 relative shadow-md sm:rounded-lg">
            <div class="pb-4 bg-white dark:bg-gray-900">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" v-model="keyword" id="table-search"
                           class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search for items">
                </div>
            </div>
            <table class="w-full px-10 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Product Img
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Product name
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Orders
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Category
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Price
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Action
                    </th>
                </tr>
                </thead>
                <tr v-if="isLoadingForAdmin" >
                        <td colspan="6"  class="text-center h-[200px]" role="status">
                            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </td>
                </tr>
                <tr v-if="productsForAdmin.length === 0 && !isLoadingForAdmin">
                    <td class="text-center text-2xl text-gray-700 p-2" colspan="5">There's no products available.</td>
                </tr>
                <tbody v-if="!isLoadingForAdmin">
                <tr v-for="p in productsForAdmin.data"
                    class="bg-white text-gray-700 text-lg border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img class="w-[50px] h-[50px] object-cover" :src="p.featured_image" alt="">
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ p.title_excerpt }}
                    </th>
                    <td class="py-4 px-6">
                        {{ p.order_counts }}
                    </td>
                    <td class="py-4 px-6">
                        {{ p.category.title }}
                    </td>
                    <td class="py-4 px-6">
                        $ {{ p.price }}
                    </td>
                    <td class="py-4 px-6">
                        <span @click="editProduct(p)"
                              class="font-medium cursor-pointer mr-2 text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                        <span @click="removeProduct(p.id)"
                              class="font-medium cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">Remove</span>
                    </td>
                </tr>
                </tbody>
            </table>

            <nav v-if="!isLoadingForAdmin" class="my-5 text-center" aria-label="Page navigation example">
                <ul v-if="productsForAdmin.meta"  class="inline-flex -space-x-px">
                    <li   v-for="p in productsForAdmin.meta.links"  >
                        <button  :disabled="p.url === null" :class="{'bg-black text-white' : p.active === true}" class="py-2 disabled:bg-white disabled:text-gray-400  disabled:cursor-not-allowed  px-5 border disabled bg-white   inline-block  "  @click.prevent="fetchProductsForAdmin(p.url)">{{ returnLabel(p.label)  }}</button>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Modal toggle -->

        <!-- Main modal -->
        <div v-if="showProductUpdate" style="background: #00000050"
             class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <!-- Modal header -->
                    <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Product
                        </h3>
                        <button @click="showProductUpdate = false" type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="updateProductModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form action="#" @submit.prevent="updateProduct" ref="updateProductForm">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="title" id="name" :value="tempProduct.title"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Ex. Apple iMac 27&ldquo;">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                       for="file_input">Featured Image</label>
                                <input name="featured_image"
                                       class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                       id="file_input" type="file">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                       for="file_input">Photos</label>
                                <input multiple name="photos[]"
                                       class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                       id="file_input" type="file">
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" :value="tempProduct.price" name="price" id="price"
                                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="$299">
                            </div>
                            <div>
                                <label for="category"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                                    {{ tempProduct.category.id }}</label>
                                <select id="category" name="category_id"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option :key="c.id" v-for="c in categories" :value="c.id"
                                            :selected="c.id === tempProduct.category.id">{{ c.title }}
                                    </option>
                                </select>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description"
                                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" name="description" :value="tempProduct.description" rows="5"
                                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Write a description...">Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US</textarea>
                            </div>
                        </div>
                        <div class="flex items-center justify-end space-x-4">
                            <button type="submit" class="bg-secondary hover:bg-yellow-500">
                                Update product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";
import { debounce } from 'lodash'
export default {
    name: 'TheProduct',
    data() {
        return {
            products: [],
            tempProduct: null,
            showProductUpdate: false,
            keyword : null,
            isLoadingForAdmin : false,
            productsForAdmin : [],
        }
    },
    watch:{
        keyword:debounce(function(keyword){
            this.fetchProductsForAdmin(this.url+'admin/products?keyword='+keyword)
        },500)
    },
    computed: {
        ...mapState(['url', 'categories']),
    },
    methods: {
        ...mapActions(['showAlert',]),
        returnLabel(label){
            if(label === "&laquo; Previous"){
                return "Pre";
            }else if(label  === "Next &raquo;"){
                return "Next"
            }else{
                return label;
            }
        },
        fetchProductsForAdmin(url) {
            this.isLoadingForAdmin = true;
            axios.get(url)
                .then(res => {
                    this.productsForAdmin = res.data.products
                    this.isLoadingForAdmin = false;
                })
        },
        removeProduct(id) {
            axios.delete(this.url + 'admin/products/' + id)
                .then(res => {
                    console.log(res.data)
                    this.showAlert(['Success', res.data.message, 'success']);
                    this.fetchProductsForAdmin(this.productsForAdmin.meta.links.find(link => link.active === true).url);
                })
                .catch(e => {
                    console.log(e.response.data.message);
                    this.showAlert(['Error', e.response.data.message, 'error']);
                })
        },
        editProduct(p) {
            this.tempProduct = p;
            this.showProductUpdate = true;
        },
        updateProduct() {
            let formData = new FormData(this.$refs.updateProductForm);
            formData.append('id', this.tempProduct.id);
            axios.post(this.url + 'admin/products/update/', formData)
                .then(res => {
                    this.fetchProductsForAdmin(this.productsForAdmin.meta.links.find(link => link.active === true).url);
                    this.showAlert(['Success', res.data.message, 'success'])
                    this.showProductUpdate = false;
                })
                .catch(e => {
                    this.showAlert(['Error', e.response.data.message, 'error']);
                })
        },
    },
    mounted() {
        this.fetchProductsForAdmin(this.url+'admin/products');
    }
}
</script>

<style scoped>
.isDisabled {
    color: currentColor;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
}
</style>
