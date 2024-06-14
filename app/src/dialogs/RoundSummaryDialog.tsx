/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, RulesDialog, usePlayerName, useRules } from '@gamepark/react-game'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


export const RoundSummaryDialog: FC = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const [opened, setOpened] = useState(false)
  const round = rules.remind(Memory.Round)
  const [lastRound, setLastRound] = useState<number>(rules.remind(Memory.Round))
  useEffect(() => {
    console.log(lastRound, round)
    if (lastRound !== round) {
      setOpened(true)
      setLastRound(round)
    }
  }, [round])

  const summaries = rules.remind(Memory.RoundSummary) ?? []
  if (!summaries.length) return null
  const summary = summaries[summaries.length - 1]
  const preneur = summary.preneur
  const preneurDetail = summary.players.find((p: any) => p.id === preneur)
  // TODO: Extract from memory
  const total = 4

  return (
    <RulesDialog css={dialogCss} open={opened} close={() => setOpened(false)} onBackdropClick={() => setOpened(false)}>
      <h1 css={titleCss}>{t('round', { round: round - 1, total })}</h1>
      <table css={tableCss}>
        <thead>
        <tr>
          <td css={noBorderCss}></td>
          {rules.players.map((p) => <RoundColumnTitle key={p} player={p}/>)}
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{t('summary.points')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? `${entry.points}` : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('summary.contract')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? `${entry.contrat}` : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('summary.contract.title')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? `${entry.contratScore}` : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('summary.petit.title')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? entry.petitAuBout : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t(`bid.${preneurDetail.bid}`)}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? `x${entry.bid}` : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('chelem.true')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? (entry.chelem ?? '/') : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('summary.poignee.title')}</td>
          {summary.players.map((entry: any) => (
            <td key={entry.id}>{(entry.id === preneur) ? (entry.poignee ?? '/') : '/'}</td>
          ))}
        </tr>
        <tr>
          <td>{t('summary.scoring.total')}</td>
          {summary.players.map((p: any) => (
            <td key={p.id}>{p.score}</td>
          ))}
        </tr>
        </tbody>
      </table>
    </RulesDialog>
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
        <Avatar playerId={player} css={avatarCss}/>
        {name}
      </div>
    </td>
  )
}

const avatarCss = css`
  position: relative;
  top: -0em;
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

const noBorderCss = css`
  border: 0 !important;
`
const tableCss = css`
  border-collapse: collapse;
  font-size: 3em;
  width: 100%;

  td {
    padding: 0.5em;
    border: 0.05em solid black;
    
    &:first-of-type {
      text-align: left;
    }
    text-align: right;
  }
`

const titleCss = css`
  font-size: 3em;
  text-align: center;
`

const dialogCss = css`
  padding: 3em;
  padding-top: 0;
`