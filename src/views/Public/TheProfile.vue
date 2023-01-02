<template>
    <div>
        <h2 class="text-4xl text-center my-5">Account Setting</h2>
        <div class="text-center">
            <button style="color: rgba(0,0,0,0.55)" v-for="cmp in componentsToRender" :key="cmp.slug" @click="changeComponent(cmp.slug)" :class="{'text-blue-900 ' : cmp.slug === selectedComponent}" class="bg-white font-medium  text-xl ">{{ cmp.title }}</button>
        </div>
        <transition mode="out-in">
            <component :is="selectedComponent"></component>
        </transition>
    </div>
</template>

<script>
import {mapState} from "vuex";
import ProfileEdit from "../../components/ProfileComponents/ProfileEdit.vue";
import BillingAddress from "../../components/ProfileComponents/BillingAddress.vue";
import PasswordEdit from "../../components/ProfileComponents/PasswordEdit.vue";

export default {
    name: "TheProfile",
    data() {
        return {
            componentsToRender : [{slug: 'profile-edit',title : 'Edit Profile'},{slug: 'password-edit',title : 'Edit Edit Password'},{slug: 'billing-address', title : 'Edit Billing Address'}],
            selectedComponent: 'profile-edit',
        }
    },
    components: {PasswordEdit, BillingAddress, ProfileEdit},
    computed: {
        ...mapState(['user']),

    },
    methods: {
        changeComponent(cmp) {
            this.selectedComponent = cmp;
        }
    },
}
</script>

<style scoped>

</style>
