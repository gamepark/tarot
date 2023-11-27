/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { useTranslation } from 'react-i18next'
import { PlayerPanelCounter } from './PlayerPanelCounter'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import maxBy from 'lodash/maxBy'


export const PlayerPanels: FC<any> = () => {
  const { t } = useTranslation()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<TarotRules>()
  if (!rules) return null
  const preneur = maxBy(rules.players, player => rules.remind(Memory.Bid, player))
  const calledPlayer = rules.remind(Memory.CalledPlayer)
  const calledCard = rules.remind(Memory.CalledCard)
  const firstplayer = rules.remind(Memory.StartPlayer)
  const dealerplayer = rules.remind(Memory.DealerPlayer)

  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} css={panelPosition(index)}>
          {preneur === player.id && <span css={bidCss}>{t(`bid.small.${rules.remind(Memory.Bid, preneur)}`)}</span>}
          {preneur === player.id && calledCard && <span css={callCardCss}>{t(`card.${calledCard}`)}</span>}
          {calledPlayer === player.id && <span css={callPlayerCss}>{t(`calledPlayer`)}</span>}
          {firstplayer === player.id && <span css={firstPlayer}>{t(`firstPlayer`)}</span>}
          {firstplayer === player.id && <span css={firstPlayer}>{t(`firstPlayer`)}</span>}
          {dealerplayer === player.id && <span css={dealerPlayer}>{t(`dealerPlayer`)}</span>}

          <div css={indicators}>
            <PlayerPanelCounter
              width={3}
              icon={faStar}
              value={rules?.getScore(player.id)!} /> 
            </div>
        </PlayerPanel>
      )}
    </>
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 35em;
  height: 15em;
`

const bidCss = css`
  position: absolute;
  top: 75%;
  left: 30%;
  font-size: 2em;
`

const indicators = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 2em;
  right: -7em;
  justify-content: space-evenly;
  flex-wrap: wrap; `


  const callPlayerCss = css`
  position: absolute;
  top: 45%;
  left: 25%;
  font-size: 2em;
`

const callCardCss = css`
position: absolute;
top: 45%;
left: 7%;
font-size: 2.5em;
`

const firstPlayer = css`
position: absolute;
top: 75%;
left: 80%;
font-size: 2em;
`

const dealerPlayer = css`
position: absolute;
top: 75%;
left: 70%;
font-size: 2em;
`