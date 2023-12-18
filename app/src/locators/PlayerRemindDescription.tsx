/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { ItemContext, LocationContext, LocationDescription, MaterialContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Location} from '@gamepark/rules-api'
import { PlayerReminder } from './PlayerReminder'

export class PlayerReminderDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1
  alwaysVisible = true

  getLocations(context: MaterialContext): Location[] {
    return context.rules.players.filter(p => p !== context.player).map((player) => ({
      type: LocationType.PlayerReminder,
      player
    }))
  }

  getCoordinates(location: Location, context: LocationContext) {
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, location.player) * 360 / players
    const radiusX = players === 5 ? 40 : players === 4 ? 40 : 30
    const radiusY = players === 5 ? 25 : players === 4 ? 25 : 20
    const x = Math.cos(angle * Math.PI / 180) * (radiusX +2)
    const y = -Math.sin(angle * Math.PI / 180) * (radiusY +2)
    return { x, y, z: 20 }
  }

  getRotateZ(location:Location<number, number>, context: LocationContext): number {
    const players = context.rules.players.length
      const angle = getRelativePlayerIndex(context, location.player) * -360 / players
    return  angle > -270 && angle < -90 ? angle+180 : angle
  }



  getBoardIndex(location: Location, { player, rules }: ItemContext) {
    if (!player) return rules.players.indexOf(location.player!)
    if (player && player === location.player) return 0
    const remainingPlayers = rules.players.filter((p) => p !== player)
    if (remainingPlayers.length === 1) return 1
    return remainingPlayers.indexOf(location.player!) + 1
  }


  content = PlayerReminder

}