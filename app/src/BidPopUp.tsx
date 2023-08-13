/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMoves, usePlayerId } from '@gamepark/react-game'
import { CustomMove} from '@gamepark/rules-api'
import { css } from '@emotion/react'




export const BidPopUp = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const legalMoves = useLegalMoves<CustomMove>()



  return (
    <>
        <div css={rulesCss}>
          <h2><Trans defaults="header.start.choice"><span/></Trans></h2>
          <p>
            <PlayMoveButton move={legalMoves.find(move => move.data === player)}>
              {t('rules.start.choose.me')}
            </PlayMoveButton>
          </p>
        </div>
    </>
  )
}




const rulesCss = css`
  font-size: 3em;
  opacity: 1;
  border: 2em solid pink;
  lenght:15em;
  position:absolute;
  right:0;
  bottom:0;
  margin-right:12em;
  margin-bottom:2em;
  

  > p {
    white-space: break-spaces;
  }

`  

