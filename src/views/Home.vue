<template>
    <div class="home">
        <compass />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Compass from '../components/Compass.vue';

export default defineComponent({
    name: 'Home',
    components: {
        Compass,
    },
});
</script>
