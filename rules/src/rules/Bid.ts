import { isEnumValue } from "@gamepark/rules-api";

export enum Bid {
  Small = 1,
  Guard,
  GuardWithoutTheKitty = 4,
  GuardAgainstTheKitty = 6
}

export const bids = Object.values(Bid).filter<Bid>(isEnumValue)
