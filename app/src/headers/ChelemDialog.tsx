/** @jsxImportSource @emotion/react */
import { PlayMoveButton, RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { CustomMove, isCustomMove } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'

export const ChelemHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  if (player === activePlayer) {
    return <MyChelemHeader />
  } else {
    return <PlayerChelemHeader activePlayer={activePlayer} />
  }
}

const MyChelemHeader = () => {
  const { t } = useTranslation()
  //const rules = useRules<TarotRules>()!
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  return <>
    <Trans defaults="header.chelem.mine"><ThemeButton onClick={() => setDialogOpen(true)} /></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} css={dialogCss}>
      <h2><Trans defaults="header.chelem.choice"><span /></Trans></h2>
      
      {legalMoves.map(move =>
        <p key={move.data ?? 'false'}>
          <PlayMoveButton move={move}>
             {t(`chelem.${move.data}`)}
          </PlayMoveButton>
        </p>
      )}
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
