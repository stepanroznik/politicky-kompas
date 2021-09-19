<template>
    <div class="">
        <div class="question lg:border rounded lg:border-gray-300 p-2 sm:p-4 mb-4 sm:mb-8 h-52 2xs:h-44 xs:h-36 lg:h-32 overflow-y-auto">
            <h2 class="text-base xs:text-lg font-medium py-2">
                {{ currentQuestion.heading }}
            </h2>
            <div class="text-sm xs:text-base flex flex-row items-stretch">
                <span class="bg-gray-300 rounded-sm w-2 mr-2 my-1" />
                <h3 class="flex-1 text-left">
                    {{ currentQuestion.subheading }}
                </h3>
            </div>
        </div>
        <div
            :key="currentQuestionIndex"
            class="answers flex flex-col sm:max-w-2xl m-auto"
        >
            <button
                class="border-2 border-solid active:outline-none bg-green-400 text-white hover:bg-green-500 active:bg-green-600 font-semibold uppercase text-sm px-6 py-1 sm:py-3 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '1') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('1')"
            >
                Rozhodně souhlasím
            </button>
            <button
                class="border-2 border-solid active:outline-none bg-lime-400 text-white hover:bg-lime-500 active:bg-lime-600 font-semibold uppercase text-sm px-6 py-1 sm:py-3 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '2') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('2')"
            >
                Spíše souhlasím
            </button>
            <button
                class="border-2 border-solid active:outline-none bg-blueGray-400 text-white hover:bg-blueGray-500 active:bg-blueGray-600 font-semibold uppercase text-sm px-6 py-1 sm:py-3 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '3') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('3')"
            >
                Nemůžu se rozhodnout / nevím
            </button>
            <button
                class="border-2 border-solid active:outline-none bg-amber-400 text-white hover:bg-amber-500 active:bg-amber-600 font-semibold uppercase text-sm px-6 py-1 sm:py-3 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '4') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('4')"
            >
                Spíše nesouhlasím
            </button>
            <button
                class="border-2 border-solid active:outline-none bg-rose-400 text-white hover:bg-rose-500 active:bg-rose-600 font-semibold uppercase text-sm px-6 py-1 sm:py-3 rounded mb-1 ease-linear transition-all duration-150"
                :class="(isCurrentQuestionAnswered && currentQuestionAnswer === '5') ? 'border-dashed border-gray-500' : 'border-transparent'"
                type="button"
                @click="answerQuestion('5')"
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
                        class="p-1 border border-transparent active:outline-none rounded"
                        :class="{'hover:border-gray-400 text-gray-600': isCurrentQuestionAnswered && !isCurrentQuestionLast}"
                        :disabled="!isCurrentQuestionAnswered || isCurrentQuestionLast"
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

export default {
    name: 'Compass',
    data() {
        return {
            currentQuestionIndex: 0,
            questions: [
                {
                    id: 1,
                    heading: 'ČR by měla usilovat o mezinárodní zákaz autonomních zbraní.',
                    subheading: 'Autonomní (samořídící se) zbraň je například ozbrojený dron vybavený umělou inteligencí, který dokáže samostatně vyhledávat a zabíjet lidi dle předem definovaných kritérií.',
                },
                {
                    id: 2,
                    heading: 'Podporuji tzv. rouškovné pro důchodce.',
                    subheading: 'Vláda navrhuje pro všechny důchodce jednorázový příspěvek 5000 Kč (verze z počátku září), který by měl dle jejích slov kompenzovat stres spojený s epidemií nového koronaviru. To by odpovídalo jednorázovému výdaji zhruba 18 miliard ze státního rozpočtu.',
                },
                {
                    id: 3,
                    heading: 'Chci X.',
                    subheading: 'X je písmeno.',
                },
                {
                    id: 4,
                    heading: 'Chci Y.',
                    subheading: 'Y je písmeno.',
                },
                {
                    id: 5,
                    heading: 'Chci Z.',
                    subheading: 'Z je písmeno.',
                },
                {
                    id: 6,
                    heading: 'Chci A.',
                    subheading: 'A je písmeno.',
                },
                {
                    id: 7,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 8,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 9,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 10,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 11,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 12,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 13,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 14,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 15,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 16,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 17,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 18,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 19,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 20,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 21,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 22,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 23,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
                {
                    id: 24,
                    heading: 'Chci B.',
                    subheading: 'B je písmeno.',
                },
            ],
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
        isCurrentQuestionAnswered() {
            if (this.$store.state.answers.find((x) => x.id === this.currentQuestion.id)?.answer) return true;
            return false;
        },
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        currentQuestionAnswer() {
            if (this.isCurrentQuestionAnswered) return this.$store.state.answers.find((x) => x.id === this.currentQuestion.id)?.answer;
            return false;
        },
    },
    methods: {
        answerQuestion(answer) {
            this.$store.commit('answerQuestion', { questionId: this.currentQuestion.id, answer });
            if (this.currentQuestionIndex + 1 < this.questions.length) this.currentQuestionIndex += 1;
        },
        goToPreviousQuestion() {
            if (!this.isCurrentQuestionFirst) this.currentQuestionIndex -= 1;
        },
        goToNextQuestion() {
            if (this.isCurrentQuestionAnswered && !this.isCurrentQuestionLast) this.currentQuestionIndex += 1;
        },
    },
};
</script>

<style scoped>
    .progress-bar {
        transition: width 0.5s;
    }
</style>
