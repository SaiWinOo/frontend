<template>
    <ul>
        <li @click="selectComponent('the-dashboard')"
            class="text-2xl px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
            <i class="bi  bi-house mr-3 "></i>Dashboard
        </li>
        <li @click="selectComponent('the-products')"
            class="text-2xl px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
            <i class="bi  bi-box mr-3 "></i>Products
        </li>
        <li @click="selectComponent('the-category')"
            class="text-2xl px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
            <i class="bi  bi-layers mr-3 "></i>Category
        </li>
        <li @click="selectComponent('the-customers')"
            class="text-2xl px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
            <i class="bi  bi-people mr-3 "></i>Customers
        </li>
        <li @click="selectComponent" class="text-2xl px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
            <i class="bi  bi-card-list mr-3 "></i>Orders
        </li>
        <router-link to="/">
            <li class="text-2xl w-full px-2 py-2 mb-1 cursor-pointer hover:bg-blue-800 ">
                <i class="bi w-full bi-card-list mr-3 "></i>Orders
            </li>
        </router-link>
    </ul>
</template>
<script>
export default {
    name: "TheSidebar",
    data() {
        return {
            selectedComponent: '',
        }
    },
    watch:{
        selectedComponent(component){
            this.$emit('selectComponent' , component)
        }
    },
    methods: {
        selectComponent(component) {
            this.selectedComponent = component;
        }
    },
}
</script>

<style scoped>

</style>
