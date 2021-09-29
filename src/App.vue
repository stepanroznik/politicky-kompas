<template>
    <navigation />
    <div class="text-center max-w-5xl m-auto mt-6 sm:mt-12 px-2">
        <router-view v-if="$store.state.parties?.length" />
        <loading v-else />
    </div>
</template>

<script>
import { apiGet } from './api';
import Loading from './components/Loading.vue';
import Navigation from './components/Navigation.vue';
import { getPartyOrientation } from './utils/calculations';

export default {
    components: {
        Navigation,
        Loading,
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

<style lang="postcss">
    body {
        overflow-y: scroll;
    }
</style>
