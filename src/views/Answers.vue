<template>
    <div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiGet } from '../api/index.ts';

export default defineComponent({
    name: 'answers',
    data: function () {
        return {
            parties: [],
            questions: [],
            answers: [],
        };
    },
    async created() {
        this.parties = apiGet({ url: 'parties' });
        this.questions = apiGet({ url: 'questions' });
        this.answers = apiGet({ url: 'answers' });
    },
});
</script>
