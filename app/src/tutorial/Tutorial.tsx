/** @jsxImportSource @emotion/react */
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { TutorialSetup } from './TutorialSetup'
import { Trans } from 'react-i18next'
import { MaterialGame, isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { Card } from '@gamepark/tarot/Card'



export class Tutorial extends MaterialTutorial {
    options = { players: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }] }
    setup = new TutorialSetup()


    players = [
        { id: 0 },
        {
            id: 1,
            name: 'Roi de Coeur',
        },
        {
            id: 2,
            name: 'Dame de Pique',
        },
        {
            id: 3,
            name: 'Valet de Trèfle',
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
            move: {
                player: 2,
                filter: isCustomMoveType(CustomMoveType.Pass)
            }
        },


        {
            popup: { text: () => <Trans defaults="tuto.second.player.bid.small"><strong /><em /></Trans> },
            move: {
                player: 3,
                filter: isCustomMoveType(CustomMoveType.Bid) //Choisir Petite.
            }
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
            popup: { text: () => <Trans defaults="tuto.you.bid.guard.4"><strong /><em /></Trans> },
        },


        {
            move: {
                player: 0,
                filter: isCustomMoveType(CustomMoveType.Bid) 
            }
        },

        {
            move: {
                player: 1,
                filter: isCustomMoveType(CustomMoveType.Pass) 
            }
        },


        {
            move: {
                player: 1,
                filter: isCustomMoveType(CustomMoveType.Pass) 
            }
        },        
    ]


}