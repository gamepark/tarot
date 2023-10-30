/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'
import { ScoringDialog } from './headers/ScoringDialog'
import { css } from '@emotion/react'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-50} xMax={50} yMin={-40} yMax={40}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }} collisionAlgorithm={pointerWithin}
               css= {css`border: 1px solid red`}/>
               
    <PlayerPanels/>

    <ScoringDialog/>

  </>
}
