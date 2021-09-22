<template>
    <div class="relative border-4 border-gray-400 rounded">
        <axis-label class="absolute -top-6 left-1/2 z-10 transform -translate-x-1/2">
            Autoritářsví
        </axis-label>
        <axis-label class="absolute -bottom-6 left-1/2 z-10 transform -translate-x-1/2">
            Libertariánství/osobní svoboda
        </axis-label>
        <axis-label class="absolute left-0 top-1/2 z-10 -mt-4 transform sm:-translate-x-1/2">
            Levice
        </axis-label>
        <axis-label class="absolute right-0 top-1/2 z-10 -mt-4 transform sm:translate-x-1/2">
            Pravice
        </axis-label>
        <div class="grid grid-rows-10 grid-cols-10 w-full h-full border border-white">
            <template
                v-for="x in 10"
                :key="x"
            >
                <template
                    v-for="y in 10"
                    :key="y"
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
                            'square-red' : x <= 5 && y <= 5, 'square-blue' : x <= 5 && y > 5, 'square-green': x > 5 && y <= 5, 'square-yellow' : x > 5 && y > 5, 'z-30': user && y === user.leftRight + 6 && x === user.topBottom + 6 }"
                    >   <template
                            v-for="party in parties"
                            :key="party.id"
                        >
                            <span
                                v-if="y === party.leftRight + 6 && x === party.topBottom + 6"
                                class="h-full w-full absolute block bg-contain border-2 rounded-md bg-white transform transition-all duration-150 hover:duration-300 scale-90 hover:scale-150 opacity-70 hover:opacity-100"
                                :style="{backgroundImage: `url(https://data.programydovoleb.cz/${party.logo})`}"
                            />    
                        </template>
                        <span
                            v-if="user && y === user.leftRight + 6 && x === user.topBottom + 6"
                            class="h-full w-full absolute block bg-contain transform -translate-y-1 transition-all duration-150 hover:duration-300 z-30 scale-90 hover:scale-150 hover:-translate-y-4"
                            :style="{backgroundImage: `url(${locationMarker})`}"
                        />  
                    </span>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import axios from 'axios';
import AxisLabel from './AxisLabel.vue';
import { getPartyAgreePercentage, getPartyOrientation } from '@/utils/calculations';
import locationMarker from '../assets/locationMarker.svg'

export default defineComponent({
    name: "Compass",
    components: { AxisLabel },
    data: function() {
        return {
            parties: [] as any[],
            user: null as any,
            locationMarker,
        };
    },
    computed: {},
    async created() {
        this.parties = (this as any).$store.state.parties
        await this.getPartiesDetail()
        console.log((this as any).$store.state.quizCompleted)
        if ((this as any).$store.state.quizCompleted) {
            const answers = (this as any).$store.state.answers;
            this.user = getPartyOrientation(answers)
            console.log('User orientation:', this.user)
        }
    },
    methods: {
        async getPartiesDetail() {
            const partiesExternal = (
                await axios.get(
                    'https://2021.programydovoleb.cz/lib/app/api.php?action=party/list'
                )
            ).data.list;
            this.parties.forEach(party => {
                const partyIndex = this.parties.findIndex((p) => p.id === party.id);
                const partyExternal = partiesExternal.find((p: any) => p.hash === party.externalId )
                console.log(partyExternal.logo);
                this.parties[partyIndex].color = partyExternal.color;
                this.parties[partyIndex].logo = partyExternal.logo;

                if ((this as any).$store.state.quizCompleted) {
                    const pp = getPartyAgreePercentage(party.Answers, (this as any).$store.state.answers)
                    console.log(party.name, pp, '%')
                }
            })
        }
    }
});
</script>

<style scoped>
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
