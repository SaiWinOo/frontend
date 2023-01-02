<template>
    <div class="min-h-[50vh] pt-40 pb-12 sm:pt-0">
        <h1 class="text-4xl text-center font-semibold font-mono">Services</h1>
        <div class="max-w-4xl gap-10 p-10 mx-auto grid grid-cols-1 sm:grid-cols-3">
            <div class="border text-center p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <img class="mx-auto hover:rotate-[360deg] transition-all" src="/src/assets/fast-delivery.svg" alt="">
                <h5 class="font-semibold text-xl my-2">FAST DELIVERY</h5>
                <p class="text-start text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                    aliquid animi deserunt ducimus eaque fugit harum, illum minima modi mollitia obcaecati o</p>
            </div>
            <div class="border text-center p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <img class="mx-auto hover:rotate-[360deg] transition-all" src="/src/assets/secure.svg" alt="">
                <h5 class="font-semibold text-xl my-2 ">SECURE</h5>
                <p class="text-start text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                    aliquid animi deserunt ducimus eaque fugit harum, illum minima modi mollitia obcaecati o</p>
            </div>
            <div class="border text-center p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <img class="mx-auto hover:rotate-[360deg] transition-all" src="/src/assets/handshake.svg" alt="">
                <h5 class="font-semibold text-xl my-2">CAN BE TRUSTED</h5>
                <p class="text-start text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                    aliquid animi deserunt ducimus eaque fugit harum, illum minima modi mollitia obcaecati o</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheServices"
}
</script>

<style scoped>

</style>
