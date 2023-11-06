/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialComponent, PlayMoveButton, pointerCursorCss, ThemeButton, useLegalMoves, usePlay, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { CustomMoveType } from '@gamepark/tarot/rules/CustomMoveType'
import { Poignee } from '@gamepark/tarot/rules/Poignee'
import { getPoigneeMinTrumps, PlayCardRule } from '@gamepark/tarot/rules/PlayCardRule'
import { poigneeScore } from '@gamepark/tarot/rules/ScoringRule'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { useCallback, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PoigneeDialogContent = ({ close }: { close: () => void }) => {
  const { t } = useTranslation()
  const rules = useRules<TarotRules>()!
  const poigneeMoves = useLegalMoves<CustomMove>(isCustomMoveType(CustomMoveType.Poignee)).reverse()
  const poigneesSize = useMemo(() => getPoigneeMinTrumps(rules.game.players.length), [rules.game.players.length])
  const play = usePlay()

  const playerTrumps = useMemo(() =>
    new PlayCardRule(rules.game).playerTrumpsForPoignee.sort(item => item.id).getItems().map(item => item.id)
    , [rules.game])

  const [selected, setSelected] = useState(() =>
    playerTrumps.slice(0, Math.max(...Object.values(poigneesSize).filter(size => size <= playerTrumps.length)))
  )

  const revealSelectedCards = useCallback(() => {
    for (const card of selected) {
      play(rules.material(MaterialType.Card).id(card).moveItem({ type: LocationType.Poigne }), { delayed: true })
    }
  }, [selected, play])

  const illegalExcuseSelection = selected.length < playerTrumps.length && selected.includes(Card.Excuse)

  return <div css={dialogCss}>
    <h2><Trans defaults="rules.poignee"><span /></Trans></h2>
    <p>{t('rules.poignee.trumps', { trumps: playerTrumps.length })}</p>
    {poigneeMoves.map(move => {
      const poignee = move.data as Poignee
      return <p key={poignee}>{t('rules.poignee.details', { poignee, number: poigneesSize[poignee], score: poigneeScore[poignee] })}</p>
    })}
    <p>{t('rules.poignee.select')}</p>
    <ol css={grid}>
      {playerTrumps.map(card =>
        <li key={card}>
          <MaterialComponent type={MaterialType.Card} itemId={card} css={pointerCursorCss} playDown={!selected.includes(card)}
            onClick={() => setSelected(selected =>
              selected.includes(card) ? selected.filter(c => c !== card) : selected.concat(card)
            )} />
        </li>
      )}
    </ol>
    {illegalExcuseSelection &&
      <p css={css`color: darkred;`} >{t('rules.poignee.excuse')}</p>
    }
    {poigneeMoves.map(move => {
      const poigneeSize = poigneesSize[move.data as Poignee]
      return <p key={move.data}>
        <PlayMoveButton move={move} onPlay={revealSelectedCards} disabled={selected.length !== poigneeSize || illegalExcuseSelection}>
          {
            selected.length === poigneeSize ?
              t('rules.poignee.reveal', { poignee: move.data })
              : selected.length < poigneeSize ?
                t('rules.poignee.select.more', { number: poigneeSize - selected.length, poignee: move.data })
                : t('rules.poignee.select.less', { number: selected.length - poigneeSize, poignee: move.data })
          }
        </PlayMoveButton>
      </p>
    }
    )}
    <p><ThemeButton onClick={() => close()}>
      {t('rules.poignee.dismiss')}
    </ThemeButton></p>
  </div>
}

const dialogCss = css`
  max-width: 120em;
  padding: 5em;

  h2 {
    text-align: center;
    font-size: 4em;
    margin: 0;
  }

  p {
    font-size: 3em;
    white-space: break-spaces;
  }
`

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`