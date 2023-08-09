import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { TarotCardDescription } from './CardDescription'

export const Material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Card]: new TarotCardDescription()
}
