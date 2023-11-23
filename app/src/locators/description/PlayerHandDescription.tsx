/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/tarot/material/LocationType"
import { MaterialType } from "@gamepark/tarot/material/MaterialType"
import { LocationContext,LocationDescription, MaterialContext, getRelativePlayerIndex } from "@gamepark/react-game"
import { Location,  } from "@gamepark/rules-api"
import { Memory } from "@gamepark/tarot/rules/Memory"
import maxBy from 'lodash/maxBy'
import { css } from "@emotion/react"

export class PlayerHandDescription extends LocationDescription<number, MaterialType, LocationType> {
    width = 30
    height = 14
    borderRadius = 1
    alwaysVisible = true

    getSize(_location: Location, _context: MaterialContext) {
        return { 
            width: 13,
            height: 8,
        }
    }


    getCoordinates(location: Location, context: LocationContext) {
      const players = context.rules.players.length
      const angle = -90 + getRelativePlayerIndex(context, location.player) * 360 / players
      const radiusX = players === 5 ? 30 : players === 4 ? 30 : 20
      const radiusY = players === 5 ? 15 : players === 4 ? 15 : 10
      const x = Math.cos(angle * Math.PI / 180) * radiusX
      const y = -Math.sin(angle * Math.PI / 180) * radiusY
      return { x, y, z:0 }
    }
    
  
    getRotateZ(location: Location, context: LocationContext): number {
      const players = context.rules.players.length
      return getRelativePlayerIndex(context, location.player) * -360 / players
    }

    getLocations(context: MaterialContext) {
        const { rules } = context
        const { players } = rules
        if (rules.game.players.length === 5 && rules.remind(Memory.CalledPlayer)) return []
        return players.map((player) => ({ type: LocationType.Hand, player }))
    }

    getExtraCss(location: Location, context: LocationContext) {
        const { rules } = context
        const called = rules.remind(Memory.CalledPlayer)
        const caller = maxBy(rules.players, (player) => rules.remind(Memory.Bid, player))

        if (location.player === called || location.player === caller) {
            return callerPlayers
        }

        return otherPlayer
    }
  }

  const callerPlayers = css`
    background-color: #0000FF70
  `

  const otherPlayer = css`
    background-color: #FF000070
  `