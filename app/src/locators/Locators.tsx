import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { TarotDeckLocator } from './DeckLocator'
import { KittyLocator } from './KittyLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { TarotTableLocator } from './TableLocator'

export const Locators: Record<LocationType, ItemLocator<number, MaterialType, LocationType>> = {
  [LocationType.Deck]: new TarotDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Kitty]: new KittyLocator(),
  [LocationType.Table]: new TarotTableLocator(),
  [LocationType.Trick]: new TarotDeckLocator(),
  [LocationType.TricksWon]: new TarotDeckLocator()
  
}
