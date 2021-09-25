<template>
    <div v-if="questions?.length">
        <div class="question lg:border rounded lg:border-gray-300 p-2 sm:p-4 mb-4 sm:mb-8 h-52 2xs:h-44 xs:h-36 lg:h-32 overflow-y-auto">
            <h2 class="text-base xs:text-lg font-medium py-2">
                {{ currentQuestion.title }}
            </h2>
            <div class="text-sm xs:text-base flex flex-row items-stretch">
                <span class="bg-gray-300 rounded-sm w-2 mr-2 my-1" />
                <h3 class="flex-1 text-left">
                    {{ currentQuestion.subtitle }}
                </h3>
            </div>
        </div>
        <div
            :key="currentQuestionIndex"
            class="answers flex flex-col sm:max-w-2xl m-auto"
        >
            <button
                class="border-2 border-solid active:outline-none answer col-al5 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '5') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('5')"
            >
                Rozhodně souhlasím
            </button>
            <button
                class="border-2 border-solid active:outline-none answer col-al4 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '4') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('4')"
            >
                Spíše souhlasím
            </button>
            <div class="flex flex-col xs:flex-row xs:gap-1 sm:flex-row sm:gap-1">
                <button
                    class="flex-1 border-2 border-solid active:outline-none answer col-al3 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                    :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '3') ? 'border-dashed border-gray-500' : 'border-transparent'"
                    type="button"
                    @click="answerQuestion('3')"
                >
                    Neutrální
                </button>
                <button
                    class="flex-1 border-2 border-solid active:outline-none answer col-al3 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                    :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '0') ? 'border-dashed border-gray-500' : 'border-transparent'"
                    type="button"
                    @click="answerQuestion('0')"
                >
                    Nevím
                </button>
            </div>
            <button
                class="border-2 border-solid active:outline-none answer col-al2 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '2') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('2')"
            >
                Spíše nesouhlasím
            </button>
            <button
                class="border-2 border-solid active:outline-none answer col-al1 text-white font-semibold uppercase text-sm px-6 py-1 sm:py-2.5 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '1') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('1')"
            >
                Rozhodně nesouhlasím
            </button>
        </div>
        <div class="py-4 sm:mt-4">
            <div
                :key="currentQuestionIndex"
                class="xs:p-2 grid grid-cols-3 sm:max-w-2xl mx-auto"
            >
                <span class="text-sm text-gray-300">
                    <button
                        class="p-1 border border-transparent active:outline-none rounded"
                        :class="{'hover:border-gray-400 text-gray-600': !isCurrentQuestionFirst}"
                        :disabled="isCurrentQuestionFirst"
                        @click="goToPreviousQuestion"
                    >
                        &lt; předchozí
                    </button>
                </span>
                <span class="p-1 text-lg text-gray-700">
                    Otázka {{ currentQuestionIndex + 1 }} z {{ questions.length }}
                </span>
                <span class="text-sm text-gray-300">
                    <button
                        v-if="!isCurrentQuestionLast"
                        class="p-1 border border-transparent active:outline-none rounded"
                        :class="{'hover:border-gray-400 text-gray-600': isCurrentQuestionAnswered && !isCurrentQuestionLast}"
                        :disabled="!isCurrentQuestionAnswered"
                        @click="goToNextQuestion"
                    >
                        další &gt;
                    </button>
                </span>
            </div>
            <div class="w-full rounded h-6 p-1 border border-gray-300">
                <div
                    class="progress-bar rounded-sm h-full bg-gray-300"
                    :style="{width: 100/(questions.length/(currentQuestionIndex+1)) + '%'}"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { apiGet } from '@/api';

export default {
    name: 'Quiz',
    data() {
        return {
            currentQuestionIndex: 0,
            questions: [],
        };
    },
    computed: {
        isCurrentQuestionFirst() {
            if (this.currentQuestionIndex === 0) return true;
            return false;
        },
        isCurrentQuestionLast() {
            if (this.currentQuestionIndex + 1 >= this.questions.length) return true;
            return false;
        },
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        isCurrentQuestionAnswered() {
            if (this.$store.state.answers.find((x) => x.Question.id === this.currentQuestion.id)?.agreeLevel) return true;
            return false;
        },
        currentQuestionAnswer() {
            if (this.isCurrentQuestionAnswered) return this.$store.state.answers.find((x) => x.Question.id === this.currentQuestion.id)?.agreeLevel;
            return false;
        },
    },
    async created() {
        this.questions = await apiGet({ url: 'questions'} );
        const q = parseInt(this.$route.query.q)
        if (q > 0 && q <= this.questions.length) {
            if (this.$store.state.answers.length >= q - 1) {
                this.currentQuestionIndex = q - 1
                return
            }
        }
        this.setCurrentQuestionQuery()
        
    },
    methods: {
        async setCurrentQuestionQuery() {
            await this.$router.push({ query: { q: this.currentQuestionIndex + 1 } })
        },
        goToPreviousQuestion() {
            if (!this.isCurrentQuestionFirst) {
                this.currentQuestionIndex -= 1;
                this.setCurrentQuestionQuery()
            }
        },
        async goToNextQuestion() {
            if (this.isCurrentQuestionAnswered && !this.isCurrentQuestionLast) {
                this.currentQuestionIndex += 1;
                this.setCurrentQuestionQuery()
                return 
            }
            if (this.isCurrentQuestionLast) {
                await this.$store.commit('completeQuiz');
                await this.$router.push({ name: 'Result' })
            }
        },
        async answerQuestion(agreeLevel) {
            await this.$store.commit('answerQuestion', { Question: {id: this.currentQuestion.id, position: this.currentQuestion.position }, agreeLevel });
            this.goToNextQuestion()
        },
    },
};
</script>

<style scoped lang="postcss">
    .progress-bar {
        transition: width 0.5s;
    }
    .answer {
        @apply opacity-85
    }
    .col-al1 {
        background-color: hsl(5, 80%, 60%);
    }
    .col-al1:hover {
        background-color: hsl(5, 80%, 50%);
    }
    .col-al1:active {
        background-color: hsl(5, 80%, 45%);
    }
    .col-al2 {
        background-color: hsl(20, 80%, 60%);
    }
    .col-al2:hover {
        background-color: hsl(20, 80%, 50%);
    }
    .col-al2:active {
        background-color: hsl(20, 80%, 45%);
    }
    .col-al3 {
        background-color: hsl(0, 0%, 60%);
    }
    .col-al3:hover {
        background-color: hsl(0, 0%, 50%);
    }
    .col-al3:active {
        background-color: hsl(0, 0%, 45%);
    }
    .col-al4 {
        background-color: hsl(80, 80%, 45%);
    }
    .col-al4:hover {
        background-color: hsl(80, 80%, 40%);
    }
    .col-al4:active {
        background-color: hsl(80, 80%, 35%);
    }
    .col-al5 {
        background-color: hsl(100, 80%, 45%);
    }
    .col-al5:hover {
        background-color: hsl(100, 80%, 40%);
    }
    .col-al5:active {
        background-color: hsl(100, 80%, 35%);
    }
</style>
