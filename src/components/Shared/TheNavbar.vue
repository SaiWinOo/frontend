<template>
    <div class="sticky bg-primary z-50 shadow-lg top-0">
        <div class="container h-[10vh] px-3 items-center   mx-auto grid gap-10 grid-cols-2 md:grid-cols-4 ">
            <div class="w-[50px]">
                <img class="w-full " src="/src/assets/logo.svg" alt="">
            </div>
            <div :class="{'ml-[-108%] ' : !showNavbar},  {'ml-[-3%]' : showNavbar}"
                 class="col-span-2  transition-all md:inline-block text-xl fixed bg-gray-300 w-full h-[90vh] bottom-0 z-50   md:bg-transparent md:static md:h-auto md:flex ">
                <div class="sm:mx-auto">
                    <router-link @click="closeNav" class="mx-2 block md:inline-block text-center p-2" to="/">Home
                    </router-link>
                    <router-link @click="closeNav" class="mx-2 block md:inline-block text-center p-2"
                                 :to="{name: 'shop'}">Shop
                    </router-link>
                    <router-link @click="closeNav" class="mx-2 block md:inline-block text-center p-2 " :to="{name: 'cart'}">
                        <el-badge :value="carts.length" class="item ">
                            <div class=" text-xl mb-2 font-normal border-none">Cart</div>
                        </el-badge>
                    </router-link>
                    <router-link v-if="token === null" class="mx-2 block md:inline-block text-center p-2" :to="{name: 'login'}">Login
                    </router-link>
                    <router-link v-if="token === null" class="mx-2 block md:inline-block text-center p-2"
                                 :to="{name: 'register'}">Register
                    </router-link>
                </div>
            </div>
            <div class="flex justify-end">
                <div v-if="user !== null"  class="flex flex-wrap items-center ">
                    <el-dropdown>
                        <el-button class="w-[140px] h-[44px]">
                            <img class="w-[30px] rounded-full  mr-2" :src="profileImage" alt="">{{ user.name }}
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <router-link :to="{name: 'profile'}"><i class="bi bi-person"></i>Profile Setting</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item >
                                    <router-link :to="{name: 'history'}"><i class="bi bi-clock-history"></i>Order History</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="user.role === 'admin'" >
                                    <a href="/admin/the-dashboard"><i class="bi bi-motherboard"></i>Dashboard Setting</a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                     <div @click="logout"><i class="bi bi-box-arrow-right"></i>Logout</div>
                                </el-dropdown-item>

                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div @click="toggleNav" class="block md:hidden">
                    <img v-if="!showNavbar" class="h-[60px] max-w-[50px]" src="/src/assets/open.svg" alt="">
                    <img v-else class="h-[60px]  max-w-[50px]" src="/src/assets/close.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
    name: "TheNavbar",
    data() {
        return {
            showNavbar: true,
            windowWidth: window.innerWidth,
        }
    },
    computed: {
        ...mapState(['token','user', 'url','carts']),
        profileImage(){
            if(this.user){
                if(this.user.profile_image !== null ){
                    return this.user.profile_image;
                }else{
                    return '/src/assets/logo.svg';
                }
            }
        }
    },
    watch: {
        windowWidth() {
            if (this.windowWidth > 767) {
                this.showNavbar = true;
            } else if (this.windowWidth < 767) {
                this.showNavbar = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        ...mapActions(['setUser', 'setToken','showAlert']),
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
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        toggleNav() {
            this.showNavbar = !this.showNavbar;
        },
        closeNav() {
            if (this.windowWidth < 767) {
                this.showNavbar = false;
            } else {

            }
        }
    },
}
</script>

<style scoped>

</style>
