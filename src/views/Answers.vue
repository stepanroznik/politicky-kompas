<template>
    <div class="h-24" v-if="questions?.length && parties?.length">
        <div>{{questions[index].title}}</div>
        <span v-for="party in parties" :key="party.id">
            <span class="inline-flex flex-col">
                {{party.abbreviation}}
                <input type="number" max="5" min="1" class="w-16">
            </span>
        </span>
    </div>
    <a href="#" @click="index++">
        Další
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiGet } from '../api/index';

export default defineComponent({
    name: 'answers',
    data: function () {
        return {
            index: 0,
            parties: [],
            questions: [],
            answers: [],
        };
    },
    async created() {
        this.parties = await apiGet({ url: 'parties' });
        this.questions = await apiGet({ url: 'questions' });
        this.answers = await apiGet({ url: 'answers' });
    },
});
</script>
