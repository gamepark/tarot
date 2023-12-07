/** @jsxImportSource @emotion/react */
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { TutorialSetup } from './TutorialSetup'
import { Trans } from 'react-i18next'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'



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
                filter: isCustomMoveType(CustomMoveType.Bid)
            }
        },



        {
            move: { filter: isCustomMoveType(CustomMoveType.Bid) }
        },

    ]


}