/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayMoveButton, RulesDialog, useFocusContext, useLegalMove, usePlayerName, useRules } from '@gamepark/react-game'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { getPoigneeMinTrumps, poignees } from '@gamepark/tarot/rules/Poignee'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AcknowledgePoigneeDialog = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const poigneeMaterial = rules.material(MaterialType.Card).location(LocationType.Poigne)
  const acknowledge = useLegalMove(isEndPlayerTurn)
  const poigneeMinTrumps = getPoigneeMinTrumps(rules.game.players.length)
  const poigneePlayer = poigneeMaterial?.getItem()?.location.player
  const validatedPoignee = poignees.find((p) => poigneeMinTrumps[p] === poigneeMaterial.length)!
  const player = usePlayerName(poigneePlayer)
  const { setFocus } = useFocusContext()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (acknowledge) {
      setFocus({
        materials: [poigneeMaterial],
        staticItems: [], locations: [],
        scale: 0.2,
        highlight: true
      })
    } else {
      setFocus()
    }
    setOpen(acknowledge !== undefined)
  }, [acknowledge])
  return <RulesDialog open={open} css={dialogCss} backdropCss={backdropCss}>
    <p css={css`white-space: break-spaces;`}>{t('dialog.see-poignee', { player: player, poignee: t(`poignee.${validatedPoignee}`)})}</p>
    <p css={css`text-align: end;`}><PlayMoveButton move={acknowledge}>{t('dialog.validate-poignee')}</PlayMoveButton></p>
  </RulesDialog>
}

const backdropCss = css`
  background: none;
  pointer-events: none;
  z-index: 900;
`

const dialogCss = css`
  padding: 0 3em;
  width: 80em;
  pointer-events: auto;
  transition: transform 0.1s ease-in-out;
  transform: translate(-0em, -15em);

  > p {
    font-size: 3em;
  }
`