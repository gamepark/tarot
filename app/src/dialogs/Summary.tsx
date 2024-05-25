/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons/faCircleQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, RulesDialog, usePlayerName, usePlayers, useRules } from '@gamepark/react-game'
import { isHeart, isSpade } from '@gamepark/tarot/Card'
import { Bid } from '@gamepark/tarot/rules/Bid'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { RulesUtil } from '@gamepark/tarot/rules/RulesUtil'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import sum from 'lodash/sum'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Summary: FC = () => {
  const players = usePlayers()
  return (
    <div css={summaryCss(players.length)}>
      <FirstLine/>
      <CalledCard/>
      <Preneur/>
      <RoundSummary/>
    </div>
  )
}

const RoundSummary: FC = () => {
  const rules = useRules<TarotRules>()!
  const [opened, setOpened] = useState(false)
  const roundSummary = rules.remind(Memory.RoundSummary) ?? []
  if (!roundSummary.length) return null
  return (
    <>
      <hr css={css`width: 100%`}/>
      <div onClick={() => setOpened(true)}>Scores <FontAwesomeIcon icon={faCircleQuestion} css={openSummaryCss}/></div>
      <RulesDialog open={opened} css={dialogCss} onBackdropClick={() => setOpened(false)} close={() => setOpened(false)}>
        <h2>Scoring</h2>
        <table css={tableCss}>
          <thead>
            <tr>
              <td css={css`border: 0px !important;`}></td>
              {rules.players.map((p) => <RoundColumnTitle key={p} player={p}/>)}
            </tr>
          </thead>
          <tbody>
            {roundSummary.map((entries: any, index: number) => (
              <RoundSummaryEntry key={index} entries={entries} round={index + 1}/>
            ))}
          </tbody>
          <tfoot>
          <tr>
            <td>Total</td>
            {rules.players.map((p) => {
              const total = sum(roundSummary.map((round: any) => round[p - 1].score))
              return (
                <td key={p}>{total}</td>
              )
            })}
          </tr>
          </tfoot>
        </table>
      </RulesDialog>
    </>
  )
}

type RoundColumnTitleProps = {
  player: number
}

const RoundColumnTitle: FC<RoundColumnTitleProps> = (props) => {
  const { player } = props
  const name = usePlayerName(player)
  return (
    <td>
      <div css={playerHeadCss}>
        <Avatar playerId={player}  css={avatarCss} />
        {name}
      </div>
    </td>
  )
}

type RoundSummaryEntryProps = {
  round: number
  entries: { player: number, score: number }[]
}

const RoundSummaryEntry: FC<RoundSummaryEntryProps> = (props) => {
  const { round, entries } = props
  return (
    <tr>
      <td>{round}</td>
      {entries.map((e, index) => <td key={index}>{e.score}</td>)}
    </tr>
  )
}

const CalledCard: FC = () => {
  const rules = useRules<TarotRules>()!
  const calledCard = rules.remind(Memory.CalledCard)
  const { t } = useTranslation()
  if (!calledCard) return null
  const isRed = isHeart(calledCard) || isSpade(calledCard)
  return (
    <div css={css`display: flex;
      flex-direction: column`}>
      <span css={css`text-decoration: underline;
        font-weight: bold`}>Called:</span>
      <span css={css`color: ${isRed ? 'red' : 'black'}`}>{t(`card.${calledCard}`)}</span>
    </div>
  )
}

const Preneur: FC = () => {
  const rules = useRules<TarotRules>()!
  const preneur = new RulesUtil(rules.game).preneur!
  const bid = rules.remind<Bid>(Memory.Bid, preneur)
  const { t } = useTranslation()
  const name = usePlayerName(preneur)
  if (!preneur || !bid) return null
  return (
    <div css={css`display: flex;
      flex-direction: column`}>
      <span css={css`text-decoration: underline;
        font-weight: bold`}>{name}:</span>
      <span>{t(`bid.${bid}`)}</span>
    </div>
  )

}

const FirstLine: FC = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const startPlayer = rules.remind(Memory.StartPlayer)
  const name = usePlayerName(startPlayer)

  if (!startPlayer) return null
  return (
    <div css={css`display: flex;
      flex-direction: column`}>
      <span css={css`font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between`}>
        <span css={css`align-self: flex-start;
          text-decoration: underline; `}>Starting:</span>
        <span css={css`align-self: flex-end`}>{t('round', { round: rules.remind(Memory.Round), total: 4 })}</span>
      </span>
      <span>{name}</span>
    </div>
  )
}

const openSummaryCss = css`
  cursor: pointer;
`

const summaryCss = (players: number) => css`
  position: absolute;
  right: 1em;
  top: ${players === 4 ? 17 : 28}em;
  width: 30em;
  border-radius: 1em;
  border: 0.5em solid gold;
  box-shadow: 0 0 1em black;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0.7em 0.7em 1.2em;
  gap: 1em;
  color: black;

  > div {
    font-size: 2em;
  }
`

const tableCss = css`
  border-collapse: collapse;
  font-size: 3em;
  width: 100%;

  td {
    padding: 0.5em;
    border: 0.05em solid black;
  }
`

const dialogCss = css`
  padding: 3em;

  > h2 {
    margin-top: 0;
    text-align: center;
    font-size: 2.5em;
    text-decoration: underline;
  }
`

const avatarCss = css`
  position: relative;
  top: -0.1em;
  border-radius: 100%;
  height: 2em;
  width: 2em;
  color: black;
  z-index: 1; 
`

const playerHeadCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`