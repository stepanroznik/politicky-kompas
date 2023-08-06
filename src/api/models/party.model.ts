import store from "@/store";
import { apiGet } from "../common.api";
import { getPartyOrientation } from "@/utils/calculations";

export interface IParty {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    id: string;
    name: string;
    abbreviation: string;
}

export interface IPartyWithAnswers extends IParty {
    Answers: []
}

export interface IPartyWithOrientation extends IPartyWithAnswers {
    leftRight: number;
    topBottom: number;
    eastWest: number;
}

export class PartyModel {
    static async fetchLatest() {
        const parties = await apiGet({ url: "parties" , query: { 'include-answers': true }}) as IPartyWithAnswers[];
        const partiesWithOrientation: IPartyWithOrientation[] = parties.map(party => {
            const orientation = getPartyOrientation(party.Answers);
            return { ...party, ...orientation};
        } );
        store.commit('setParties', partiesWithOrientation);
    }
}