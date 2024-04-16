/** @jsxImportSource @emotion/react */
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { useEffect, useState } from 'react'
import GameDisplay from './GameDisplay'
import { BidHeader } from './headers/BidHeader'
import { CallKingHeader } from './headers/CallKingDialog'
import { ChelemHeader } from './headers/ChelemDialog'
import { CreateKittyHeader } from './headers/CreateKittyHeader'
import { DealHeader } from './headers/DealHeader'
import { GameOverHeader } from './headers/GameOverHeader'
import { PlayCardHeader } from './headers/PlayCardHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <>
      {!loading && <GameDisplay players={game.players.length}/>}
      <LoadingScreen display={loading} developer="Mapow"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOver={GameOverHeader} loading={loading}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
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
  [RuleId.Poignee]: () => <>Poignée</>
}