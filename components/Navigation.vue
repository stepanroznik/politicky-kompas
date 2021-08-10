<template>
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-1">
        <div class="container mx-auto flex flex-wrap items-center justify-between max-w-7xl border-b border-gray-400">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start px-4">
                <router-link to="/" class="text-lg font-semibold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-black">
                    Politický kompas
                </router-link>
                <button class="text-lg font-semibold text-black leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    @click="toggleNavbar()">
                <!-- <MenuIcon class="h-5 w-5"/> -->
                </button>
            </div>
            <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
                <router-links/>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
// import { MenuIcon } from '@heroicons/vue/solid';
import RouterLinks from './RouterLinks.vue';

export default Vue.extend({
    components: {
        RouterLinks,
        //MenuIcon,
    },
    name: 'navigation',
    data() {
        return {
            showMenu: false,
        };
    },
    methods: {
        toggleNavbar() {
            this.showMenu = !this.showMenu;
        },
    },
});
</script>
