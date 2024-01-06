import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItem } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

export const tarotAnimations = new MaterialGameAnimations()

tarotAnimations.when().rule(RuleId.Deal).move(isMoveItem).duration(0.2)
