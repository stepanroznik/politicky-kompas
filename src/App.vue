<template>
    <navigation />
    <div class="text-center max-w-5xl m-auto my-4 sm:my-8">
        <router-view />
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
    components: {
        Navigation,
    },
};
</script>

<style>
    body {
        overflow-y: scroll;
    }
</style>
