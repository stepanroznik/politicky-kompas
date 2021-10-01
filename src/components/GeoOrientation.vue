<template>
    <div class="relative border-4 border-gray-400 rounded">
        <axis-label class="absolute left-0 top-14 z-20 -mt-4 transform lg:-translate-x-1/2">
            Západ
        </axis-label>
        <axis-label class="absolute right-0 top-14 z-20 -mt-4 transform lg:translate-x-1/2">
            Východ
        </axis-label>
        <div class="grid grid-cols-10 w-full h-full border border-white">
            <template
                v-for="x in 10"
                :key="x"
            >
                <span
                    class="
                            border border-white
                            relative
                            w-full
                            h-full
                            equal-height
                            not-hover:scale-110
                            transform
                            hover:z-10
                            not-hover:border-2
                            not-hover:-my-px
                            transition-all
                        "
                    :class="{
                        'square-blue' : x <= 5, 'square-red' : x >= 5}"
                >   <template
                    v-for="(party, index) in partiesSorted"
                    :key="party.id"
                >
                    <span
                        v-if="!party.isUser && x === index + 1"
                        class="group h-full w-full absolute block bg-contain border-2 rounded-md transform transition-all duration-150 hover:duration-300 scale-90 hover:scale-150 opacity-70 hover:opacity-100"
                        :class="{'bg-white' : !party.isUser, 'border-none': party.isUser}"
                        :style="{backgroundImage: party.isUser ? locationMarker : `url(${require(`@/assets/parties/${party.id}.png`)})`}"
                    >
                        <span
                            class="party-name transition-all opacity-0 group-hover:opacity-90 hidden group-hover:inline-block overflow-visible absolute bg-white rounded"
                        >
                            <span class="">{{ party.name }}</span>
                        </span>
                    </span>  
                    <span
                        v-else-if="party.isUser && x === index + 1"
                        class="h-full w-full absolute block bg-contain transform -translate-y-1 transition-all duration-150 hover:duration-300 z-30 scale-90 hover:scale-150 hover:-translate-y-4"
                        :style="{backgroundImage: `url(${locationMarker})`}"
                    />    
                </template>
                </span>
            </template>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import AxisLabel from './AxisLabel.vue';
import { getPartyOrientation } from '@/utils/calculations';
import locationMarker from '../assets/locationMarker.svg'

export default defineComponent({
    name: "GeoOrientation",
    components: { AxisLabel },
    props: {
        parties: {
            type: Array,
            required: true,
        }
    },
    data: function() {
        return {
            user: null as any,
            partiesSorted: [] as any[],
            locationMarker,
        };
    },
    computed: {},
    async created() {
        if ((this as any).$store.state.quizCompleted) {
            const answers = (this as any).$store.state.answers;
            this.user = getPartyOrientation(answers)
            console.log('User orientation:', this.user)
            this.partiesSorted = [ ...this.parties, {...this.user, isUser: true} ].sort((a: any, b: any) => b.eastWest - a.eastWest)
        }
    },
    methods: {}
});
</script>

<style scoped lang="postcss">
.equal-height {
    padding-bottom: calc(100% - 2px);
}

.square-red {
    @apply bg-red-200;
}
.square-red span {
    @apply border-red-200;
}
.square-blue {
    @apply bg-blue-200;
}
.square-blue span {
    @apply border-blue-200;
}
.square-green {
    @apply bg-green-200;
}
.square-green span {
    @apply border-green-200;
}
.square-yellow {
    @apply bg-yellow-200;
}
.square-yellow span {
    @apply border-yellow-200;
}
</style>
