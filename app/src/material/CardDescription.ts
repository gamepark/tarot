import { CardDescription } from '@gamepark/react-game'
import { TarotCardRule } from './CardRule'
import Trump1 from '../images/atout_1.jpg'
import Trump2 from '../images/atout_2.jpg'
import Trump3 from '../images/atout_3.jpg'
import Trump4 from '../images/atout_4.jpg'
import Trump5 from '../images/atout_5.jpg'
import Trump6 from '../images/atout_6.jpg'
import Trump7 from '../images/atout_7.jpg'
import Trump8 from '../images/atout_8.jpg'
import Trump9 from '../images/atout_9.jpg'
import Trump10 from '../images/atout_10.jpg'
import Trump11 from '../images/atout_11.jpg'
import Trump12 from '../images/atout_12.jpg'
import Trump13 from '../images/atout_13.jpg'
import Trump14 from '../images/atout_14.jpg'
import Trump15 from '../images/atout_15.jpg'
import Trump16 from '../images/atout_16.jpg'
import Trump17 from '../images/atout_17.jpg'
import Trump18 from '../images/atout_18.jpg'
import Trump19 from '../images/atout_19.jpg'
import Trump20 from '../images/atout_20.jpg'
import Trump21 from '../images/atout_21.jpg'
import Heart1 from '../images/Heart_1.jpg'
import Heart2 from '../images/Heart_2.jpg'
import Heart3 from '../images/Heart_3.jpg'
import Heart4 from '../images/Heart_4.jpg'
import Heart5 from '../images/Heart_5.jpg'
import Heart6 from '../images/Heart_6.jpg'
import Heart7 from '../images/Heart_7.jpg'
import Heart8 from '../images/Heart_8.jpg'
import Heart9 from '../images/Heart_9.jpg'
import Heart10 from '../images/Heart_10.jpg'
import HeartJack from '../images/Heart_Jack.jpg'
import HeartKngith from '../images/Heart_Knight.jpg'
import HeartQueen from '../images/Heart_Queen.jpg'
import HeartKing from '../images/Heart_King.jpg'
import Spade1 from '../images/Spade_1.jpg'
import Spade2 from '../images/Spade_2.jpg'
import Spade3 from '../images/Spade_3.jpg'
import Spade4 from '../images/Spade_4.jpg'
import Spade5 from '../images/Spade_5.jpg'
import Spade6 from '../images/Spade_6.jpg'
import Spade7 from '../images/Spade_7.jpg'
import Spade8 from '../images/Spade_8.jpg'
import Spade9 from '../images/Spade_9.jpg'
import Spade10 from '../images/Spade_10.jpg'
import SpadeJack from '../images/Spade_Jack.jpg'
import SpadeKngith from '../images/Spade_Knight.jpg'
import SpadeQueen from '../images/Spade_Queen.jpg'
import SpadeKing from '../images/Spade_King.jpg'
import Club1 from '../images/Club_1.jpg'
import Club2 from '../images/Club_2.jpg'
import Club3 from '../images/Club_3.jpg'
import Club4 from '../images/Club_4.jpg'
import Club5 from '../images/Club_5.jpg'
import Club6 from '../images/Club_6.jpg'
import Club7 from '../images/Club_7.jpg'
import Club8 from '../images/Club_8.jpg'
import Club9 from '../images/Club_9.jpg'
import Club10 from '../images/Club_10.jpg'
import ClubJack from '../images/Club_Jack.jpg'
import ClubKngith from '../images/Club_Knight.jpg'
import ClubQueen from '../images/Club_Queen.jpg'
import ClubKing from '../images/Club_King.jpg'
import Diamond1 from '../images/Diamond_1.jpg'
import Diamond2 from '../images/Diamond_2.jpg'
import Diamond3 from '../images/Diamond_3.jpg'
import Diamond4 from '../images/Diamond_4.jpg'
import Diamond5 from '../images/Diamond_5.jpg'
import Diamond6 from '../images/Diamond_6.jpg'
import Diamond7 from '../images/Diamond_7.jpg'
import Diamond8 from '../images/Diamond_8.jpg'
import Diamond9 from '../images/Diamond_9.jpg'
import Diamond10 from '../images/Diamond_10.jpg'
import DiamondJack from '../images/Diamond_Jack.jpg'
import DiamondKngith from '../images/Diamond_Knight.jpg'
import DiamondQueen from '../images/Diamond_Queen.jpg'
import DiamondKing from '../images/Diamond_King.jpg'
import Excuse from '../images/Excuse.jpg'
import BackCard from '../images/Back.jpg'
import { Card } from '@gamepark/tarot/Card'

