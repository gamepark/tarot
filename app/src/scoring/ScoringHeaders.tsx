import { useTranslation } from 'react-i18next'

export const RoundScoringHeader = ({ round, total }: { round: number; total: number }) => {
  const { t } = useTranslation()
  return <>{t('round', { round, total })}</>
}

export const TotalScoringHeader = () => {
  const { t } = useTranslation()
  return <>{t('summary.scoring.total')}</>
}
