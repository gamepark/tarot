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
            popup: { text: () => <Trans defaults="tuto.create.kitty.3"><strong /><em /></Trans> },
        },

        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.4"><strong /><em /></Trans> },
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Heart6
            }
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.HeartQueen 

            }
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade9 
            }
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Diamond10
            }
        },


        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Heart1

            }
        },

        {
            move: {
                player: 1,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade6

            }
        },



        {
            popup: { text: () => <Trans defaults="tuto.create.kitty.end"><strong /><em /></Trans> },
        },



        {
            move: {
                player: 3,
                filter: (move: MaterialMove, game: MaterialGame) => isMoveItemType(MaterialType.Card)(move) &&
                    this.material(game, move.itemType).getItem(move.itemIndex)?.id === Card.Spade5

            }
        },


        {
            popup: { text: () => <Trans defaults="tuto.rules.1"><strong /><em /></Trans> },
        },




    ]


}