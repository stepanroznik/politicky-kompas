import { IPartyWithOrientation } from '@/api';
import { defineStore } from "pinia";
import 'pinia-plugin-persistedstate';

export const useQuizStore = defineStore("quiz", {
    state: () => ({
        answers: [] as any,
        parties: [] as IPartyWithOrientation[],
        quizCompleted: false
    }),
    actions: {
        // if a question has been answered before, the new answer replaces the previous one, otherwise another answer is added to the state.answers object
        answerQuestion(Question: /* TODO */ {id: any; }, agreeLevel: number) {
            const answerIndex: number = this.answers.findIndex((x: any) => x.Question?.id === Question.id);
            if (answerIndex === -1) this.answers.push({ Question, agreeLevel });
            else this.answers[answerIndex].agreeLevel = agreeLevel;
        },
        setParties(parties: IPartyWithOrientation[]) {
            this.parties = parties;
        },
        completeQuiz() {
            this.quizCompleted = true;
        }
    },
});

export default useQuizStore;
