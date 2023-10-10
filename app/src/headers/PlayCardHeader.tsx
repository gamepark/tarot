/** @jsxImportSource @emotion/react */
import { RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { PoigneeDialogContent } from './PoigneeDialogContent'

export const PlayCardHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  if (player === activePlayer) {
    return <MyPlayCardHeader/>
  } else {
    return <PlayerPlayCardHeader activePlayer={activePlayer}/>
  }
}

const MyPlayCardHeader = () => {
  const { t } = useTranslation()
  const poigneeMoves = useLegalMoves<CustomMove>(isCustomMoveType(CustomMoveType.Poignee))
  const [dialogOpen, setDialogOpen] = useState(poigneeMoves.length > 0)
  if (!poigneeMoves.length) {
    return <>{t('header.play.mine')}</>
  }
  return <>
    <Trans defaults="header.play.poignee"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} scrollbar>
      <PoigneeDialogContent close={() => setDialogOpen(false)}/>
    </RulesDialog>
  </>
}

const PlayerPlayCardHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(activePlayer)
  return <>{t('header.play', { player: playerName })}</>
}
