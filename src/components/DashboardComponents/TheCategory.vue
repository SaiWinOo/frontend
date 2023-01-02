<template>
    <div>
        <div class="p-2">
            <form action="" @submit.prevent="createCategory" ref="createCategory"
                  class="flex items-start flex-row flex-wrap">
                <div class="flex flex-col ">
                    <input placeholder="Category Name" type="text" name="title" class="py-3 rounded px-5 text-xl bg-gray-200">
                    <span v-if="errors.length !== 0" class="text-red-700 text-xl font-bold ">{{
                            errors.title[0]
                        }}</span>
                </div>
                <button class="h-[54px] rounded ">Create</button>
            </form>

        </div>

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6">
                        #
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Title
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Products Count
                    </th>
                    <th scope="col" class="py-3 px-6">
                        created at
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="c in categories" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ c.id }}
                    </th>
                    <td class="py-4 px-6">
                        {{ c.title }}
                    </td>
                    <td class="py-4 px-6">
                        {{ c.products_count }}
                    </td>
                    <td>
                        {{ c.time }}
                    </td>
                    <td class="py-4 px-6">
                        <span @click="toggleShowUpdate(c)" class="cursor-pointer font-bold text-blue-400 hover:underline hover:text-blue-700 mr-2">Edit</span>
                        <span @click="deleteCategory(c.id)" class="cursor-pointer font-bold text-red-400 hover:underline hover:text-red-700">Delete</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


        <!-- Main modal -->
        <div v-if="showUpdate"  style="background: #00000050;" class=" overflow-y-auto overflow-x-hidden fixed  right-0 left-0 mx-auto flex  z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <!-- Modal header -->
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Category
                        </h3>
                        <button @click="toggleShowUpdate()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form action="#" ref="updateCategoryForm" @submit.prevent="updateCategory">
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="title" :value="tempCategory.title" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                            </div>
                        </div>
                        <button type="submit" class="inline-flex items-center bg-secondary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Update catgory
                        </button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";
import {ElNotification} from 'element-plus'

export default {
    name: "TheCategory",
    data() {
        return {
            errors: [],
            showUpdate : false,
            tempCategory : null,
        }
    },
    computed: {
        ...mapState(['url', 'categories']),
    },
    methods: {
        ...mapActions(['fetchCategory','showAlert']),
        toggleShowUpdate(c){
          this.showUpdate = !this.showUpdate;
          this.tempCategory = c;
        },
        createCategory() {
            let formData = new FormData(this.$refs.createCategory);
            axios.post(this.url + 'category', formData)
                .then(res => {
                    if (res.data.success === true) {
                        this.errors = [];
                        this.showAlert(['Success','Category created successfully!','success']);
                        this.fetchCategory();
                        this.$refs.createCategory.reset();
                    }
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                    this.showAlert(['Error', e.response.data.errors.title[0],'error']);
                })
        },
        updateCategory(){
            let formData = new FormData(this.$refs.updateCategoryForm);
            axios.put(this.url+'category/'+this.tempCategory.id,new URLSearchParams(formData).toString())
            .then(res =>{
                this.showAlert(['Success',res.data.message,'success']);
                this.fetchCategory();
                this.showUpdate = false;
            })
            .catch(e =>{
                this.showAlert(['Error',e.response.data.message,'error']);
            })
        },
        deleteCategory(id){
            axios.delete(this.url + 'category/'+id)
            .then(res =>{
                this.showAlert(['Success',res.data.message,'success']);
                this.fetchCategory();
            })
        },
    },
    mounted() {
        this.fetchCategory();
    }
}
</script>

<style scoped>

</style>
