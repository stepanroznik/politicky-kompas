import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default createStore({
    state: {
        answers: [] as any,
    },
    mutations: {
        // if a question has been answered before, the new answer replaces the previous one, otherwise another answer is added to the state.answers object
        answerQuestion(state, { questionId, answer }) {
            const answerIndex: number = state.answers.findIndex((x: any) => x.id === questionId);
            console.log('ans. index:', answerIndex);
            if (answerIndex === -1) state.answers.push({ id: questionId, answer });
            else state.answers[answerIndex].answer = answer;
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [vuexLocal.plugin],
});
