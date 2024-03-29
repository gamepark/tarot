/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import GameDisplay from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { GameOverHeader } from './headers/GameOverHeader'
import { DealHeader } from './headers/DealHeader'
import { BidHeader } from './headers/BidHeader'
import { PlayCardHeader } from './headers/PlayCardHeader'
import { ChelemHeader } from './headers/ChelemDialog'
import { CallKingHeader } from './headers/CallKingDialog'
import { CreateKittyHeader } from './headers/CreateKittyDialog'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <>
      <GameDisplay />
      <LoadingScreen display={loading} author="Someone" artist="Somebody" publisher="Nobody" developer="You" />
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOver={GameOverHeader} loading={loading} />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}

const RulesHeaders: Record<RuleId, () => ReactJSXElement> = {
  [RuleId.Deal]: DealHeader,
  [RuleId.Bid]: BidHeader,
  [RuleId.Chelem]: ChelemHeader,
  [RuleId.CallKing]: CallKingHeader,
  [RuleId.CreateKitty]: CreateKittyHeader,
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.Scoring]: () => <>Décompte du score !</>,
  [RuleId.Poignee]: () => <>Poignée</>,
}