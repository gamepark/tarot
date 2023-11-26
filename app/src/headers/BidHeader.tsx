/** @jsxImportSource @emotion/react */
import { PlayMoveButton, RulesDialog, ThemeButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { CustomMove, isCustomMove } from '@gamepark/rules-api'
import { useState } from 'react'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { css } from '@emotion/react'
import { Bid } from '@gamepark/tarot/rules/Bid'

export const BidHeader = () => {
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  if (player === activePlayer) {
    return <MyBidHeader />
  } else {
    return <PlayerBidHeader activePlayer={activePlayer} />
  }
}

const MyBidHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  return <>
    <Trans defaults="header.bid.mine"><ThemeButton onClick={() => setDialogOpen(true)} /></Trans>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} css={dialogCss}>
      <h2><Trans defaults="header.bid.choice"><span /></Trans></h2>
      {rules.players.map(player => {
        const bid = rules.remind<Bid | undefined>(Memory.Bid, player)
        return bid && <PlayerBidInfo key={bid} player={player} bid={bid} />
      })}

      {legalMoves.map(move =>
        <p key={move.data ?? 'pass'}>
          <PlayMoveButton move={move}>
            {move.type === CustomMoveType.Bid ? t(`bid.${move.data}`) : t('bid.pass')}
          </PlayMoveButton>
          <br />
          {move.type === CustomMoveType.Bid && <em>{t(`rules.bid.${move.data}`)}</em>}
        </p>
      )}
    </RulesDialog>
  </>
}

const PlayerBidInfo = ({ bid, player }: {bid : Bid, player : number} ) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <p>{t(`bid.player`, { player: playerName, bid: t(`bid.${bid}`) })}</p>
}

const PlayerBidHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(activePlayer)
  return <>{t('header.bid', { player: playerName })}</>
}

const dialogCss = css`
  max-width: 100em;
  max-height: 80em;
  padding-bottom:3em;
  padding-left:5em;
  padding-right:5em;
  padding-top:3em;

  > h2 {
    text-align: center;
    font-size: 4em;
    margin: 0;
  }

  > p {
    font-size: 3em;
    white-space: break-spaces;
    text-align:justify;
  }
`
