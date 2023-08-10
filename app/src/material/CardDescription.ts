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
  }

  rules = TarotCardRule
}