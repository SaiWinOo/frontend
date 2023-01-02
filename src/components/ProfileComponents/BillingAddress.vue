<template>
    <div class="mx-5">
        <div class="max-w-4xl  py-5 custom_shadow  mx-auto  my-10 ">
            <form action="" ref="billingAddress" @submit.prevent="saveAddress">
                <div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="country" class="text-xl">Country</label>
                        <input name="country" :value="address === null ? null : address.country"  placeholder="State or Town Name" type="text" id="country" class="px-4 py-3 border rounded-md">
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="town" class="text-xl">State and Town</label>
                        <input name="state" :value="address === null ? null : address.state"  placeholder="State or Town Name" type="text" id="town" class="px-4 py-3 border rounded-md">
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="street" class="text-xl">Street</label>
                        <input name="street" :value="address === null ? null : address.street"  placeholder="Street Name" type="text" id="street" class="px-4 py-3 border rounded-md">
                    </div>
                    <div class="px-5">
                        <button for="profile_image"
                                class="w-full  bg-secondary block text-center py-2 text-lg">Save
                            Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
    name: "BillingAddress",
    computed: {
        ...mapState(['url','address']),

    },
    methods: {
        ...mapActions(['setAddress','showAlert']),
        saveAddress() {
            let formData = new FormData(this.$refs.billingAddress);
            axios.post(this.url+'customer-address',formData)
            .then(res => {
                if(res.data.success === true){
                    this.showAlert(['Success', res.data.message,'success']);
                    this.setAddress(res.data.address);
                    localStorage.setItem('address', JSON.stringify(res.data.address));
                }
            })
            .catch(e =>{
                this.showAlert(['Error',e.response.data.message,'error']);
                console.log(e.response.data.errors)
            })
        },
    },
}
</script>

<style scoped>

</style>
