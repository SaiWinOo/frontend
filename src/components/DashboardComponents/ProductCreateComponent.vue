<template>
    <transition>
        <div class="m-2   rounded-lg  ">
            <form action="" @submit.prevent="createProduct" class="flex flex-wrap gap-10 pb-5 px-5" ref="createProduct">
                <div class="w-full sm:w-1/3 ">
                    <label class="block mb-1 text-xl my-2 font-semibold " for="title">Title</label>
                    <input name="title" type="text"
                           class="w-full bg-gray-200 focus:bg-white rounded-sm py-1 px-2 h-[35px]"
                           id="title"
                           placeholder="Product Title">
                    <span v-if="errors.title"  class="text-xl font-semibold text-red-700 ">{{  errors.title[0] }}</span>
                </div>
                <div class="w-full sm:w-1/4">
                    <label class="block mb-1 text-xl my-2 font-semibold " for="title">Category</label>
                    <select-component @selected="selectedOption"></select-component>
                    <span v-if="errors.category"  class="text-xl font-semibold text-red-700 ">{{  errors.category }}</span>
                </div>
                <div class="w-full sm:w-1/4">
                    <label class="block mb-1 text-xl my-2 font-semibold " for="title">Product Price MMK</label>
                    <input name="price" type="number"
                           class="w-full bg-gray-200 focus:bg-white rounded-sm py-1 px-2 h-[35px]" id="title"
                           placeholder="Product Price MMK">
                    <span v-if="errors.price"  class="text-xl font-semibold text-red-700 ">{{  errors.price[0] }}</span>

                </div>
                <div class="w-full sm:w-1/4">
                    <label class="block mb-1 text-xl my-2 font-semibold " for="title">Featured Image</label>
                    <el-upload
                        ref="uploadRef"
                        class="upload-demo"
                        :auto-upload="false"
                        name="featured_image"
                    >
                        <template #trigger>
                            <el-button type="primary">select file</el-button>
                        </template>


                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                    <span v-if="errors.featured_image"  class="text-xl font-semibold text-red-700 ">{{  errors.featured_image[0] }}</span>
                </div>
                <div>
                    <label class="block mb-1 text-xl my-2 font-semibold " for="title">Product Photos</label>
                    <el-upload action="#" ref="clearPhoto" :multiple=true  name="photos[]" list-type="picture-card" :auto-upload="false">
                        <el-icon>
                            <i class="bi bi-plus"></i>
                        </el-icon>
                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
                                <span class="el-upload-list__item-actions">

                </span>
                            </div>
                        </template>
                    </el-upload>
                    <span v-if="errors.photos"  class="text-xl font-semibold text-red-700 ">{{  errors.photos[0] }}</span>
                </div>


                <div class="w-full sm:w-1/3">
                    <label class="block mb-1 text-xl my-2 font-semibold font-serf" for="title">Product
                        Description</label>
                    <textarea name="description" rows="6" cols="20"
                              class="w-full text-xl rounded-xl bg-gray-200 focus:bg-white rounded-sm py-3 px-4 " id="title"
                              placeholder="Product Description"></textarea>
                    <span v-if="errors.description"  class="text-xl font-semibold text-red-700 ">{{  errors.description[0] }}</span>
                </div>


                <div class="block w-full ">
                    <button class="my-2  py-2 px-10 text-xl">Create</button>
                </div>
            </form>
        </div>
    </transition>
</template>


<script>
import SelectComponent from "../Shared/SelectComponent.vue";
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
    name: "ProductCreateComponent",
    components: {SelectComponent},
    data() {
        return {
            errors: [],
            selectedCategory: null,
        }
    },
    computed: {
        ...mapState(['url', 'products']),
    },
    methods: {
        ...mapActions(['showAlert','fetchProductsForAdmin']),
        setPhotos (e){
            console.log(e)
        },
        clearPhoto(){
            this.$refs['clearPhoto'].clearFiles(['ready']);
            this.$refs['uploadRef'].clearFiles(['ready']);
        },
        createProduct() {
            let formData = new FormData(this.$refs.createProduct);
            if(this.selectedCategory === null ){
                this.errors = {'category' : 'The Category field is required'};
                return;
            }
            formData.append('category_id', this.selectedCategory);
            // formData.append('featured_image', this.$refs.uploadRef);
            axios.post(this.url + 'products', formData)
                .then(res => {
                    if(res.data.success === true){
                        this.errors = [];
                        this.showAlert(['Success', 'Product is created!','success']);
                        this.$refs.createProduct.reset();
                        this.clearPhoto();
                        this.fetchProductsForAdmin('admin/products');
                    }
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                    this.showAlert(['Error', e.response.data.message, 'error']);
                    console.log(e.response.data.errors)
                })
        }
        ,
        selectedOption(x) {
            this.selectedCategory = x;
        }
    },
}
</script>

<style scoped>
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
