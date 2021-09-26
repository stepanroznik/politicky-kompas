<template>
    <div class="about leading-6 text-left">
        <h2 class="text-xl font-semibold pb-8">
            Politický kompas Politica.cz je volební kalkulačka, která se snaží být především srozumitelná a zábavná.
        </h2>
        <div class="grid sm:grid-cols-2">
            <div class="flex flex-col gap-6 text-md">
                <p>
                    Hlavní motivací k jejímu vytvoření byly negativní zkušenosti lidí v mém okolí s ostatními volebními kalkulačkami, u kterých měli většinou problém udržet pozornost a mnohým otázkám nerozuměli. 
                </p>
                <p>
                    Tímto projektem se snažím více zpřístupnit politiku lidem, kteří se o ni dříve nezajímali a v nejlepším případě je dostat k volbám.
                </p>
                <p>
                    Téměř všechny otázky a odpovědi na ně vykrádám z webů jiných politických kalkulaček, jmenovitě:
                    <a
                        v-for="website in websites"
                        :key="website"
                        :href="'https://' + website"
                        class="block"
                    >
                        {{ website }}
                    </a>
                    Snažím se přitom vybírat hlavně takové otázky, které pochopí opravdu každý a formulovat je co nejsrozumitelněji.
                </p>
                <p>
                    V rozmístění politických stran na kompas jsem se inspiroval podle 
                    <a
                        href="https://www.politicalcompass.org/"
                        class="border-b border-gray-800"
                    > politicalcompass.org</a> a 
                    <a
                        href="https://www.idnes.cz/zpravy/domaci/politicky-kompas-prvni-zjisteni.A160911_141109_domaci_jw"
                        class="border-b border-gray-800"
                    >starého projektu iDNES</a>.
                </p>
            </div>
            <div
                class="bg-contain bg-no-repeat bg-center"
                :style="{backgroundImage: `url(${aboutImage})`}"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import aboutImage from '../assets/compass.png'

export default defineComponent({
    name: 'About',
    data: function() {
        return {
            websites: ['programydovoleb.cz', 'irozhlas/whatever'] as string[],
            aboutImage
        }},
});
</script>