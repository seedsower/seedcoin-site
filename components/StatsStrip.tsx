import { LiveStat } from './LiveStat'
import { getPrices } from '@/lib/prices'
import { formatPrice, formatMarketCap, formatVolume, formatPercent } from '@/lib/utils'

export async function StatsStrip() {
  const data = await getPrices()

  const pegDeviation =
    data.susdPrice != null
      ? parseFloat(((data.susdPrice - 1) * 100).toFixed(3))
      : null

  const pegLabel =
    pegDeviation == null
      ? '—'
      : Math.abs(pegDeviation) < 0.05
      ? 'On peg'
      : `${pegDeviation > 0 ? '+' : ''}${pegDeviation}%`

  return (
    <div
      className="border-y border-white/8 bg-soil-2/60 backdrop-blur-sm"
      aria-label="Live market statistics"
    >
      <div className="container-editorial py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-8">
          <LiveStat
            label="SEED Price"
            value={formatPrice(data.seedPrice)}
            change={
              data.seedChange24h != null
                ? formatPercent(data.seedChange24h)
                : null
            }
            changePositive={
              data.seedChange24h != null ? data.seedChange24h >= 0 : null
            }
          />

          <LiveStat
            label="Market Cap"
            value={formatMarketCap(data.seedMarketCap)}
            sublabel="SEED"
          />

          <LiveStat
            label="24h Volume"
            value={formatVolume(data.seedVolume24h)}
            sublabel="SEED"
          />

          <LiveStat
            label="SUSD Peg"
            value={pegLabel === '—' ? '—' : '$1.00'}
            change={pegLabel !== '—' && pegLabel !== 'On peg' ? pegLabel : null}
            changePositive={
              pegDeviation != null
                ? pegDeviation === 0
                  ? null
                  : pegDeviation > 0
                : null
            }
            sublabel={pegLabel === 'On peg' ? 'On peg ✓' : undefined}
          />

          <LiveStat
            label="Seed in Reserve"
            value={
              data.totalSeedKg != null
                ? `${data.totalSeedKg.toLocaleString()} kg`
                : '—'
            }
            sublabel="across all banks"
          />
        </div>

        <p className="text-[10px] text-stone mt-3 text-right">
          Prices from CoinGecko · updated every 5 min · may be delayed
        </p>
      </div>
    </div>
  )
}
