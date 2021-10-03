<template>
    <navigation />
    <div class="text-center max-w-5xl m-auto mt-6 sm:mt-12 px-2">
        <router-view v-if="$store.state.parties?.length" />
        <loading v-else />
    </div>
    <img
        class="sr-only"
        :src="compass"
    >
</template>

<script>
import { apiGet } from './api';
import Loading from './components/Loading.vue';
import Navigation from './components/Navigation.vue';
import { getPartyOrientation } from './utils/calculations';
import compass from './assets/compass.png'

export default {
    components: {
        Navigation,
        Loading,
    },
    data() {
        return {
            compass,
        };
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

.party-name > span {
    max-width: 6rem;
}
.party-name {
    border: 2px solid;
    text-align: center;
    font-weight: 600;
    font-size: 0.55rem;
    width: auto;
    padding: 0.1rem;
    width: 3.9rem;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
}
</style>
