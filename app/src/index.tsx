/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
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


const playMatCss = css`
  #root {
    background: linear-gradient(to bottom right, #52c234, #061700 120%);
  }
`

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
      theme={{
        root: {
          background: {
            overlay: 'linear-gradient(to bottom right,  #31741f, #061700 120%)'
          }
        }
      }}
    >
      <App/>
      <Global styles={playMatCss}/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
