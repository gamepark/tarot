import { isEnumValue } from "@gamepark/rules-api";

export enum Bid {
  Small = 1, 
  Guard,
  GuardWithoutTheKitty, 
  GuardAgainstTheKitty
}

export const bids = Object.values(Bid).filter<Bid>(isEnumValue)
