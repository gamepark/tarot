/** @jsxImportSource @emotion/react */
import { usePlayers } from '@gamepark/react-game'
import { TarotPlayerPanel } from './TarotPlayerPanel'


export const PlayerPanels = () => {
  const players = usePlayers()
  return (
    <>
      {players.map(player => {
        return <TarotPlayerPanel key={player.id} player={player.id} players={players.length}/>
      })}
    </>
  )
}
