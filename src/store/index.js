import {createStore} from "vuex";
import axios from "axios";
import {ElNotification} from "element-plus";

function updateLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const store = createStore({
    state: {
        url: 'http://127.0.0.1:8000/api/',
        products: [],
        categories: [],
        token: null,
        user: null,
        selectedCategory: null,
        carts: [],
        isLoading: false,
        isLoadingProducts: false,
        productTotalCost: 0,
        tax: 0,
        shipping: 0,
        totalCost: 0,
        address: null,
        paginateUrl: null,
    },
    mutations: {
        setPaginateUrl(state, paginator) {
            state.paginateUrl = paginator;
        },
        setCategory(state, category) {
            state.categories = category;
        },
        setProduct(state, product) {
            state.products = product;
        },
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },
        setCart(state, product) {
            const item = state.carts.find(p => p.id === product.id);
            if (item) {
                ElNotification({
                    title: "Warning",
                    message: "This product has been added!!!",
                    type: 'warning',
                });
                updateLocalStorage(state.carts)
            } else {
                state.carts.unshift(product);
                updateLocalStorage(state.carts);
                ElNotification({
                    title: "Success",
                    message: "This product is added!",
                    type: 'success',
                });
            }
            this.commit('calculateProductCost');
        },
        updateQuantity(state, [value, productId]) {
            const product = state.carts.find(p => p.id === productId)
            if (value < 1) {
                product['quantity'] = 1;
                ElNotification({
                    title: "Warning",
                    message: "The Product Quantity can not be less than one",
                    type: 'warning',
                });
            } else {
                product['quantity'] = value;
            }
            product['cost'] = product.quantity * product.price;
            this.commit('calculateProductCost');
            updateLocalStorage(state.carts);
        },
        removeFromCart(state, productId) {
            const tempCarts = state.carts.filter(p => p.id !== productId)
            state.carts = tempCarts;
            updateLocalStorage(state.carts);
            ElNotification({
                title: "Success",
                message: "This product has been removed!",
                type: 'success',
            });
            this.commit('calculateProductCost');
        },
        calculateProductCost(state) {
            const cost = state.carts.reduce((cost, p) => Number(cost) + (Number(p.price) * Number(p.quantity)), 0)
            state.productTotalCost = cost ;
            state.shipping = Number(state.productTotalCost * .03).toFixed(0);
            state.tax = Number(state.productTotalCost * .05).toFixed(0);
            state.totalCost = Number(state.productTotalCost) + Number(state.shipping) + Number(state.tax);
        },
        setAddress(state, address) {
            state.address = address;
        },
        clearCart(state) {
            state.carts = [];
            localStorage.removeItem('cart');
        },
        setProductsAdmin(state, products) {
            state.productsForAdmin = products;
        }
    },
    getters: {},
    actions: {

        showAlert({}, [title, message, type]) {
            ElNotification({
                title: title,
                message: message,
                type: type,
            })
        },
        setAddress({commit}, address) {
            commit('setAddress', address);
        },
        fetchCategory({commit, state}) {
            state.isLoading = true;
            axios.get(state.url + 'category')
                .then(res => {
                    commit('setCategory', res.data.category)
                    state.isLoading = false;
                })
        },
        fetchProducts({commit, state}, url) {
            state.isLoadingProducts = true;
            axios.get(url)
                .then(res => {
                    commit('setProduct', res.data.products.data);
                    commit('setPaginateUrl', res.data.products.meta.links)
                    commit('setSelectedCategory', 'all')
                    state.isLoadingProducts = false;
                })
        },
        fetchProductsByCategory({commit, state}, [id, slug]) {
            state.isLoading = true;
            axios.get(state.url + 'products?category=' + id)
                .then(res => {
                    commit('setProduct', res.data.products.data)
                    commit('setSelectedCategory', slug)
                    commit('setPaginateUrl', res.data.products.meta.links)
                    state.isLoading = false;
                })
        },
        setToken({commit}, token) {
            commit('setToken', token);
        },
        setUser({commit}, user) {
            commit('setUser', user);
        },
        setCarts({commit}, product) {
            commit('setCart', product);
        },
        updateCartFromLocal({state}, cart) {
            state.carts = cart;
        },
        updateQuantity({commit}, [value, product]) {
            commit('updateQuantity', [value, product]);
        },
        removeFromCart({commit}, productId) {
            commit('removeFromCart', productId);
            commit('calculateProductCost');
        },
        clearCart({commit}) {
            commit('clearCart');
        },
    },
})

export default store;
