import { isEnumValue } from "@gamepark/rules-api";

export enum Poignee {
    Simple = 1,
    Double,
    Triple,
}

export const poignees = Object.values(Poignee).filter<Poignee>(isEnumValue)




export function getPoigneeMinTrumps(numberPlayer: number): Record<Poignee, number> {
    switch (numberPlayer) {
        case 3:
            return {
                [Poignee.Simple]: 13,
                [Poignee.Double]: 15,
                [Poignee.Triple]: 18,
            }
        case 4:
            return {
                [Poignee.Simple]: 10,
                [Poignee.Double]: 13,
                [Poignee.Triple]: 15,
            }
        default:
            return {
                [Poignee.Simple]: 8,
                [Poignee.Double]: 10,
                [Poignee.Triple]: 13,
            }
    }
}
