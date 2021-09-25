<template>
    <div class="about text-left flex flex-col leading-6 gap-4">
        <h2 class="text-xl font-semibold">
            Politický kompas Politica.cz je politická kalkulačka, která se snaží být především srozumitelná a zábavná.
        </h2>
        <p>
            Hlavní motivací k jejímu vytvoření byly negativní zkušenosti lidí v mém okolí s ostatními volebními kalkulačkami, u kterých měli většinou problém udržet pozornost a mnohým otázkám nerozuměli. 
        </p>
        <p>
            Tímto projektem se snažím více zpřístupnit politiku lidem, kteří se o ni dříve nezajímali.
        </p>
        <p>
            Téměř všechny otázky a odpovědi na ně vykrádám z webů jiných politických kalkulaček, jmenovitě:
            <span v-for="website in websites" :key="website" class="block">
                {{ website }}
            </span>
            Snažím se přitom vybírat hlavně takové otázky, které pochopí opravdu každý a formulovat je co nejsrozumitelněji.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'About',
    data: function() {
        return {
            websites: ['programydovoleb.cz', 'irozhlas/whatever'] as string[],
        }},
});
</script>