<template>
    <div class="w-full">
        <Header/>
        <div class="relative z-50 p-4 -mt-4 bg-neutral-white rounded-t-2xl">
            <IntroductionVideo/>
            <Statistics/>
            <Rating/>
            <Comments/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Header,IntroductionVideo,Statistics,Rating,Comments} from '../components';
</script>

<style scoped>

</style>