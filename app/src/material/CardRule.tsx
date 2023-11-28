/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from "@gamepark/react-game"
import { Card, cardValue, isOudler, isTrump } from "@gamepark/tarot/Card"
import { TarotRules } from "@gamepark/tarot/TarotRules"
import { LocationType } from "@gamepark/tarot/material/LocationType"
import { MaterialType } from "@gamepark/tarot/material/MaterialType"
import { useTranslation } from "react-i18next"
import { FC } from "react"



export const TarotCardHelp = (props: MaterialHelpProps) => {
  const { t } = useTranslation()
  const { item } = props
  const kitty = item.location?.type === LocationType.Kitty
  const oudlers = isOudler(item.id)
  const trump = isTrump(item.id)


  { kitty && <p>{t('card.kitty')}</p> }
  { kitty && <p>{t('rules.card.kitty.small.guard')}</p> }
  { kitty && <p>{t('rules.card.kitty.guard.without')}</p> }
  { kitty && <p>{t('rules.card.kitty.guard.against')}</p> }





  return <>
    <section css={cardText}>
      <h3 css={titre}>{t(item.id !== undefined ? `cardrules.${item.id}` : "cardrule.other")}</h3>
      <LocationHelp {...props} />



      {oudlers && <p>{t('rules.card.oudlers')}</p>}

      {trump && <p>{t('rules.trump')}</p>}
      {item.id === Card.Excuse && <p>{t('rules.card.excuse')}</p>}
      {item.id === Card.Trump1 && <p>{t('rules.card.petit')}</p>}
      {item.id === Card.Trump1 && <p>{t('rules.card.petit.bout.excuse.chelem')}</p>}

      { item.id !== undefined && (
        <>
          <hr />
          <p>{t(`cardpoints`, { value: cardValue(item.id)})}</p>
        </>
      ) }
      {oudlers && <p>{t('rules.contrat')}</p>}




    </section>

  </>
}

export const KittyHelp: FC<MaterialHelpProps> = () => {
  return null
}


export const LocationHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props

  const rules = useRules<TarotRules>()!
  const player = usePlayerId<Number>()
  const playerName = usePlayerName(item.location!.player!)

  const { t } = useTranslation()
  const deck = item.location?.type === LocationType.Deck
  const hand = item.location?.type === LocationType.Hand
  const table = item.location?.type === LocationType.Table
  const trick = item.location?.type === LocationType.Tricks
  const ecart = item.location?.type === LocationType.Ecart

  if (!deck && !hand && !table && !trick && !ecart) return null;

  return (
    <>
      {ecart && (
        <>
          <p>{t('card.ecart')}</p>
          <hr/>
          <p>{t('rules.card.ecart')}</p>
        </>
      )}

      {deck && <p>{t('rules.card.deck', { number: rules.material(MaterialType.Card).location(LocationType.Deck).length })}</p>}
      {hand && item.location?.player === player && <p>{t('rules.card.hand')}</p>}
      {hand && item.location?.player !== player && <p>{t('rules.card.hand.other', { player: playerName })} </p>}

      {trick && item.location?.player === player && <p>{t('rules.card.trick')}</p>}
      {trick && item.location?.player !== player && <p>{t('rules.card.trick.other', { player: playerName })} </p>}
      {table && <p>{t('rules.card.table')}</p>}
    </>


  )

}

const cardText = css`
  h3, p {
    margin: 0.3em 0;
  }
`
const titre = css`
  h3 {
    margin: 0.3em 0;
  }
`