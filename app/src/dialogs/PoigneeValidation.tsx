/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayMoveButton, RulesDialog, useLegalMoves, useRules } from '@gamepark/react-game'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getValidPoignee } from '../utils/poignee.utils'

export type PoigneeValidationProps = {

}

export const PoigneeValidation: FC<PoigneeValidationProps> = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const legalMoves = useLegalMoves()
  const { validPoignee, move} = getValidPoignee(rules, legalMoves)
  if (rules.game?.rule?.id !== RuleId.Poignee) return null
  if (!validPoignee) return null
  return (
    <RulesDialog open backdropCss={backdropCss} css={dialogCss}>
      <PlayMoveButton key={JSON.stringify(move)} move={move} css={buttonCss}>{t(`poignee.${validPoignee}`)}</PlayMoveButton>
    </RulesDialog>
  )
}

const backdropCss = css`
  background-color: unset;
  pointer-events: none;
`

const dialogCss = css`
  background-color: unset; 
  box-shadow: unset; 
  position: absolute; 
  top: 60%; 
  height: 10em;
  left: 50%; 
  font-size: 2em; transform: translate3d(-50%, -50%, 0)
`

const buttonCss = css`
  background-color: white; 
  font-size: 2em; 
  border-radius: 0.3em;
  pointer-events: all;
`