<template>
    <public-layout>
        <div>
            <transition class="slide-fade">
                <div
                    class="flex flex-col-reverse sm:flex-row p-5 container min-h-[75vh] mx-auto justify-evenly items-center">
                    <div class="basis-1/2 ">
                        <h1 class="text-6xl my-10 sm:my-3 font-mono font-semibold">Shopping made easy!</h1>
                        <p class="my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequatur
                            deleniti doloremque doloribus ducimus eaque expedita impedit maxime modi, nesciunt omnis
                            perferendis</p>
                        <button>
                            <router-link to="/shop">Shop Now!</router-link>
                        </button>
                    </div>
                    <div class="basis-1/3">
                        <img class="w-full" src="/src/assets/hero-shirt.svg" alt="">
                    </div>
                </div>
            </transition>
            <the-services></the-services>
            <the-about></the-about>
            <the-review></the-review>
        </div>
    </public-layout>
</template>

<script>
import TheServices from "../../components/HomeComponents/TheServices.vue";
import TheAbout from "../../components/HomeComponents/TheAbout.vue";
import TheReview from "../../components/HomeComponents/TheReview.vue";
import PublicLayout from "../../components/Layout/PublicLayout.vue";

export default {
    name: "TheHome",
    components: {PublicLayout, TheReview, TheAbout, TheServices},
    data() {
        return {
            showP: false,
        }
    },
}
</script>

<style scoped>


</style>
