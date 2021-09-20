<template>
    <div class="grid grid-rows-3 sm:grid-cols-3">
        Nějaký text
        <div class="grid grid-rows-10 grid-cols-10 w-full border border-white">
            <template v-for="x in 10" :key="x">
                <template v-for="y in 10" :key="y">
                    <span
                        class="
                            border border-white
                            w-full
                            equal-height
                            transform
                            hover:scale-125
                            hover:z-10
                            hover:border-2
                            hover:-my-px
                            transition-all
                        "
                        :class="x <= 5 && y <= 5 ? 'bg-red-200' : x <= 5 && y > 5 ? 'bg-blue-200' : x > 5 && y <= 5 ? 'bg-green-200' : x > 5 && y > 5 ? 'bg-yellow-200' : ''"
                    >   <template v-for="party in parties" :key="party.id">
                            <span v-if="y === party.leftRight + 6 && x === party.topBottom + 6"
                                class="absolute text-center z-10">
                                {{ party.abbreviation }}
                            </span>    
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
        this.parties = await apiGet({ url: "parties" });
        this.parties = this.parties.map( party => {
            return { ...party, ...getPartyOrientation(party) }
        } )
        console.log(this.parties)
    }
});
</script>

<style scoped>
.equal-height {
    padding-bottom: calc(100% - 2px);
}
</style>
