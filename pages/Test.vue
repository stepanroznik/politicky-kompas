<template>
    <quiz/>
</template>

<script lang="ts">
import Vue from 'vue'
import Quiz from '../components/Quiz.vue';

export default Vue.extend({
    name: 'Test',
    components: { Quiz },
});

</script>
