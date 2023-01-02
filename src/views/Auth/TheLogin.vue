<template>
    <section class="h-screen">
        <div class="container px-6 py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                        src="src/assets/login.svg"
                        class="w-full"
                        alt="Phone image"
                    />
                </div>
                <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form ref="loginForm" @submit.prevent="login">
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
                                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                                >Remember me</label
                                >
                            </div>
                            <router-link class="hover:underline" to="/register">Don't have an account?</router-link>
                        </div>

                        <!-- Submit button -->
                        <button
                            type="submit"
                            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        >
                            Sign in
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
                            <i class="bi bi-github mr-2"></i>Login with Github
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
        }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['showAlert','setToken','setUser','setAddress','orderHistory']),
        login() {
            let formData = new FormData(this.$refs.loginForm)
            axios.post(this.url + 'login', formData)
                .then(res => {
                    if(res.data.success === true){
                        this.errors = [];
                        this.showAlert(['Success',res.data.message,'success']);
                        this.setToken(res.data.token)
                        this.setUser(res.data.user)
                        this.setAddress(res.data.address);
                        this.orderHistory(res.data.orders)
                        localStorage.setItem('address', JSON.stringify(res.data.address));
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        location.href='/';
                    }
                })
                .catch(e => {
                    this.showAlert(['Error', e.response.data.message, 'error']);
                    this.errors = e.response.data.errors;
                })
        }
    },
}
</script>

<style scoped>

</style>
