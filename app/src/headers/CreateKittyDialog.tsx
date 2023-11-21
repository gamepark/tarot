/** @jsxImportSource @emotion/react */
import { RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { CustomMove, isCustomMove } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'

export const CreateKittyHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  if (player === activePlayer) {
    return <MyCreateKittyHeader />
  } else {
    return <PlayerCreateKittyHeader activePlayer={activePlayer} />
  }
}

const MyCreateKittyHeader = () => {
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  return <>
    <Trans defaults="header.createKitty.mine"><ThemeButton onClick={() => setDialogOpen(true)} /></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} css={dialogCss}>
    </RulesDialog>
  </>
}


const PlayerCreateKittyHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(activePlayer)
  return <>{t('header.createKitty', { player: playerName })}</>
}

const dialogCss = css`
  max-width: 100em;
  padding: 5em;

  > h2 {
    text-align: center;
    font-size: 4em;
    margin: 0;
  }

  > p {
    font-size: 3em;
    white-space: break-spaces;
  }
`
