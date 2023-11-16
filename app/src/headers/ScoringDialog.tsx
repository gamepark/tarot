/** @jsxImportSource @emotion/react */
import { MaterialComponent, RulesDialog, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { RulesUtil } from '@gamepark/tarot/rules/RulesUtil'

export const ScoringDialog  = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()
  const scoring = rules?.game.rule?.id === RuleId.Scoring
  const [dialogOpen, setDialogOpen] = useState(scoring)

  useEffect(() => {
    if (scoring) setDialogOpen(true)
  }, [scoring]
  )
  if (!rules) return null
  const rulesUtil = new RulesUtil(rules.game)
  const cards = rules.material(MaterialType.Card).location(LocationType.Tricks).player(player => rulesUtil.isPreneurSide(player)).sort(item => -item.location.x!)

  return <>
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} >
      {cards !== undefined && <div css={dialogCss}>
        <h2>{t('rules.lastTurn')}</h2>
        <ul css={cardListCss}>
          {cards.getItems().map((card, index) =>
            <li key={index}>
              <MaterialComponent type={MaterialType.Card} itemId={card.id}/>
            </li>
          )}
        </ul>
      </div>}
    </RulesDialog>
    </>
}

const dialogCss = css`
  max-width: 100em;
  padding: 5em;

  > h2 {
    text-align: center;
    font-size: 4em;
    margin: 0;
  }

  > p {
    font-size: 3em;
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