import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { TarotDeckLocator } from './DeckLocator'
import { EcartLocator } from './EcartLocator'
import { KittyLocator } from './KittyLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { PoigneeLocator } from './PoigneeLocator'
import { TableEndLocator } from './TableEndLocator'
import { TarotTableLocator } from './TableLocator'
import { TricksLocator } from './TricksLocator'


export const Locators: Partial<Record<LocationType, ItemLocator<number, MaterialType, LocationType>>> = {
  [LocationType.Deck]: new TarotDeckLocator(),
  [LocationType.Hand]: playerHandLocator,
  [LocationType.Kitty]: new KittyLocator(),
  [LocationType.Table]: new TarotTableLocator(),
  [LocationType.Tricks]: new TricksLocator(),
  [LocationType.Ecart]: new EcartLocator(),
  [LocationType.TableEnd]: new TableEndLocator(),
  [LocationType.Poigne]: new PoigneeLocator()
}
