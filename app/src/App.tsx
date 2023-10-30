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

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed
  return (
    <>
      <GameDisplay/>
      <LoadingScreen display={loading} author="Someone" artist="Somebody" publisher="Nobody" developer="You"/>
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
  [RuleId.Chelem]: ()=><>Chelem</>,
  [RuleId.CallKing]: ()=><>Call King</>,
  [RuleId.CreateKitty]: ()=><>Vous devez faire votre chien</>,
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.Scoring]: ()=><>Décompte du score !</>,
  [RuleId.Poignee]: () => <>Poignée</>,
}