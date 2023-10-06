/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'
import { ScoringDialog } from './headers/ScoringDialog'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-50} xMax={50} yMin={-30} yMax={30}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }} collisionAlgorithm={pointerWithin}/>
    <PlayerPanels/>

    <ScoringDialog/>

  </>
}
