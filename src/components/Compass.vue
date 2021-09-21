<template>
    <div class="grid grid-main">
        Nějaký text
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
                            hover:scale-125
                            transform
                            hover:z-10
                            hover:border-2
                            hover:-my-px
                            transition-all
                        "
                        :class="{
                            'square-red' : x <= 5 && y <= 5, 'square-blue' : x <= 5 && y > 5, 'square-green': x > 5 && y <= 5, 'square-yellow' : x > 5 && y > 5 }"
                    >   <template
                        v-for="party in parties"
                        :key="party.id"
                    >
                        <span
                            v-if="y === party.leftRight + 6 && x === party.topBottom + 6"
                            class="h-full w-full z-20 absolute block bg-contain border-2 rounded-md bg-white transform transition-transform duration-150 hover:duration-300 scale-90 hover:scale-150"
                            :style="{backgroundImage: `url(https://data.programydovoleb.cz/${party.logo})`}"
                        />    
                    </template>
                    </span>
                </template>
            </template>
        </div>
        <div>Info 2</div>
    </div>
</template>

<script lang="ts">
import { apiGet } from "@/api";
import { defineComponent } from "vue";
import axios from 'axios';

function getPartyOrientation(party: any) {
    const leftRightAnswers: any = [];
    const topBottomAnswers: any = [];
    party.Answers.forEach((answer: any) => {
        const agreeLevel = (answer.agreeLevel - 3) * 2.5;
        switch (answer.Question.position) {
        case "left":
            leftRightAnswers.push(agreeLevel * -1);
            break;
        case "right":
            leftRightAnswers.push(agreeLevel);
            break;
        case "top":
            topBottomAnswers.push(agreeLevel * -1);
            break;
        case "bottom":
            topBottomAnswers.push(agreeLevel);
            break;
        }
    });

    const lr = leftRightAnswers.reduce((a: any, b: any) => a + b, 0) / leftRightAnswers.length;
    const tb = topBottomAnswers.reduce((a: any, b: any) => a + b, 0) / topBottomAnswers.length;
    const leftRight = Math.floor(lr)
    const topBottom = Math.floor(tb)

    console.log("party", party.abbreviation, "leftRight:", leftRight, "topBottom:", topBottom);

    return { leftRight, topBottom }
}

export default defineComponent({
    name: "Compass",
    data: function() {
        return {
            parties: [] as any[]
        };
    },
    computed: {},
    async created() {
        this.parties = await apiGet({ url: "parties" , query: { 'include-answers': true }});
        this.parties = this.parties.map( party => {
            return { ...party, ...getPartyOrientation(party) }
        } )
        console.log(this.parties)
        await this.getPartiesDetail()
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
            })
        }
    }
});
</script>

<style scoped>
.equal-height {
    padding-bottom: calc(100% - 2px);
}
.grid-main {
        grid-template-rows: 1fr 2fr 1fr;
    }
@media (min-width: 640px) {
    .grid-main {
        grid-template-columns: 1fr 2fr 1fr;
    }
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
