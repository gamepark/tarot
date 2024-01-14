import { Card } from '@gamepark/tarot/Card'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

export class TutorialSetup extends TarotSetup {



  start() {

    this.material(MaterialType.Card).id(Card.Club6).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Club9).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Diamond10).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Heart1).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.HeartQueen).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump9).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Heart6).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Spade2).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Spade8).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Spade9).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Spade10).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.SpadeKing).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Excuse).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump1).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump5).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump8).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump17).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.material(MaterialType.Card).id(Card.Trump21).moveItem({ type: LocationType.Hand, player: this.players[0] })


    this.material(MaterialType.Card).id(Card.Heart2).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Heart9).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Heart10).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.HeartKing).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Diamond1).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Diamond5).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Diamond7).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Diamond8).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Club1).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Club3).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Club4).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Club7).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Trump2).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Trump6).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Heart5).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Trump16).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Trump18).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.material(MaterialType.Card).id(Card.Trump20).moveItem({ type: LocationType.Hand, player: this.players[1] })


    this.material(MaterialType.Card).id(Card.Trump15).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.SpadeKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.SpadeQueen).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Heart3).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Heart4).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Heart7).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Heart8).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.HeartJack).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.HeartKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Club2).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Club5).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Club8).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Club10).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.ClubJack).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.ClubKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.ClubQueen).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Trump3).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.material(MaterialType.Card).id(Card.Trump4).moveItem({ type: LocationType.Hand, player: this.players[2] })

    



    this.material(MaterialType.Card).id(Card.Spade5).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Spade7).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.SpadeJack).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Diamond2).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.ClubKing).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Diamond3).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Diamond4).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Diamond6).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Diamond9).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.DiamondJack).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.DiamondKnight).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Spade1).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump10).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump11).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump12).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump13).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump14).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.material(MaterialType.Card).id(Card.Trump7).moveItem({ type: LocationType.Hand, player: this.players[3] })


    this.material(MaterialType.Card).id(Card.Spade3).moveItem({ type: LocationType.Kitty })
    this.material(MaterialType.Card).id(Card.Spade4).moveItem({ type: LocationType.Kitty })
    this.material(MaterialType.Card).id(Card.Spade6).moveItem({ type: LocationType.Kitty })
    this.material(MaterialType.Card).id(Card.DiamondQueen).moveItem({ type: LocationType.Kitty })
    this.material(MaterialType.Card).id(Card.DiamondKing).moveItem({ type: LocationType.Kitty })
    this.material(MaterialType.Card).id(Card.Trump19).moveItem({ type: LocationType.Kitty })

    const player = this.players[2]
    this.memorize(Memory.StartPlayer, player)
    this.memorize(Memory.DealerPlayer, this.players[1])
    this.startPlayerTurn(RuleId.Bid, player)

  }

}