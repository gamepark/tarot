/** @jsxImportSource @emotion/react */
import { MaterialComponent, RulesDialog, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export const ScoringDialog  = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()
  const scoring = rules?.game.rule?.id === RuleId.Scoring
  const [dialogOpen, setDialogOpen] = useState(scoring)
  const cards = useRules<TarotRules>()?.material(MaterialType.Card).location(LocationType.Tricks).player().sort(item => -item.location.x!)
  const playerId = usePlayerId()
  const player = usePlayerName

  useEffect(() => {
    if (scoring) setDialogOpen(true)
  }, [scoring]
  )
  return (
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      {cards !== undefined && <div css={rulesCss}>
        <h2>{t('rules.lastTurn')}</h2>
        <p>      {playerId === player ? t('rules.discard.content.mine', { number: cards?.length })
          : t('rules.discard.content', { number: cards?.length, player })}
        </p> 
        <ul css={cardListCss}>
        {cards!.getItems().map(card =>
            <li key={card.id}>
              <MaterialComponent type={MaterialType.Card} itemId={card.id}  
              />
            </li>
          )}
        </ul>
      </div>}
    </RulesDialog>
  )
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin: 0 1em;
    text-align: center;
  }

  > p {
    white-space: break-spaces;
  }
`

const cardListCss = css`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 2em;
list-style-type: none;
padding: 0;
margin: 0;
}
`