<template>
    <img :src="imagePlaceholder" alt="profile-picture" :width="width" class="rounded-full aspect-square">
</template>

<script setup lang="ts">
import axios from 'axios';
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ src?: string; width?: string }>(), {
    width:"124"
})

const imagePlaceholder=ref("");

onMounted(async()=>{
    imagePlaceholder.value=
    axios
    .get(props?.src)
    .then(() => props.src)
    .catch(() =>  AvatarPlaceholder);
})

</script>

<style scoped></style>
