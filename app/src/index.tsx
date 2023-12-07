/** @jsxImportSource @emotion/react */
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { TarotOptionsSpec } from '@gamepark/tarot/TarotOptions'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { Material } from './material/Material'
import { Locators } from './locators/Locators'
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
      animations={new MaterialGameAnimations()}
      tutorial={new Tutorial()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
