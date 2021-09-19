<template>
    <div class="grid grid-rows-3 sm:grid-cols-3">
        <div>
            Info 1
        </div>
        <div class="grid grid-rows-10 grid-cols-10 w-full border border-white">
            <template
                v-for="x in 10"
                :key="x"
            >
                <template
                    v-for="y in 10"
                    :key="y"
                >
                    <span
                        class="border border-white w-full equal-height transform hover:scale-125 hover:z-10 hover:border-2 hover:-my-px transition-all"
                        :class="
                            (x<=5 && y<=5) ? 'bg-red-200' :
                            (x<=5 && y>5) ? 'bg-blue-200' :
                            (x>5 && y<=5) ? 'bg-green-200' :
                            (x>5 && y>5) ? 'bg-yellow-200' : ''
                        "
                    />
                </template>
            </template>
        </div>
        <div>
            Info 2
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Compass',
});
</script>

<style scoped>
    .equal-height {
        padding-bottom: calc(100% - 2px)
    }
</style>
