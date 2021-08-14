
    export const state = () => ({
        answers: [],
    })
    export const mutations = {
        // if a question has been answered before, the new answer replaces the previous one, otherwise another answer is added to the state.answers object
        answerQuestion(state, { questionId, answer }) {
            const answerIndex = state.answers.findIndex((x) => x.id === questionId);
            console.log('ans. index:', answerIndex);
            if (answerIndex === -1) state.answers.push({ id: questionId, answer });
            else state.answers[answerIndex].answer = answer;
        }
    }
    export const actions = {
    }
    export const modules = {
    }
