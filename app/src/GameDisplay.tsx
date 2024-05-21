/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, useRules } from '@gamepark/react-game'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useTranslation } from 'react-i18next'
import { AcknowledgeKittyDialog } from './dialogs/AcknowledgeKittyDialog'
import { PoigneeValidation } from './dialogs/PoigneeValidation'
import { ScoringDialog } from './headers/ScoringDialog'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay({ players }: { players: number }) {
  const xMax = players === 5 ? 50 : players === 4 ? 53 : 57
  return <>
    <GameTable xMin={-xMax} xMax={xMax}
               yMin={players === 5 ? -31 : players === 4 ? -32 : -29} yMax={39}
               collisionAlgorithm={pointerWithin} css={css`border: 1px solid white;`}>
      <GameTableNavigation css={navigationCss(players)}/>
      <AcknowledgeKittyDialog/>
    </GameTable>
      <PoigneeValidation />
    <RoundNumber/>
    <PlayerPanels/>
    <ScoringDialog/>
  </>
}


const RoundNumber = () => {
  const rules = useRules<TarotRules>()
  const { t } = useTranslation()
  if (!rules) {
    return null
  }
  return <div css={roundCss}><span>{t('round', { round: rules.remind(Memory.Round), total: 4 })}</span></div>
}


const roundCss = css`
  position: absolute;
  right: 3em;
  bottom: 2em;

  > span {
    font-size: 4em;
  }
`

const navigationCss = (players: number) => css`
  top: ${players === 4 ? 9 : 20}em;
  left: auto;
  right: 2em;
`
