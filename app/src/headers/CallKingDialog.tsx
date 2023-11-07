/** @jsxImportSource @emotion/react */
import { MaterialComponent, RulesDialog, ThemeButton, useLegalMoves, usePlay, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { CustomMove, isCustomMove } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

export const CallKingHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!

  if (player === activePlayer) {
    return <MyCallKingHeader />
  } else {
    return <PlayerChelemHeader activePlayer={activePlayer} />
  }
}

const MyCallKingHeader = () => {
  const play = usePlay()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  return <>
    <Trans defaults="header.callKing.mine"><ThemeButton onClick={() => setDialogOpen(true)} /></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} css={dialogCss}>
      <h2><Trans defaults="header.callKing.choice"><span /></Trans></h2>
      

      <ul css={cardsListCss}>
          {legalMoves.map(move =>
            <li key={move.data}>
              <MaterialComponent type={MaterialType.Card} id={move.data} onClick={() => play(move)}/>
            </li>
          )}
        </ul>
    </RulesDialog>
  </>
}


const PlayerChelemHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(activePlayer)
  return <>{t('header.bid', { player: playerName })}</>
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
  
  const cardsListCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2em;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
`
