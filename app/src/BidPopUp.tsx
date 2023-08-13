/** @jsxImportSource @emotion/react */
import { Trans } from 'react-i18next'

import { css } from '@emotion/react'




export const BidPopUp = () => {




  return (
    <>
        <div css={bidCss}> 
          <div css={[buttonCss]}> 
            <p><Trans defaults="Small"><span/></Trans></p>
          </div>

          <div css={[buttonCss]}> 
            <p><Trans defaults="Guard"><span/></Trans></p>
          </div>

          <div css={[buttonCss]}> 
            <p><Trans defaults="Guard Without the Kitty"><span/></Trans></p>
          </div>

          <div css={[buttonCss]}> 
            <p><Trans defaults="Guard Against the Kitty"><span/></Trans></p>
          </div>
        </div>
    </>
  )
}




const bidCss = css`
  font-size: 3em;
  opacity: 1;
  border: 0.1em solid white;
  height: 27em;
  width:10em;
  position:absolute;
  right:15em;
  top:3em;
  text-align:center;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`  

const buttonCss = css`
  text-align:center;
  margin:auto;
  color:black;
  height:5em;
  border : 1em solid white;
  border-radius: 25% 24% 24% 25% / 26% 26% 26% 26%;
  background:white;
  display:flex;

  `
