/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useTranslation } from 'react-i18next'

export const PlayCardHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  const playerName = usePlayerName(activePlayer)
  if (player === activePlayer) {
    return (
      <>
        {t('header.play.mine')}
      </>
    )
  } else {
    return (
      <>
        {t('header.play', { player: playerName })}
      </>
    )
  }
}
