<template>
    <section class="h-screen">
        <div class="container px-6 py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                        src="src/assets/register.svg"
                        class="w-full"
                        alt="Phone image"
                    />
                </div>
                <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form ref="registerForm" @submit.prevent="register">
                        <!--                        Name input-->
                        <div class="mb-6">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Name"
                                name="name"
                            />
                            <span v-if="errors.name" class="text-sm text-red-700">{{ errors.name[0] }}</span>
                        </div>

                        <!-- Email input -->
                        <div class="mb-6">
                            <input
                                type="email"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                name="email"
                            />
                            <span v-if="errors.email" class="text-sm text-red-700">{{ errors.email[0] }}</span>
                        </div>

                        <!-- Password input -->
                        <div class="mb-6">
                            <input
                                type="password"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                                name="password"
                            />
                            <span v-if="errors.password" class="text-sm text-red-700">{{ errors.password[0] }}</span>
                        </div>

                        <div class="flex justify-between items-center mb-6">
                            <div class="form-group form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    id="exampleCheck3"
                                    checked
                                />
                                <label class="form-check-label inline-block text-gray-800" for="exampleCheck3"
                                >Remember me</label
                                >
                            </div>
                            <router-link class="hover:underline" to="/login">Already  have an accunt?</router-link>
                        </div>

                        <!-- Submit button -->
                        <button
                            type="submit"
                            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        >
                            <div v-if="isLoading" role="status" class="inline-block ">
                                <svg class="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            Sign up
                        </button>

                        <div
                            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                            <p class="text-center font-semibold mx-4 mb-0">OR</p>
                        </div>

                        <a
                            class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                            style="background-color: #060b16"
                            href="#!"
                            role="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        >
                            <!-- Facebook -->
                            <i class="bi bi-github mr-2"></i>Continue with Github
                        </a>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
    name: "TheLogin",
    data() {
        return {
            errors: [],
            isLoading : false,
        }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['showAlert']),
        register() {
            this.isLoading = true;
            let formData = new FormData(this.$refs.registerForm)
            axios.post(this.url+'register',formData)
                .then(res => {
                    if(res.data.success === true){
                        this.errors = [];
                        this.showAlert(['Success',res.data.message,'success']);
                        this.$router.push('/login')
                        this.isLoading = false;
                    }
                })
                .catch(e => {
                    this.showAlert(['Error',e.response.data.message,'error']);
                    this.errors  = e.response.data.errors;
                    this.isLoading = false;
                })
        }
    },
}
</script>

<style scoped>

</style>
