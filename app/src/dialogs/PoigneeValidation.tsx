/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayMoveButton, RulesDialog, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemTypeAtOnce, MoveItemsAtOnce } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { getPoigneeMinTrumps, poignees } from '@gamepark/tarot/rules/Poignee'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import equal from 'fast-deep-equal'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type PoigneeValidationProps = {

}

export const PoigneeValidation: FC<PoigneeValidationProps> = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const selectedCards = rules.material(MaterialType.Card).location(LocationType.Hand).selected()
  const selectedIndexes = selectedCards.getIndexes().sort()
  const moves: MoveItemsAtOnce[] = useLegalMoves((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && equal(move.indexes, selectedIndexes))
  if (rules.game?.rule?.id !== RuleId.Poignee) return null

  const poigneeMinTrumps = getPoigneeMinTrumps(rules.game.players.length)
  const validPoignees = poignees.filter((p) => poigneeMinTrumps[p] === selectedIndexes.length)
  if (!validPoignees.length) return null
  return (
    <RulesDialog open backdropCss={backdropCss} css={dialogCss}>
      { validPoignees.map((p) => {
        const move = moves.find((m) => m.indexes.length === poigneeMinTrumps[p])!
        return (
          <PlayMoveButton key={JSON.stringify(move)} move={move} css={buttonCss}>{t(`poignee.${p}`)}</PlayMoveButton>
        )
      })}
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