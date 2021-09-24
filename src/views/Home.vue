<template>
    <div class="grid grid-main">
        <div>Info 1 </div>
        <compass :parties="parties" />
        <div>Info 2</div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import Compass from '../components/Compass.vue';

export default defineComponent({
    name: 'Home',
    components: {
        Compass,
    },
    data: function() {
        return {
            parties: [] as any[],
        }},
    async created() {
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

<style scoped lang="postcss">
.grid-main {
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-columns: none
    }
@media (min-width: 640px) {
    .grid-main {
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: none
    }
}
</style>