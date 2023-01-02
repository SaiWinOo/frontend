<template>
<div class="bg-secondary mt-auto min-h-[10vh] py-5 text-gray-50 ">
    <div class="grid grid-cols-3 mx-auto max-w-[300px]">
        <router-link to="/">
            <img class="h-[40px] hover:scale-75 transition-all" src="/src/assets/facebook.svg" alt="">
        </router-link>
        <router-link to="/">
            <img class="h-[40px] hover:scale-75 transition-all" src="/src/assets/linkedin.svg" alt="">
        </router-link>
        <router-link to="/">
            <img class="h-[40px] hover:scale-75 transition-all" src="/src/assets/github.svg" alt="">
        </router-link>
    </div>
    <p class="text-center text-xl mt-3">
        Copy Right © 2022 Sai Win Oo, All Rights Reserved.
    </p>
</div>
</template>

<script>
export default {
    name: "TheFooter",
}
</script>

<style scoped>

</style>
