<template>
    <the-navbar v-if="$route.name !== 'dashboard' && $route.name !== 'login' &&  $route.name !== 'register' &&  $route.name !== 'notFound' "  ></the-navbar>
    <router-view v-slot="slotProps">
        <transition mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
    <the-footer v-if="$route.name !== 'dashboard'  && $route.name !== 'login' &&  $route.name !== 'register' &&  $route.name !== 'notFound'  "></the-footer>
</template>

<script>
import TheNavbar from "./components/Shared/TheNavbar.vue";
import TheFooter from "./components/Shared/TheFooter.vue";
import axios from "axios";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
export default {
    name: 'App',
    components: {TheFooter, TheNavbar},
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['setAddress','fetchProducts','fetchCategory','setToken','setUser','updateCartFromLocal']),
    },
    mounted() {
        this.fetchCategory();
        if(localStorage.getItem('token') && localStorage.getItem('user')){
            this.setToken(localStorage.getItem('token'));
            this.setUser(JSON.parse(localStorage.getItem('user')));
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
        }
        if(localStorage.getItem('address')){
            this.setAddress(JSON.parse(localStorage.getItem('address')));
        }
        if(localStorage.getItem('cart')){
            this.updateCartFromLocal(JSON.parse(localStorage.getItem('cart')));
        }
    }
}
</script>

<style >
.custom_shadow{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.custom_shadow:hover{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from{
    opacity: 0;
    transform: translateY(-50px);
}
.v-enter-to{
    opacity: 1;
    transform: translateY(0px);
}
.v-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
.v-leave-from{
    opacity: 1;
    transform: translateY(0px);
}
</style>
