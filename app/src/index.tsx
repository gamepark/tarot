/** @jsxImportSource @emotion/react */
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { TarotOptionsSpec } from '@gamepark/tarot/TarotOptions'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { tarotAnimations } from './animations/TarotAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="tarot"
      Rules={TarotRules}
      optionsSpec={TarotOptionsSpec}
      GameSetup={TarotSetup}
      material={Material}
      locators={Locators}
      animations={tarotAnimations}
      tutorial={new Tutorial()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
