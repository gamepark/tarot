/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { PlayerBid } from '@gamepark/tarot/rules/BidRule'
import { useTranslation } from 'react-i18next'

export const PlayerPanels: FC<any> = () => {
  const { t } = useTranslation()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<TarotRules>()
  const bids = rules?.remind<PlayerBid[]>(Memory.Bids)
  const lastBid = bids && bids.length > 0 ? bids[bids.length - 1] : undefined
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} css={panelPosition(index)}>
          {lastBid?.player === player.id && <span css={bidCss}>{t(`bid.${lastBid!.bid}`)}</span>}
        </PlayerPanel>
      )}
    </>
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
  height: 14em;
`

const bidCss = css`
  position: absolute;
  top: 60%;
  left: 5%;
  font-size: 3em;
`
