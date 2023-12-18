import { ItemLocator } from '@gamepark/react-game'
import { PlayerReminderDescription } from './PlayerRemindDescription'


export class PlayerReminderLocator extends ItemLocator {

  locationDescription = new PlayerReminderDescription()
}