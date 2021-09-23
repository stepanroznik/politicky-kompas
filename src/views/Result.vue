<template>
    <div class="grid grid-row-2 md:grid-cols-2">
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Podle umístění na kompase:
            </h3>
            <div class="py-8 pr-8">
                <compass :parties="parties" />
            </div>
        </div>
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Podle procentuální shody:
            </h3>
            <comparison :parties="parties" />
        </div>
    </div>
</template>

<script lang="ts">
import Compass from "@/components/Compass.vue";
import Comparison from "@/components/Comparison.vue";
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
    name: 'Result',
    components: { Compass, Comparison },
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