<template>
    <div
        v-if="questions?.length && parties?.length"
        class="h-24"
    >
        <div>{{ questions[index].title }}</div>
        <span
            v-for="party in parties"
            :key="party.id"
        >
            <span class="inline-flex flex-col">
                {{ party.abbreviation }}
                <input
                    type="number"
                    max="5"
                    min="1"
                    class="w-16"
                    :value="answers.find((a) => a.QuestionId === currentQuestion.id && a.PartyId === party.id)?.agreeLevel"
                    @change="changeAgreeLevel(party.id, $event.target.value)"
                >
            </span>
        </span>
    </div>
    <a
        href="#"
        @click.prevent="index--"
    >
        Předchozí
    </a>
    <a
        href="#"
        @click.prevent="sendAnswers"
    >
        Odeslat
    </a>
    <a
        href="#"
        @click.prevent="index++"
    >
        Další
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiGet, apiPost } from '../api/index';

export default defineComponent({
    name: 'Answers',
    data: function () {
        return {
            index: 0,
            parties: [] as any[],
            questions: [] as any[],
            answers: [] as any[],
            newAnswers: [] as any[],
            modifiedAnswers: [] as any[],
        };
    },
    computed: {
        currentQuestion() {
            return (this as any).questions[(this as any).index]
        }
    },
    async created() {
        this.parties = await apiGet({ url: 'parties' });
        this.questions = await apiGet({ url: 'questions' });
        this.answers = await apiGet({ url: 'answers' });
    },
    methods: {
        changeAgreeLevel(partyId: number, value: string) {
            const currentQuestion: any = this.currentQuestion
            const existingAnswer = this.answers.find((a: any) => a.QuestionId === currentQuestion.id && a.PartyId === partyId)

            const existingNewAnswerIndex = this.newAnswers.findIndex((a: any) => a.QuestionId === currentQuestion.id && a.PartyId === partyId)
            if (existingNewAnswerIndex !== -1) this.newAnswers.splice(existingNewAnswerIndex, 1)
            const existingModifiedAnswerIndex = this.modifiedAnswers.findIndex((a: any) => a.QuestionId === currentQuestion.id && a.PartyId === partyId)
            if (existingModifiedAnswerIndex !== -1) this.modifiedAnswers.splice(existingModifiedAnswerIndex, 1)

            if (value) {
                const newAnswer = { PartyId: partyId, QuestionId: currentQuestion.id, agreeLevel: parseInt(value) }
                console.log('existing:', !!existingAnswer, 'answer:', newAnswer)
                if (!!existingAnswer) this.modifiedAnswers.push(newAnswer)
                else this.newAnswers.push(newAnswer)
            }
        },
        async sendAnswers() {
            console.log('sending these:', this.newAnswers)
            apiPost({url: 'answers', body: this.newAnswers});
            this.modifiedAnswers.forEach(a => {
                apiPost({url: `answers/${a.QuestionId}/${a.PartyId}`, body: a, method: 'PUT'})
            })
            this.newAnswers = [];
            this.modifiedAnswers = [];
            this.answers = await apiGet({ url: 'answers' });
        }
    },
});
</script>
