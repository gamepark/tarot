/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { MaterialRulesProps, usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { Card } from "@gamepark/tarot/Card"
import { TarotRules } from "@gamepark/tarot/TarotRules"
import { LocationType } from "@gamepark/tarot/material/LocationType"
import { MaterialType } from "@gamepark/tarot/material/MaterialType"
import { useTranslation } from "react-i18next"


// ICI appelle la TarotCardHelp (on a changé le type)
export const TarotCardRule = (props: MaterialRulesProps) => {
  const rules = useRules<TarotRules>()!
  const { t } = useTranslation()
  const { item } = props
  const deck = item.location?.type === LocationType.Deck
  const hand = item.location?.type === LocationType.Hand
  const kitty = item.location?.type === LocationType.Kitty
  const player = usePlayerId<Number>()
  const playerName = usePlayerName(item.location!.player!)

  return <>
    <section css={cardText}>
        <h3>{t(item.id !== undefined ?`cardrules.${item.id}`: "cardrule.???")}</h3>
        {deck && <p>{t('rules.card.deck', { number: rules.material(MaterialType.Card).location(LocationType.Deck).length })}</p>}
        {hand && item.location?.player === player && <p>{t('rules.card.hand')}</p>}
        {hand && item.location?.player !== player && <p>{t('rules.card.hand.other', { player: playerName })} </p>}
        
        {kitty && <p>{t('rules.card.kitty')}</p>}
        {item.id === Card.Excuse && <p>{t('rules.card.excuse')}</p>}
        {item.id === Card.Excuse && <p>{t('rules.card.oudlers')}</p> || item.id === Card.Trump1 && <p>{t('rules.card.oudlers')}</p> || item.id === Card.Trump21 && <p>{t('rules.card.oudlers')}</p>}


      </section>
    
  </>
}


const cardText = css`
  h3, p {
    margin: 0.3em 0;
  }
`