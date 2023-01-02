<template>
    <div class="mx-5">
        <div class="max-w-4xl  py-5 custom_shadow  mx-auto  my-10 ">
            <form action="" @submit.prevent="updatePassword" ref="passwordEdit">
                <div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="name" class="text-xl">Old Password</label>
                       <div>
                           <input name="current_password" placeholder="Old Password" type="text" id="name"
                                  class="px-4 block w-full  py-3 border rounded-md">
                           <span v-if="errors.current_password" class="text-red-800">{{ errors.current_password[0] }}</span>
                       </div>
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="name" class="text-xl">New Password</label>
                        <div>
                            <input name="new_password" placeholder="New Password" type="text" id="name"
                                   class="px-4 block w-full py-3 border rounded-md">
                            <span v-if="errors.new_password" class="text-red-800">{{ errors.new_password[0] }}</span>
                        </div>
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="name" class="text-xl">Confirm Password</label>
                        <div>
                            <input name="new_password_confirmation" placeholder="Confirm Password" type="text" id="name"
                                   class="px-4 py-3 border block rounded-md w-full">
                            <span v-if="errors.new_password" class="text-red-800">{{ errors.new_password[0] }}</span>
                        </div>
                    </div>
                    <div class="px-5">
                        <button
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
    name: "PasswordEdit",
    data() {
        return {
            errors: [],
        }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['showAlert']),
        updatePassword(){
            let formData = new FormData(this.$refs.passwordEdit);
            axios.post(this.url+'password-edit',formData)
                .then(res => {
                    if(res.data.success === true){
                        this.errors = [];
                        this.$refs.passwordEdit.reset();
                        this.showAlert(['Success',res.data.message,'success']);
                    }
                })
                .catch(e => {
                    this.showAlert(['Error',e.response.data.message,'error']);
                    this.errors = e.response.data.errors;
                })
        },
    },
}
</script>

<style scoped>

</style>
