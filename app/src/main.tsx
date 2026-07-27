import { css, Global } from '@emotion/react'
import { GameProvider } from '@gamepark/react-game'
import { TarotOptionsSpec } from '@gamepark/tarot/TarotOptions'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { tarotAnimations } from './animations/TarotAnimations'
import { App } from './App'
import BackgroundCover from './images/background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { tarotScoring } from './scoring/TarotScoring'
import { Tutorial } from './tutorial/Tutorial'

const playMatCss = css`
  #root {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${BackgroundCover}) center/cover;
  }
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="tarot"
      Rules={TarotRules}
      optionsSpec={TarotOptionsSpec}
      GameSetup={TarotSetup}
      material={Material}
      locators={Locators}
      animations={tarotAnimations}
      scoring={tarotScoring}
      tutorial={new Tutorial()}
    >
      <App />
      <Global styles={playMatCss} />
    </GameProvider>
  </StrictMode>
)
