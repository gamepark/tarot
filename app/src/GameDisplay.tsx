/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { AcknowledgeKittyDialog } from './dialogs/AcknowledgeKittyDialog'
import { AcknowledgePoigneeDialog } from './dialogs/AcknowledgePoigneeDialog'
import { RoundSummaryDialog } from './dialogs/RoundSummaryDialog'
import { Summary } from './dialogs/Summary'
import { ScoringDialog } from './headers/ScoringDialog'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay({ players }: { players: number }) {
  const xMax = players === 5 ? 50 : players === 4 ? 53 : 57
  return <>
    <GameTable xMin={-xMax} xMax={xMax}
               verticalCenter
               yMin={players === 5 ? -31 : players === 4 ? -32 : -29} yMax={39}
               collisionAlgorithm={pointerWithin}
               //css={css`border: 1px solid white;`}
    >
      <GameTableNavigation css={navigationCss(players)}/>
      <AcknowledgeKittyDialog/>
      <AcknowledgePoigneeDialog/>
    </GameTable>
    <PlayerPanels/>
    <Summary />
    <ScoringDialog/>
    <RoundSummaryDialog />
  </>
}

const navigationCss = (players: number) => css`
  top: ${players === 4 ? 9 : 20}em;
  left: auto;
  right: 2em;
`
