import { IPartyWithOrientation } from '@/api';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default createStore({
    state: {
        answers: [] as any,
        parties: [] as IPartyWithOrientation[],
        quizCompleted: false as boolean
    },
    mutations: {
        // if a question has been answered before, the new answer replaces the previous one, otherwise another answer is added to the state.answers object
        answerQuestion(state, { Question, agreeLevel }) {
            const answerIndex: number = state.answers.findIndex((x: any) => x.Question?.id === Question.id);
            if (answerIndex === -1) state.answers.push({ Question, agreeLevel });
            else state.answers[answerIndex].agreeLevel = agreeLevel;
        },
        setParties(state, parties) {
            state.parties = parties;
        },
        completeQuiz(state) {
            state.quizCompleted = true;
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin],
});
