import { CardDescription } from '@gamepark/react-game'
import { TarotCardRule } from './CardRule'
import Denali from '../images/01-Denali.jpg'
import { Card } from '@gamepark/tarot/Card'

export class TarotCardDescription extends CardDescription {
  width = 5
  height = 7

  backImage = Denali

  images = {
    [Card.Club1]: Denali
  }

  rules = TarotCardRule
}