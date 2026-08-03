import SiteLoader from '@/components/SiteLoader'
import GauntletCursorLoader from '@/components/GauntletCursorLoader'
import SmoothScroll from '@/components/SmoothScroll'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <GauntletCursorLoader />
      <SiteLoader />
      {children}
    </SmoothScroll>
  )
}
