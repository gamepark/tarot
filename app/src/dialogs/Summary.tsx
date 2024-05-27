/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons/faCircleQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, RulesDialog, usePlayerName, usePlayers, useRules } from '@gamepark/react-game'
import { isDiamond, isHeart } from '@gamepark/tarot/Card'
import { Bid } from '@gamepark/tarot/rules/Bid'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { RulesUtil } from '@gamepark/tarot/rules/RulesUtil'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import sum from 'lodash/sum'
import { FC, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const Summary: FC = () => {
  const players = usePlayers()
  return (
    <div css={summaryCss(players.length)}>

      <span css={firstLineCss}>
        <StartingPlayer/>
        <Round/>
      </span>
      <CalledCard/>
      <Preneur/>
      <Chelem/>
      <RoundSummary/>
    </div>
  )
}

const RoundSummary: FC = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const [opened, setOpened] = useState(false)
  const roundSummary = rules.remind(Memory.RoundSummary) ?? []
  if (!roundSummary.length) return null
  return (
    <>
      <hr css={separatorCss}/>
      <span css={openSummaryCss} onClick={() => setOpened(true)}>{t('summary.scoring')} <FontAwesomeIcon icon={faCircleQuestion}/></span>
      <RulesDialog open={opened} css={dialogCss} onBackdropClick={() => setOpened(false)} close={() => setOpened(false)}>
        <h2>{t('summary.scoring')}</h2>
        <table css={tableCss}>
          <thead>
          <tr>
            <td css={noBorderCss}></td>
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
            <td>{t('summary.scoring.total')}</td>
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
        <Avatar playerId={player} css={avatarCss}/>
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
  const isRed = isHeart(calledCard) || isDiamond(calledCard)
  return (
    <span>
      <Trans defaults="summary.called" values={{ card: t(`card.${calledCard}`) }}>
        <u />
        <span css={css`color: ${isRed ? 'red' : 'black'}`} />
      </Trans>
    </span>
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
    <span>
      <Trans defaults="summary.bid" values={{ name, bid: t(`bid.${bid}`) }}>
        <u />
      </Trans>
    </span>
  )

}

const Chelem: FC = () => {
  const rules = useRules<TarotRules>()!
  const chelem = rules.remind(Memory.ChelemAnnounced)
  const name = usePlayerName(chelem)
  if (!chelem) return null
  return (
    <span>
      <Trans defaults="summary.chelem" values={{ name }}>
        <u/>
      </Trans>
    </span>
  )

}

const StartingPlayer: FC = () => {
  const rules = useRules<TarotRules>()!
  const startPlayer = rules.remind(Memory.StartPlayer)
  const name = usePlayerName(startPlayer)

  if (!startPlayer) return null
  return (
    <span>
      <Trans defaults="summary.starting" values={{ name }}>
        <u/>
      </Trans>
    </span>
  )
}

const Round: FC = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const round = rules.remind(Memory.Round)
  // TODO: Extract from memory
  const total = 4
  if (round > total) return null
  return (
    <span css={roundCss}>{t('round', { round, total })}</span>
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
  
  > * {
    white-space: break-spaces;
  }

  > span {
    font-size: 2em;

    > u {
      font-weight: bold;
    }
    
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

const firstLineCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  u {
    font-weight: bold;
  }
`

const roundCss = css`
  align-self: flex-start
`

const separatorCss = css`
  width: 100%
`

const noBorderCss = css`
  border: 0 !important;
`