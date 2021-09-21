<template>
    <navigation />
    <div class="text-center max-w-5xl m-auto my-4 sm:my-8">
        <router-view v-if="$store.state.parties?.length" />
        <div v-else>
            Načítání
        </div>
    </div>
</template>

<script>
import { apiGet } from './api';
import Navigation from './components/Navigation.vue';
import { getPartyOrientation } from './utils/calculations';

export default {
    components: {
        Navigation,
    },
    async created() {
        const partiesRaw = await apiGet({ url: "parties" , query: { 'include-answers': true }});
        const parties = partiesRaw.map( party => {
            return { ...party, ...getPartyOrientation(party.Answers) }
        } )
        console.log(parties)
        this.$store.commit('setParties', parties)
    }
};
</script>

<style>
    body {
        overflow-y: scroll;
    }
</style>
