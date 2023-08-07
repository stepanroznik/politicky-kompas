<template>
    <div
        v-if="questions.length"
        class="max-w-5xl"
    >
        <quiz :questions="questions" />
    </div>
    <loading v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Quiz from '../components/Quiz.vue';
import { apiGet } from "@/api";
import Loading from '@/components/Loading.vue';

const questions = ref([]);

(async () => {
    questions.value = await apiGet({ url: "questions" });
})();
</script>
