import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { tarotCardDescription } from './CardDescription'

export const Material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Card]: tarotCardDescription
}
