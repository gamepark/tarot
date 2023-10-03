import { RulesDialog, useLegalMoves} from "@gamepark/react-game"
import { CustomMove, isCustomMove } from "@gamepark/rules-api"
import { useState } from "react"
import { Trans } from "react-i18next"
import { css } from "@emotion/react"



export const BidHeader = () => {
    return <MyBidHeader/>
}

export const MyBidHeader = () => {
    const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
    const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
    return <>
      <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)} css={dialogCss}>
        <h2><Trans defaults="Tricks"><span/></Trans></h2>
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
