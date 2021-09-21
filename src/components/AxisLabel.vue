<template>
    <span class="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium border-2 border-white bg-gray-500 text-gray-50">
        <slot />
    </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "Compass",

})
</script>
