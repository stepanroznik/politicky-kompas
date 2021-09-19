<template>
    <ul class="flex flex-col lg:flex-row list-none ml-auto">
        <li
            v-for="link in links"
            :key="link.name"
            class="nav-item"
        >
            <router-link
                :to="link.url"
                class="px-3 py-1 flex items-center text-base font-normal text-black border border-transparent rounded hover:border-gray-400 transition-all"
            >
                <span :class="(link.url === $route.path) ? 'border-b border-gray-400' : ''"> {{ link.name }} </span>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'RouterLinks',
    data() {
        return {
            links: [
                { name: 'Domů', url: '/' },
                { name: 'Spustit test', url: '/test' },
                { name: 'O aplikaci', url: '/about' },
                { name: '/answers', url: '/answers' },
            ],
        };
    },
};
</script>
