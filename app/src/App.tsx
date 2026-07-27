import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/tarot/rules/RuleId'
import { ComponentType, useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { AcknowledgePoigneeHeader } from './headers/AcknowledgePoigneeHeader'
import { BidHeader } from './headers/BidHeader'
import { CallKingHeader } from './headers/CallKingDialog'
import { ChelemHeader } from './headers/ChelemDialog'
import { CreateKittyHeader } from './headers/CreateKittyHeader'
import { DealHeader } from './headers/DealHeader'
import { PlayCardHeader } from './headers/PlayCardHeader'
import { PoigneeHeader } from './headers/PoigneeHeader'

export function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), process.env.NODE_ENV === 'development' ? 0 : 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!!game && <GameDisplay players={game.players.length} />}
      <LoadingScreen display={loading} />
      <MaterialHeader rulesStepsHeaders={RulesHeaders} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}

const RulesHeaders: Record<RuleId, ComponentType> = {
  [RuleId.Deal]: DealHeader,
  [RuleId.Bid]: BidHeader,
  [RuleId.Chelem]: ChelemHeader,
  [RuleId.CallKing]: CallKingHeader,
  [RuleId.CreateKitty]: CreateKittyHeader,
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.Scoring]: () => <>Décompte du score !</>,
  [RuleId.SolveTrick]: () => <>Resoltion du pli</>,
  [RuleId.Poignee]: PoigneeHeader,
  [RuleId.AcknownledgePoignee]: AcknowledgePoigneeHeader
}
