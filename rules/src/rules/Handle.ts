import { isEnumValue } from "@gamepark/rules-api";

export enum Handle {
Simple = 1,
Double,
Triple
}

export const handles = Object.values(Handle).filter<Handle>(isEnumValue)
