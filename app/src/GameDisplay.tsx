/** @jsxImportSource @emotion/react */
import { GameTable, useRules } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'
import { ScoringDialog } from './headers/ScoringDialog'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useTranslation } from 'react-i18next'
import { Memory } from '@gamepark/tarot/rules/Memory'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-50} xMax={50} yMin={-35} yMax={35}
      margin={{ top: 7, left: 0, right: 30, bottom: 0 }} collisionAlgorithm={pointerWithin}
      css={css`border: 1px solid white`} />


    <RoundNumber />

    <PlayerPanels />

    <ScoringDialog />

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
position:absolute;
right:3em;
bottom:2em;
> span {
  font-size: 4em;
}
`
