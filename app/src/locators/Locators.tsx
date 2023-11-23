import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { TarotDeckLocator } from './DeckLocator'
import { KittyLocator } from './KittyLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { TarotTableLocator } from './TableLocator'
import { TricksLocator } from './TricksLocator'
import { TableEndLocator } from './TableEndLocator'
import { PoigneeLocator } from './PoigneeLocator'
import { EcartLocator } from './EcartLocator'


export const Locators: Record<LocationType, ItemLocator<number, MaterialType, LocationType>> = {
  [LocationType.Deck]: new TarotDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Kitty]: new KittyLocator(),
  [LocationType.Table]: new TarotTableLocator(),
  [LocationType.Tricks]: new TricksLocator(),
  [LocationType.Ecart]: new EcartLocator(),
  [LocationType.TableEnd]: new TableEndLocator(),
  [LocationType.Poigne]: new PoigneeLocator(),
}
