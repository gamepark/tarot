import { OptionsSpec } from '@gamepark/rules-api'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type TarotOptions = {
  players: number,
  round: number
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const TarotOptionsSpec: OptionsSpec<TarotOptions> = {
  round: {
    label: (t) => t('round.count'),
    help: (t) => t('round.count.help'),
    competitiveDisabled: true,
    values: [1, 2, 3, 4, 5],
    valueSpec: r => ({ label: () => `${r}` })
  }
}
