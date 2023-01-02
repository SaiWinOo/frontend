<template>
    <div class="min-h-[50vh] mb-10">
        <h1 class="text-4xl text-center font-semibold font-mono">What people say about us!</h1>
        <div class="max-w-5xl gap-10 p-10 mx-auto grid grid-cols-1 sm:grid-cols-3">
            <div class="border text-center shadow-xl p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <p class="special text-start text-gray-600"><span class="text-secondary text-4xl">❝</span> Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi deserunt ducimus eaque fugit
                    harum, illum minima modi mollitia obcaecati.</p>
                <div class="flex items-center mt-3">
                    <img class="h-[50px] w-[50px] object-cover mr-2 rounded-full " src="/src/assets/myself.jpg" alt="">
                    <p>Sai Win Oo</p>
                </div>
            </div>
            <div class="border text-center shadow-xl p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <p class="special text-start text-gray-600"><span class="text-secondary text-4xl">❝</span> Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi deserunt ducimus eaque fugit
                    harum, illum minima modi mollitia obcaecati.</p>
                <div class="flex items-center mt-3">
                    <img class="h-[50px] w-[50px] object-cover mr-2 rounded-full " src="/src/assets/princess.jpg"
                         alt="">
                    <p>Leonor</p>
                </div>
            </div>
            <div class="border text-center shadow-xl p-3 rounded-xl custom_shadow hover:shadow-2xl">
                <p class="special text-start text-gray-600"><span class="text-secondary text-4xl">❝</span> Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit. Aliquam aliquid animi deserunt ducimus eaque fugit
                    harum, illum minima modi mollitia obcaecati.</p>
                <div class="flex items-center mt-3">
                    <img class="h-[50px] w-[50px] object-cover mr-2 rounded-full " src="/src/assets/chineseActress.jpg"
                         alt="">
                    <p>Zhang Jing Yi</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheReview",
}
</script>

<style scoped>

</style>
