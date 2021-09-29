<template>
    <dl class="mt-5 md:p-5 grid grid-cols-1 gap-3 text-left">
        <div
            v-for="result, index in results"
            :key="result.party.id"
            class="py-2.5 px-4 border-4 bg-gray-200 rounded overflow-hidden relative flex flex-row items-center"
        >   
            <span 
                class="flex flex-shrink-0 w-12 h-12 bg-contain border-2 border-white bg-white rounded-md mr-2.5"
                :style="{backgroundImage: `url(${require(`@/assets/parties/${result.party.id}.png`)})`}"
            />
            <span class="flex flex-col">
                <dt class="text-md font-medium text-gray-500 truncate">
                    <span class="hidden sm:block md:hidden lg:block">{{ result.party.name }}</span>
                    <span class="block sm:hidden md:block lg:hidden">{{ result.party.abbreviation }}</span>
                </dt>
                <dd class="mt-0.5 text-2xl font-semibold text-gray-700">
                    {{ result.percentage }} %
                </dd>
            </span>
            <span 
                v-if="!index"
                class="h-10 w-10 block absolute right-4 top-1/2 transform -translate-y-1/2"
                :style="{backgroundImage: `url(${locationMarker})`}"
            />
        </div>
    </dl>
</template>

<script lang="ts">
import { getPartyAgreePercentage } from "@/utils/calculations";
import { defineComponent } from "@vue/runtime-core";
import locationMarker from '../assets/locationMarker.svg'

export default defineComponent({
    name: 'Comparison',
    props: {
        parties: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            results: [] as any,
            locationMarker
        };
    },
    computed: {},
    async created() {
        if (!(this as any).$store.state.quizCompleted) {
            this.$router.push({ name: 'Test' })
        }
        (this as any).parties.forEach((party: any) => {
            const percentage = getPartyAgreePercentage(party.Answers, (this as any).$store.state.answers)
            this.results.push({party, percentage})
        })
        this.results.sort((a: any, b: any) => b.percentage - a.percentage)
    }
});
</script>