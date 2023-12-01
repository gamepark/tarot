import { Card } from '@gamepark/tarot/Card'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

export class TutorialSetup extends TarotSetup {

  setupCard() {
    this.getCard(Card.Club6).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Club9).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Diamond10).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Heart1).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.HeartQueen).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Heart5).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Heart6).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Spade2).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Spade8).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Spade9).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Spade10).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.SpadeKing).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Excuse).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Trump1).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Trump5).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Trump8).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Trump17).moveItem({ type: LocationType.Hand, player: this.players[0] })
    this.getCard(Card.Trump21).moveItem({ type: LocationType.Hand, player: this.players[0] })


    this.getCard(Card.Heart2).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Heart9).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Heart10).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.HeartKing).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Diamond1).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Diamond5).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Diamond7).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Diamond8).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Club1).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Club3).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Club4).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Club7).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump2).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump6).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump15).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump16).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump18).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.Trump20).moveItem({ type: LocationType.Hand, player: this.players[1] })


    this.getCard(Card.Spade1).moveItem({ type: LocationType.Hand, player: this.players[1] })
    this.getCard(Card.SpadeKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.SpadeQueen).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Heart3).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Heart4).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Heart7).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Heart8).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.HeartJack).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.HeartKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Club2).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Club5).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Club8).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Club10).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.ClubJack).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.ClubKnight).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.ClubQueen).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Trump3).moveItem({ type: LocationType.Hand, player: this.players[2] })
    this.getCard(Card.Trump4).moveItem({ type: LocationType.Hand, player: this.players[2] })



    this.getCard(Card.Spade5).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Spade7).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.SpadeJack).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Diamond2).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.ClubKing).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Diamond3).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Diamond4).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Diamond6).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Diamond9).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.DiamondJack).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.DiamondKnight).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump9).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump10).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump11).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump12).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump13).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump14).moveItem({ type: LocationType.Hand, player: this.players[3] })
    this.getCard(Card.Trump19).moveItem({ type: LocationType.Hand, player: this.players[3] })


    this.getCard(Card.Spade3).moveItem({ type: LocationType.Kitty })
    this.getCard(Card.Spade4).moveItem({ type: LocationType.Kitty })
    this.getCard(Card.Spade6).moveItem({ type: LocationType.Kitty })
    this.getCard(Card.DiamondQueen).moveItem({ type: LocationType.Kitty })
    this.getCard(Card.DiamondKing).moveItem({ type: LocationType.Kitty })
    this.getCard(Card.Trump7).moveItem({ type: LocationType.Kitty })


  }


  getCard(card: Card) {
    return this.material(MaterialType.Card).location(LocationType.Deck).id<Card>(id => id === card)
  }

}