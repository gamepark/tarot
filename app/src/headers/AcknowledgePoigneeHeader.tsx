/** @jsxImportSource @emotion/react */
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isEndPlayerTurn } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const AcknowledgePoigneeHeader = () => {
  const { t } = useTranslation()
  const acknowledge = useLegalMove(isEndPlayerTurn)

  if (acknowledge) {
    return (
      <>
        <PlayMoveButton move={acknowledge}>
          {t('dialog.validate-poignee')}
        </PlayMoveButton>
      </>
    )
  }

  return (
    <>{t('Waiting for other player to acknowledge')}</>
  )

}
