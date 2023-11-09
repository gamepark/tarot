import { isEnumValue } from "@gamepark/rules-api";

export enum Poignee {
    Simple = 1,
    Double,
    Triple,
}

export const poignees = Object.values(Poignee).filter<Poignee>(isEnumValue)
