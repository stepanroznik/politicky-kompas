<template>
    <div class="grid grid-main">
        <div>Info 1 </div>
        <compass />
        <div>Info 2</div>
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

<style scoped>
.grid-main {
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-columns: none
    }
@media (min-width: 640px) {
    .grid-main {
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: none
    }
}
</style>