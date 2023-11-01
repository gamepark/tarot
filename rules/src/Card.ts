import { isEnumValue } from '@gamepark/rules-api'

export enum Card {
  Trump1 = 1,
  Trump2,
  Trump3,
  Trump4,
  Trump5,
  Trump6,
  Trump7,
  Trump8,
  Trump9,
  Trump10,
  Trump11,
  Trump12,
  Trump13,
  Trump14,
  Trump15,
  Trump16,
  Trump17,
  Trump18,
  Trump19,
  Trump20,
  Trump21,
  Excuse,
  Heart1 = 101,
  Heart2,
  Heart3,
  Heart4,
  Heart5,
  Heart6,
  Heart7,
  Heart8,
  Heart9,
  Heart10,
  HeartJack,
  HeartKnight,
  HeartQueen,
  HeartKing,
  Diamond1 = 201,
  Diamond2,
  Diamond3,
  Diamond4,
  Diamond5,
  Diamond6,
  Diamond7,
  Diamond8,
  Diamond9,
  Diamond10,
  DiamondJack,
  DiamondKnight,
  DiamondQueen,
  DiamondKing,
  Club1 = 301,
  Club2,
  Club3,
  Club4,
  Club5,
  Club6,
  Club7,
  Club8,
  Club9,
  Club10,
  ClubJack,
  ClubKnight,
  ClubQueen,
  ClubKing,
  Spade1 = 401,
  Spade2,
  Spade3,
  Spade4,
  Spade5,
  Spade6,
  Spade7,
  Spade8,
  Spade9,
  Spade10,
  SpadeJack,
  SpadeKnight,
  SpadeQueen,
  SpadeKing,
}

export const cards = Object.values(Card).filter<Card>(isEnumValue)

export const isTrump = (card: Card) => card <= 22
export const isTrumpValue = (card: Card) => card <= 21
export const isSameColor = (card1: Card, card2: Card) => Math.floor(card1 / 100) === Math.floor(card2 / 100) && card1 >= 100
export const isColor = (card: Card) => card >= 100
export const isJack = (card:Card) => card === 111 || card === 211 || card === 311 || card === 411
export const isKnight = (card:Card) => card === 112 || card === 212 || card === 312 || card === 412
export const isQueen = (card:Card) => card === 113 || card === 213 || card === 313 || card === 413
export const isKing = (card:Card) => card === 114 || card === 214 || card === 314 || card === 414
export const isOudler = (card:Card) => card === 1 || card === 21 || card === 22
export const excuse = (card:Card) =>  card === 22
export const petit = (card:Card) =>  card === 1
export const heartKing = (card:Card) => card === 114
export const diamondKing = (card:Card) => card === 214
export const clubKing = (card:Card) => card === 314
export const spadeKing = (card:Card) => card === 414



export function cardValue (card:Card) : number {
  if (isJack(card)) {
    return 1.5
  }
  if (isKnight(card)) {
    return 2.5
  }
  if (isQueen(card)) {
    return 3.5
  }
  if (isKing(card)) {
    return 4.5
  }

  if (isOudler(card)) {
    return 4.5
  }

  return 0.5
}

