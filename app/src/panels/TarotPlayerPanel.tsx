/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, PlayerTimer, SpeechBubble, SpeechBubbleDirection, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { RulesUtil } from '@gamepark/tarot/rules/RulesUtil'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

type FarawayPlayerPanelProps = {
  player: number
  players: number
} & HTMLAttributes<HTMLDivElement>

export const TarotPlayerPanel: FC<FarawayPlayerPanelProps> = ({ player, players, ...props }) => {
  const playerName = usePlayerName(player)
  const playerId = usePlayerId()
  const rules = useRules<TarotRules>()!
  const { t } = useTranslation()
  const position = (-player + (playerId ?? 1) + players) % players + 1
  const long = position === 1 || (players === 4 && position === 3)
  const direction = speechBubbleDirection(position, players)
  return (
    <div css={[panelCss, long ? longPanelCss : shortPanelCss, getBackground(player, rules.game), positionCss(position, players)]} {...props}>
      <Avatar css={avatarStyle} playerId={player} speechBubbleProps={{ direction, css: bubbleCss }}>
        {rules.game.rule && rules.game.rule?.id < RuleId.PlayCard && <AnnounceBubble player={player} direction={direction}/>}
      </Avatar>
      <h2 css={[nameStyle]}>{playerName}</h2>
      <Timer player={player} long={long}/>
      <span css={[scoreCss, long ? scoreLongCss : scoreShortCss]}>{t('points', { score: rules?.getScore(player) })}</span>
    </div>
  )
}

const Timer = ({ player, long }: { player: number, long: boolean }) => {
  const rules = useRules<TarotRules>()

  if (rules?.isOver()) return null

  return <PlayerTimer playerId={player} css={[timerCss, long ? timerLongCss : timerShortCss]}/>
}

const panelCss = css`
  position: absolute;
  color: black;
  border-radius: 3em 1.5em 1.5em 3em;
  cursor: pointer;
  box-shadow: 0 0 0.4em black;
`

const longPanelCss = css`
  width: 55em;
  height: 5.5em;
`

const shortPanelCss = css`
  width: 32em;
  height: 9em;
`

const getBackground = (player: number, game: MaterialGame) => {
  const rulesUtil = new RulesUtil(game)
  const preneur = rulesUtil.preneur!
  if (player === preneur) {
    return attack
  }
  if (game.players.length < 5) {
    return defense
  }
  const calledPlayer = rulesUtil.remind(Memory.CalledPlayer)
  if (calledPlayer !== undefined) {
    return calledPlayer === player ? attack : defense
  }
  return neutral
}

const neutral = css`
  background: #EEEEEE;
`

const attack = css`
  background: #FAA1A1;
`

const defense = css`
  background: #BFBFFF;
`

const positionCss = (position: number, players: number) => {
  switch (position) {
    case 1:
      return position1
    case 2:
      return players === 3 ? position2on3 : players === 4 ? position2on4 : position2on5
    case 3:
      return players === 3 ? position3on3 : players === 4 ? position3on4 : position3on5
    case 4:
      return players === 4 ? position4on4 : position4on5
    default:
      return position5
  }
}

const speechBubbleDirection = (position: number, players: number) => {
  switch (position) {
    case 1:
    case 2:
      return players === 3 ? SpeechBubbleDirection.BOTTOM_LEFT : SpeechBubbleDirection.TOP_LEFT
    case 3:
      return players === 3 ? SpeechBubbleDirection.BOTTOM_RIGHT : SpeechBubbleDirection.BOTTOM_LEFT
    case 4:
      return players === 4 ? SpeechBubbleDirection.TOP_RIGHT : SpeechBubbleDirection.BOTTOM_RIGHT
    default:
      return SpeechBubbleDirection.TOP_RIGHT
  }
}

const position1 = css`
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
`

const position2on3 = css`
  top: 9em;
  right: 2em;
`

const position2on4 = css`
  top: 45em;
  right: 2em;
`

const position2on5 = css`
  top: 60em;
  right: 2em;
`

const position3on3 = css`
  top: 9em;
  left: 2em;
`

const position3on4 = css`
  top: 8em;
  left: 50%;
  transform: translateX(-50%);
`

const position3on5 = css`
  top: 9em;
  right: 2em;
`

const position4on4 = css`
  top: 45em;
  left: 2em;
`

const position4on5 = css`
  top: 9em;
  left: 2em;
`

const position5 = css`
  top: 60em;
  left: 2em;
`

const scoreCss = css`
  position: absolute;
  font-size: 2.5em;
`

const scoreLongCss = css`
  top: 0.6em;
  left: initial;
  right: 0.25em;
`

const scoreShortCss = css`
  top: 2em;
  left: initial;
  right: 1em;
`

const avatarStyle = css`
  position: absolute;
  top: -0.1em;
  left: 0;
  border-radius: 100%;
  height: 6em;
  width: 6em;
  color: black;
  z-index: 1;
`

const nameStyle = css`
  position: absolute;
  top: 0.5em;
  left: 3em;
  max-width: 9.5em;
  font-size: 2.4em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const timerCss = css`
  position: absolute;
  left: initial;
  right: 4.1em;
  font-size: 2.5em;
`

const timerLongCss = css`
  top: 0.6em;
  left: 12em;
`

const timerShortCss = css`
  top: 2em;
  left: 2.9em;
`

const bubbleCss = css`box-shadow: 0 0 0.1em black;`

const AnnounceBubble = ({ player, direction }: { player: number, direction: SpeechBubbleDirection }) => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const rulesUtil = new RulesUtil(rules.game)
  const bid = rules.remind(Memory.Bid, player)
  const isBidPhase = rules.game.rule?.id === RuleId.Bid
  const startPlayer = rules.remind(Memory.StartPlayer)
  const activePlayer = rules.getActivePlayer()
  const pass = isBidPhase && !bid && (activePlayer! >= startPlayer ? player < activePlayer! && player >= startPlayer : !(player >=   activePlayer! && player < startPlayer))
  const preneur = player === rulesUtil.preneur
  if (isBidPhase ? !bid && !pass : !preneur) return null
  const calledCard = rules.remind(Memory.CalledCard)
  const chelem = rules.remind(Memory.ChelemAnnounced)
  return (
    <SpeechBubble direction={direction} css={bubbleCss}>
      {pass ? t('say.pass') : calledCard ? t('say.call', { king: t(`cardrules.${calledCard}`) }) : chelem ? t('chelem') : t(`bid.${bid}`)}
    </SpeechBubble>
  )
}
