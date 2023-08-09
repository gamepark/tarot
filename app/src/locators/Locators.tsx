import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { TarotDeckLocator } from './DeckLocator'

export const Locators: Record<LocationType, ItemLocator<number, MaterialType, LocationType>> = {
  [LocationType.Deck]: new TarotDeckLocator(),
  [LocationType.Hand]: new TarotDeckLocator(),
  [LocationType.Kitty]: new TarotDeckLocator(),
  [LocationType.Trick]: new TarotDeckLocator(),
  [LocationType.TricksWon]: new TarotDeckLocator()
}
