/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

import { css } from '@emotion/react'
import { useLegalMoves, usePlay } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { Bid, bids } from '@gamepark/tarot/rules/Bid'

export const BidPopUp = () => {
  const play = usePlay()
  const { t } = useTranslation()
  const moves = useLegalMoves((move) => isCustomMoveType(CustomMoveType.Bid)(move))
  
  const getBidMove = (bid: Bid) => moves.find((move) => move.data === bid)


  return (
    <>
        <div css={bidCss}> 
          { bids.map((bid) => {
            const move = getBidMove(bid)
            if (!move) return null;
            return (
              <div key={bid} css={[buttonCss]} onClick={() => play(move)}> 
                <p>{ t(getBidText(bid))}</p>
              </div>
            )

          }) }
        </div>
    </>
  )
}

const getBidText = (bid: Bid) => {
  switch(bid) {
    case Bid.Small:
      return 'bid.small';
    case Bid.Guard:
      return 'bid.guard';
    case Bid.GuardWithoutTheKitty:
      return 'bid.guard-without-kitty';
    case Bid.GuardAgainstTheKitty:
      return 'bid.guard-against-kitty';
  }
}




const bidCss = css`
  font-size: 3em;
  opacity: 1;
  border: 0.1em solid white;
  height: 27em;
  width:10em;
  position:absolute;
  right:15em;
  top:3em;
  text-align:center;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`  

const buttonCss = css`
  text-align:center;
  margin:auto;
  color:black;
  height:5em;
  border : 1em solid white;
  border-radius: 25% 24% 24% 25% / 26% 26% 26% 26%;
  background:white;
  display:flex;
  cursor: pointer;
`
