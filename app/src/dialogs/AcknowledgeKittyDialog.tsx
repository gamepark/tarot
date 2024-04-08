/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayMoveButton, RulesDialog, useFocusContext, useLegalMove, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AcknowledgeKittyDialog = () => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const acknowledge = useLegalMove(isCustomMoveType(CustomMoveType.AcknowledgeKitty))
  const { setFocus } = useFocusContext()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (acknowledge) {
      setFocus({
        materials: [rules.material(MaterialType.Card).location(LocationType.Kitty)],
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
    <p css={css`white-space: break-spaces;`}>{t('dialog.see-kitty')}</p>
    <p css={css`text-align: end;`}><PlayMoveButton move={acknowledge}>{t('Validate')}</PlayMoveButton></p>
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
  transform: translate(-15em, -30em);

  > p {
    font-size: 3em;
  }
`