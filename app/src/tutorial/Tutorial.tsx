/** @jsxImportSource @emotion/react */
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { TutorialSetup } from './TutorialSetup'
import { Trans } from 'react-i18next'
import { MaterialGame, MaterialMove, isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { Card } from '@gamepark/tarot/Card'
import { Bid } from '@gamepark/tarot/rules/Bid'




export class Tutorial extends MaterialTutorial {
    options = { players: 4 }
    setup = new TutorialSetup()


    players = [
        { id: 1 },
        {
            id: 2,
            name: 'Charles',
        },
        {
            id: 3,
            name: 'Alexandre',
        },
        {
            id: 4,
            name: 'César',
        },


    ]

    steps: TutorialStep[] = [


        {
            popup: { text: () => <Trans defaults="tuto.welcome"><strong /><em /></Trans> }
        },

        {
            popup: { text: () => <Trans defaults="tuto.explain.bid"><strong /><em /></Trans> }
        },

        {
            popup: { text: () => <Trans defaults="tuto.first.player.pass"><strong /><em /></Trans> },

        },

        {
            move: {
                player: 3,
                filter: isCustomMoveType(CustomMoveType.Pass)
            }

        },

        {
            move: {
                player: 4,
                filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Bid)(move) && move.data === Bid.Small
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.second.player.bid.small"><strong /><em /></Trans> },

        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.explain"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.petit"><strong /><em /></Trans> },
            focus: (game: MaterialGame) => [
                this.location(LocationType.Hand).player(game.players[0]),
                this.material(game, MaterialType.Card).id(Card.Trump1),

            ],
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.trump21"><strong /><em /></Trans> },
            focus: (game: MaterialGame) => [
                this.location(LocationType.Hand).player(game.players[0]),
                this.material(game, MaterialType.Card).id(Card.Trump21),

            ],
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.excuse"><strong /><em /></Trans> },
            focus: (game: MaterialGame) => [
                this.location(LocationType.Hand).player(game.players[0]),
                this.material(game, MaterialType.Card).id(Card.Excuse),
            ],
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.2"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.3"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.Bid)(move) && move.data === Bid.Guard
            }
        },


        {
            move: {
                player: 2,
                filter: isCustomMoveType(CustomMoveType.Pass)
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.chelem.pass"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove) => isCustomMoveType(CustomMoveType.TakeChelem)(move) && move.data === false
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.4"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.1"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.2"><strong /><em /></Trans> },
        },


        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.4"><strong /><em /></Trans> },
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },

        {
            focus: (game: MaterialGame) => [
                this.location(LocationType.Table),
                this.material(game, MaterialType.Card).location(LocationType.Hand).player(1).id((id: Card) => [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(id))
            ],
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => {
                    return isMoveItemType(MaterialType.Card)(move) &&
                        [Card.Heart6, Card.HeartQueen, Card.Club9, Card.Diamond10, Card.Heart1, Card.Club6].includes(this.material(game, move.itemType).getItem(move.itemIndex)?.id)
                }

            }
        },



        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.end"><strong /><em /></Trans> },
        },



        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.SpadeQueen

            }
        },


        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade5

            }
        },


        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade10

            }
        },

        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump2
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.1"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Club1
            }
        },


        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Club2
            }
        },



        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.ClubKing
            }
        },



        {
            popup: { text: () => <Trans defaults="tuto.rules.2"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.3"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.4"><strong /><em /></Trans> },
        },


        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump1
            }
        },


        {
            popup: { text: () => <Trans defaults="tuto.rules.5"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade2
            }
        },



        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump6
            }
        },


        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.SpadeKnight
            }
        },


        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.SpadeJack
            }
        },


        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Club3
            }
        },


        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Club10
            }
        },

        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump10
            }
        },


        {
            popup: { text: () => <Trans defaults="tuto.rules.6"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump17
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.7"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade3
            }
        },

        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump16
            }
        },

        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump3
            }
        },


        {
            popup: { text: () => <Trans defaults="tuto.rules.8"><strong /><em /></Trans> },
        },


        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade1
            }
        },


        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Diamond1
            }
        },

        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump4
            }
        },


        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Diamond4
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.9"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.10"><strong /><em /></Trans> },
        },


        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Excuse
            }
        },



        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump15
            }
        },

        
        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump7
            }
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump19
            }
        },


        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Trump20
            }
        },


        {
            move: {
                player: 2,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Diamond7
            }
        },

        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Club8
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.11"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 4,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.DiamondKnight
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.12"><strong /><em /></Trans> },
        },


        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.DiamondKing
            }
        },

        {
            popup: { text: () => <Trans defaults="tuto.rules.13"><strong /><em /></Trans> },
        },

    ]


}