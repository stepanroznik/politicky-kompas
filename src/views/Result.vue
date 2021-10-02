<template>
    <div class="grid md:grid-cols-2 gap-8 md:gap-4">
        <div class="flex flex-col md:grid grid-rows-2 gap-12">
            <div class="">
                <h3 class="text-lg leading-6 font-medium text-gray-900 pb-10">
                    Podle umístění na kompase:
                </h3>
                <compass :parties="parties" />
            </div>
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 pb-4">
                    Podle směřování na západ/východ:
                </h3>
                <geo-orientation :parties="parties" />
            </div>
        </div>
        <div class="pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Podle procentuální shody:
            </h3>
            <comparison :parties="parties" />
            <router-link
                to="/answers"
                class="underline my-2"
            >
                Zobrazit odpovědi politických stran
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Compass from "@/components/Compass.vue";
import Comparison from "@/components/Comparison.vue";
import { defineComponent } from "@vue/runtime-core";
import GeoOrientation from "@/components/GeoOrientation.vue";

export default defineComponent({
    name: 'Result',
    components: { Compass, Comparison, GeoOrientation },
    data: function() {
        return {
            parties: [] as any[],
        }},
    computed: {},
    async created() {
        if (!(this as any).$store.state.quizCompleted) {
            this.$router.push({ name: 'Test' })
        }
        this.parties = (this as any).$store.state.parties
    },
    methods: {}
});
</script>