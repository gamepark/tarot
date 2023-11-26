/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, SelectItem, isCustomMoveType, isSelectItemType } from '@gamepark/rules-api'
import { TarotRules } from '@gamepark/tarot/TarotRules'
//import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
//import { PoigneeDialogContent } from './PoigneeDialogContent'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'

export const PlayCardHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  if (player === activePlayer) {
    return <MyPlayCardHeader />
  } else {
    return <PlayerPlayCardHeader activePlayer={activePlayer} />
  }
}

const MyPlayCardHeader = () => {
  const { t } = useTranslation()
  const poigneeMoves = useLegalMoves<SelectItem | CustomMove>((move) => (isCustomMoveType(CustomMoveType.Poignee)(move) || isSelectItemType(MaterialType.Card)(move)))
  //const [dialogOpen, setDialogOpen] = useState(poigneeMoves.length > 0)
  if (!poigneeMoves.length) {
    return <>{t('header.play.mine')}</>
  }

  const poigneeMove = poigneeMoves.find(isCustomMoveType(CustomMoveType.Poignee))
  const selectItemMoves = poigneeMoves.filter(isSelectItemType(MaterialType.Card))
  if (poigneeMove && selectItemMoves.length > 0) {
    //Ajouter des cartes dans la poignée OU annoncer la poignée OU jouer une carte
    return (
      <PlayMoveButton move={poigneeMove}>
        {t('rules.poignee.or.play.card.or.reveal', { poignee: poigneeMove.data })}
      </PlayMoveButton>

    )
  } else if (poigneeMove) {
    return (
      <PlayMoveButton move={poigneeMove}>
        {t('rules.poignee.reveal', { poignee: poigneeMove.data })}
      </PlayMoveButton>
    )
  } else if (selectItemMoves) {
    // Ajouter des cartes dans la poignee OU jouer une carte  
    return (
      <>
        {t('rules.poignee.or.play.card')}
      </>
    )
  }



  return <>
    <Trans defaults="header.play.poignee"></Trans>
    {/*<RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      <PoigneeDialogContent close={() => setDialogOpen(false)}/>
    </RulesDialog>*/}
  </>
}

const PlayerPlayCardHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(activePlayer)
  return <>{t('header.play', { player: playerName })}</>
}
