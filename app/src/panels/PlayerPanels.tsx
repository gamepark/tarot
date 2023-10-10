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

  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} css={panelPosition(index)}>
          {preneur === player.id && <span css={bidCss}>{t(`bid.${rules.remind(Memory.Bid, preneur)}`)}</span>}
          <div css={indicators}>
        <PlayerPanelCounter
          width={3}
          icon={faStar}
          value={rules?.getScore(player.id)!}/> </div>
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

const indicators = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 2em;
  right: -4em;
  justify-content: space-evenly;
  flex-wrap: wrap; `