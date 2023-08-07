import useQuizStore from "@/store";
import { apiGet } from "../common.api";
import { getPartyOrientation } from "@/utils/calculations";
import { ICompassOrientation } from "@/interfaces/compass-orientation.inteface";

export interface IParty {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    id: string;
    name: string;
    abbreviation: string;
}

export interface IPartyWithAnswers extends IParty {
    Answers: any[]
}

export type IPartyWithOrientation = IPartyWithAnswers & ICompassOrientation

export class PartyModel {
    static async fetchLatest() {
        const parties = await apiGet({ url: "parties" , query: { 'include-answers': true }}) as IPartyWithAnswers[];
        const partiesWithOrientation: IPartyWithOrientation[] = parties.map(party => {
            const orientation = getPartyOrientation(party.Answers);
            return { ...party, ...orientation};
        } );
        const store = useQuizStore();
        store.setParties(partiesWithOrientation);
    }
}