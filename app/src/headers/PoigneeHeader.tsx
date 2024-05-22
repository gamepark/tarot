import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { Trans, useTranslation } from 'react-i18next'
import { getValidPoignee } from '../utils/poignee.utils'

export const PoigneeHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const legalMoves = useLegalMoves()
  const ignore = legalMoves.find((l) => isStartRule(l) && l.id === RuleId.PlayCard)
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    const { validPoignee, move } = getValidPoignee(rules, legalMoves)
    if (!validPoignee) {
      return (
        <>
          <Trans defaults="header.poignee.can" values={{ poignee: t(`poignee.${validPoignee}`) }}>
            <PlayMoveButton move={ignore} />
          </Trans>
        </>
      )
    }
    if (validPoignee) {
      return (
        <>
          <Trans defaults="header.poignee.annonce" values={{ poignee: t(`poignee.${validPoignee}`) }}>
            <PlayMoveButton move={move} />
          </Trans>
        </>
      )
    }
  }

  return <>{t('header.play', { player: name })}</>
}