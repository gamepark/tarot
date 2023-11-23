/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/tarot/material/LocationType"
import { MaterialType } from "@gamepark/tarot/material/MaterialType"
import { LocationContext,LocationDescription, MaterialContext, getRelativePlayerIndex } from "@gamepark/react-game"
import { Location,  } from "@gamepark/rules-api"
import { Memory } from "@gamepark/tarot/rules/Memory"
import maxBy from 'lodash/maxBy'
import { css } from "@emotion/react"
import { tarotCardDescription } from "../../material/CardDescription"

export class PlayerHandDescription extends LocationDescription<number, MaterialType, LocationType> {
    width = 60
    height = 14
    borderRadius = 1
    alwaysVisible = true

    getSize(location: Location, context: MaterialContext) {
        return { 
            width: this.getWidth(location, context), 
            height: this.getHeight(location, context)
        }
    }

    getHeight(location: Location, context: MaterialContext) {
        const relativePlayerIndex = getRelativePlayerIndex(context, location.player)
        if (relativePlayerIndex === 0) return 16
        return 14
    }

    getWidth(location: Location, context: MaterialContext) {
        const players = context.rules.players.length
        const relativePlayerIndex = getRelativePlayerIndex(context, location.player)
        const count = context.rules.material(MaterialType.Card).location(LocationType.Hand).player(location.player).length
        const cardWidth = tarotCardDescription.width
        switch (players) {
          case 3:
            if (relativePlayerIndex === 1 || relativePlayerIndex === 2) {
              return count * cardWidth * 0.6
            }
            return 40
          case 4:
            if (relativePlayerIndex === 1 || relativePlayerIndex === 2 || relativePlayerIndex === 3) {
              return 20
            }
            return 30
        }
        if (relativePlayerIndex === 1 || relativePlayerIndex === 2 || relativePlayerIndex === 3 || relativePlayerIndex === 4) {
          return count * cardWidth * 0.4
        }
        return count * cardWidth * 0.7
    }
   

    getCoordinates(location: Location, context: LocationContext) {
      const players = context.rules.players.length
      const index =  getRelativePlayerIndex(context, location.player)
      const angle = -90 + index * 360 / players
      const radiusX = players === 5 ? 40 : players === 4 ? 40 : 30
      const radiusY = (players === 5 ? 27 : players === 4 ? 25 : 20)
      const x = Math.cos(angle * Math.PI / 180) * radiusX
      const y = -Math.sin(angle * Math.PI / 180) * radiusY
      return { x, y, z: 0 }
    }
    
  
    getRotateZ(location: Location, context: LocationContext): number {
      const players = context.rules.players.length
      return getRelativePlayerIndex(context, location.player) * -360 / players
    }

    getLocations(context: MaterialContext) {
        const { rules } = context
        const { players } = rules
        //if (!rules.remind(Memory.CalledPlayer)) return []
        console.log(players.map((player) => ({ type: LocationType.Hand, player })))
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
    background-color: #0000FF80
  `

  const otherPlayer = css`
    background-color: #FF000080
  `