export class TarotCardDescription extends CardDescription {
  height = 11.2
  width = 6

  backImage = BackCard

  images = {
    [Card.Trump1]: Trump1,
    [Card.Trump2]: Trump2,
    [Card.Trump3]: Trump3,
    [Card.Trump4]: Trump4,
    [Card.Trump5]: Trump5,
    [Card.Trump6]: Trump6,
    [Card.Trump7]: Trump7,
    [Card.Trump8]: Trump8,
    [Card.Trump9]: Trump9,
    [Card.Trump10]: Trump10,
    [Card.Trump11]: Trump11,
    [Card.Trump12]: Trump12,
    [Card.Trump13]: Trump13,
    [Card.Trump14]: Trump14,
    [Card.Trump15]: Trump15,
    [Card.Trump16]: Trump16,
    [Card.Trump17]: Trump17,
    [Card.Trump18]: Trump18,
    [Card.Trump19]: Trump19,
    [Card.Trump20]: Trump20,
    [Card.Trump21]: Trump21,
    [Card.Heart1]: Heart1,
    [Card.Heart2]: Heart2,
    [Card.Heart3]: Heart3,
    [Card.Heart4]: Heart4,
    [Card.Heart5]: Heart5,
    [Card.Heart6]: Heart6,
    [Card.Heart7]: Heart7,
    [Card.Heart8]: Heart8,
    [Card.Heart9]: Heart9,
    [Card.Heart10]: Heart10,
    [Card.HeartJack]: HeartJack,
    [Card.HeartKnight]: HeartKngith,
    [Card.HeartQueen]: HeartQueen,
    [Card.HeartKing]: HeartKing,
    [Card.Spade1]: Spade1,
    [Card.Spade2]: Spade2,
    [Card.Spade3]: Spade3,
    [Card.Spade4]: Spade4,
    [Card.Spade5]: Spade5,
    [Card.Spade6]: Spade6,
    [Card.Spade7]: Spade7,
    [Card.Spade8]: Spade8,
    [Card.Spade9]: Spade9,
    [Card.Spade10]: Spade10,
    [Card.SpadeJack]: SpadeJack,
    [Card.SpadeKnight]: SpadeKngith,
    [Card.SpadeQueen]: SpadeQueen,
    [Card.SpadeKing]: SpadeKing,
    [Card.Club1]: Club1,
    [Card.Club2]: Club2,
    [Card.Club3]: Club3,
    [Card.Club4]: Club4,
    [Card.Club5]: Club5,
    [Card.Club6]: Club6,
    [Card.Club7]: Club7,
    [Card.Club8]: Club8,
    [Card.Club9]: Club9,
    [Card.Club10]: Club10,
    [Card.ClubJack]: ClubJack,
    [Card.ClubKnight]: ClubKngith,
    [Card.ClubQueen]: ClubQueen,
    [Card.ClubKing]: ClubKing,
    [Card.Diamond1]: Diamond1,
    [Card.Diamond2]: Diamond2,
    [Card.Diamond3]: Diamond3,
    [Card.Diamond4]: Diamond4,
    [Card.Diamond5]: Diamond5,
    [Card.Diamond6]: Diamond6,
    [Card.Diamond7]: Diamond7,
    [Card.Diamond8]: Diamond8,
    [Card.Diamond9]: Diamond9,
    [Card.Diamond10]: Diamond10,
    [Card.DiamondJack]: DiamondJack,
    [Card.DiamondKnight]: DiamondKngith,
    [Card.DiamondQueen]: DiamondQueen,
    [Card.DiamondKing]: DiamondKing,
    [Card.Excuse]: Excuse,
  }

  rules = TarotCardRule
}

export const tarotCardDescription = new TarotCardDescription()