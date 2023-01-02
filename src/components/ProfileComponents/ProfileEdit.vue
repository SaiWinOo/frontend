<template>
    <div class="mx-5">
        <div class="max-w-4xl  py-5 custom_shadow  mx-auto  my-10 ">
            <form ref="profileEdit" @submit.prevent="saveChange()">
                <div>
                    <div>
                        <img class="w-[100px] h-[100px]  rounded-full mx-auto" :src="getProfileUrl" alt="">
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="name" class="text-xl">Name</label>
                        <input name="name" :value="user.name" type="text" id="name" class="px-4 py-3 border rounded-md">
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="email" class="text-xl">Email</label>
                        <input name="email" :value="user.email" type="text" id="email" class="px-4 py-3 border rounded-md">
                    </div>
                    <div class="flex mb-10 flex-col gap-5 px-5">
                        <label for="bio" class="text-xl">Bio</label>
                        <textarea name="bio" placeholder="Write About yourself" rows="4" type="text" id="bio"
                                  class="px-4 py-3 border rounded-md">{{ user.bio }}</textarea>
                    </div>
                    <div class="px-5 mb-10">
                        <label for="profile_image"
                               class="w-full cursor-pointer border-dashed border-2  block text-center py-2 text-lg">Update
                            Profile Picture</label>
                        <input type="file" name="profile_image" @change="profileImgChange" id="profile_image" class="hidden">
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
import {mapActions, mapState} from "vuex";
import axios from "axios";
export default {
    name: "ProfileEdit",
    computed: {
        ...mapState(['user','url']),
        getProfileUrl() {
            if(this.user.profile_image === null){
                return "src/assets/default_user.png"
            }else{
                return this.user.profile_image;
            }
        },
    },
    methods: {
        ...mapActions(['showAlert','setUser']),
        profileImgChange() {
            this.showAlert(['Success', 'Profile is uploaded. Update to see changes!', 'success'])
        },
        saveChange(){
            let formData = new FormData(this.$refs.profileEdit);
            axios.post(this.url+'profile-edit',formData)
            .then(res => {
                if(res.data.success === true){
                    this.showAlert(['Success',res.data.message,'success']);
                    this.setUser(res.data.user)

                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }
            })
        },
    },
}
</script>

<style scoped>
.custom_shadow {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
