import { createRouter, createWebHistory } from "vue-router";
import TheHome from "../views/Public/TheHome.vue";
import TheShop from "../views/Public/TheShop.vue";
import ProductDetail from "../views/Public/ProductDetail.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import TheLogin from "../views/Auth/TheLogin.vue";
import TheRegister from "../views/Auth/TheRegister.vue";
import store from "../store";
import NotFound from "../views/Public/NotFound.vue";
import TheCart from "../views/Public/TheCart.vue";
import TheProfile from "../views/Public/TheProfile.vue";
import TheHistory from "../views/Public/TheHistory.vue";
import OrderDetail from "../views/Public/OrderDetail.vue";
import Drawer from "../views/Dashboard/Dashboard.vue";
function isLogin(to,from,next){
    if(store.state.token === null){
        return next();
    }
    return next('/');
}
function isAdmin(to,from,next){
    if(store.state.user !== null){
        if(store.state.user.role === 'admin'){
            return next();
        }
    }
    return next('/');
}
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home' , component : TheHome },
        { path: '/shop' , name: 'shop', component : TheShop},
        { path: '/cart' , name: 'cart', component : TheCart},
        { path: '/profile' , name: 'profile', component : TheProfile},
        { path: '/order-detail/:id' , name: 'order-detail', component : OrderDetail},
        { path: '/history' , name: 'history', component : TheHistory},
        { path: '/products/:id', name: 'productDetail' , component: ProductDetail},
        { path: '/login', name: 'login', component: TheLogin, beforeEnter:[isLogin] },
        { path: '/register', name: 'register', component: TheRegister,beforeEnter:[isLogin] },

        // Dashboard Routes
        { path: '/admin/:cmp' , name: 'dashboard' , component : Drawer,beforeEnter:[isAdmin] },
        { path: '/:notFound(.*)',name: 'notFound', component : NotFound }
    ]
})

export default router;
