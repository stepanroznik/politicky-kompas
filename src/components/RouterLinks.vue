<template>
    <ul class="flex flex-col md:flex-row list-none ml-auto">
        <li
            v-for="link in links"
            :key="link.name"
            class="nav-item"
        >
            <router-link
                :to="link.url"
                class="px-3 py-1 flex items-center text-base font-normal text-black border border-transparent rounded hover:border-gray-400 transition-all"
                @click="checkIfCanEnterAnswers(link.url)"
            >
                <span :class="(link.url === $route.path) ? 'border-b border-gray-400' : ''"> 
                    {{ link.name }} 
                    <template v-if="link.url === '/answers'">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 inline mb-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                v-if="$store.state.quizCompleted"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                            />
                            <path
                                v-else
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </template>
                </span>
            </router-link>
        </li>
    </ul>
    <modal
        :show="showAlert"
        message="Nenechte se ovlivnit názory druhých"
        text="Před zobrazením odpovědí jednotlivých politických stran si prosím vyplňte test podle svých skutečných názorů. Je to jen na pár minut. 😉"
        @close="showAlert = false"
    />
</template>

<script>
import Modal from './Modal.vue';
export default {
    name: 'RouterLinks',
    components: { Modal },
    data() {
        return {
            showAlert: false,
            links: [
                { name: 'Domů', url: '/' },
                { name: 'Spustit test', url: '/test' },
                { name: 'Odpovědi politických stran', url: '/answers' },
                { name: 'O aplikaci', url: '/about' },
            ],
        };
    },
    methods: {
        checkIfCanEnterAnswers(url) {
            if (url !== '/answers') return
            if (!this.$store.state.quizCompleted) {
                this.showAlert = true
            }
        }
    }
};
</script>
