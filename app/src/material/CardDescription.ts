import { CardDescription } from '@gamepark/react-game'
import { TarotCardRule } from './CardRule'

export class TarotCardDescription extends CardDescription {
  rules = TarotCardRule
}