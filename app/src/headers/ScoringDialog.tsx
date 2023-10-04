/** @jsxImportSource @emotion/react */
import { RulesDialog, ThemeButton, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

export const ScoringDialog = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()
  const scoring = rules?.game.rule?.id === RuleId.Scoring
  const [dialogOpen, setDialogOpen] = useState(scoring)

  useEffect(() => {
      if (scoring) setDialogOpen(true)
    }, [scoring]
  )
  return (
    <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
      <div css={rulesCss}>
        <h2>{t('rules.lastTurn')}</h2>
        <p>{t('rules.lastTurn.text')}</p>
        <ThemeButton onClick={() => setDialogOpen(false)}>{t('OK')}</ThemeButton>
      </div>
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