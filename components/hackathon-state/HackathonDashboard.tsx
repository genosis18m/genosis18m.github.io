'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { CURATED_HACKATHONS } from '@/lib/hackathon-state/curated'
import type {
  Hackathon,
  ModeFilter,
  SortDimension,
  UserHackathonState,
  ViewTab,
} from '@/lib/hackathon-state/types'
import {
  filterHackathons,
  isExpired,
  loadUserMap,
  mergeHackathons,
  saveUserMap,
  sortHackathons,
} from '@/lib/hackathon-state/utils'

const SORT_CHIPS: { value: SortDimension; label: string }[] = [
  { value: 'prize', label: 'Prize' },
  { value: 'date', label: 'Soonest' },
  { value: 'name', label: 'A–Z' },
]

const WHERE_CHIPS: { value: ModeFilter; label: string }[] = [
  { value: 'all', label: 'Remote + cities' },
  { value: 'online', label: 'Remote only' },
  { value: 'cities', label: 'Delhi · Mumbai · Gurgaon · Pune · Noida' },
]

const TABS: { id: ViewTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'current', label: 'Current' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'done', label: 'Done' },
]

function modeLabel(mode: Hackathon['mode']) {
  if (mode === 'in-person') return 'In person'
  if (mode === 'online') return 'Remote'
  if (mode === 'hybrid') return 'Hybrid'
  return 'TBA'
}

function statusLabel(h: Hackathon, state: UserHackathonState) {
  if (state === 'done') return 'done'
  if (state === 'applying') return 'applying'
  if (h.status === 'open') return 'open'
  if (isExpired(h)) return 'ended'
  return 'upcoming'
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 text-sm transition-colors"
      style={{
        color: active ? 'var(--text-primary)' : 'var(--text-muted)',
        borderBottom: active ? '1px solid var(--text-primary)' : '1px solid transparent',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </button>
  )
}

export default function HackathonDashboard() {
  const [feed, setFeed] = useState<Hackathon[]>([])
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userMap, setUserMap] = useState<Record<string, UserHackathonState>>({})
  const [tab, setTab] = useState<ViewTab>('all')
  const [sortDims, setSortDims] = useState<SortDimension[]>(['prize', 'date'])
  const [mode, setMode] = useState<ModeFilter>('all')
  const [query, setQuery] = useState('')
  const [hideExpired, setHideExpired] = useState(true)
  const [, startTransition] = useTransition()

  useEffect(() => {
    setUserMap(loadUserMap())
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/hackathon-state/feed.json?t=${Date.now()}`, {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`Feed HTTP ${res.status}`)
        const data = (await res.json()) as {
          updatedAt?: string
          hackathons?: Hackathon[]
        }
        if (cancelled) return
        setFeed(data.hackathons || [])
        setUpdatedAt(data.updatedAt || null)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load feed')
          setFeed([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const setState = (id: string, next: UserHackathonState) => {
    setUserMap((prev) => {
      const updated = { ...prev }
      if (next === 'none') delete updated[id]
      else updated[id] = next
      saveUserMap(updated)
      return updated
    })
  }

  const toggleSort = (dim: SortDimension) => {
    setSortDims((prev) => {
      if (prev.includes(dim)) {
        const next = prev.filter((d) => d !== dim)
        return next.length ? next : prev // keep at least one
      }
      return [...prev, dim]
    })
  }

  const allHackathons = useMemo(
    () => mergeHackathons([CURATED_HACKATHONS, feed]),
    [feed]
  )

  const counts = useMemo(() => {
    const base = filterHackathons(allHackathons, {
      tab: 'all',
      userMap: {},
      query: '',
      mode,
      minPrize: 0,
      hideExpired,
    })
    const applying = allHackathons.filter((h) => userMap[h.id] === 'applying').length
    const done = allHackathons.filter((h) => userMap[h.id] === 'done').length
    const upcoming = base.filter((h) => userMap[h.id] !== 'done' && !isExpired(h)).length
    return { all: base.length, applying, done, upcoming }
  }, [allHackathons, userMap, mode, hideExpired])

  const visible = useMemo(() => {
    return sortHackathons(
      filterHackathons(allHackathons, {
        tab,
        userMap,
        query,
        mode,
        minPrize: 0,
        hideExpired,
      }),
      sortDims
    )
  }, [allHackathons, tab, userMap, query, mode, hideExpired, sortDims])

  const countFor = (id: ViewTab) =>
    id === 'all'
      ? counts.all
      : id === 'current'
        ? counts.applying
        : id === 'done'
          ? counts.done
          : counts.upcoming

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
    >
      <header className="border-b" style={{ borderColor: 'var(--divider)' }}>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Coding · Product · AI · Grad 2027
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">Hackathon state</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Remote events, or in-person in Delhi / Mumbai / Gurgaon / Pune / Noida.
            Sourced from Devpost, Devfolio, and Unstop. Mechatronics / CAD tracks are filtered out.
          </p>
          <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            {loading ? 'Loading…' : `${visible.length} shown`}
            {updatedAt ? ` · feed ${new Date(updatedAt).toLocaleDateString()}` : ''}
            {error ? ' · feed offline, curated still available' : ''}
          </p>

          <nav className="mt-8 flex flex-wrap gap-x-1 gap-y-2" aria-label="Views">
            {TABS.map((t) => (
              <Chip
                key={t.id}
                active={tab === t.id}
                onClick={() => startTransition(() => setTab(t.id))}
              >
                {t.label}
                <span className="ml-1.5 tabular-nums" style={{ color: 'var(--text-label)' }}>
                  {countFor(t.id)}
                </span>
              </Chip>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, org, theme…"
            className="w-full border-0 border-b bg-transparent py-2 text-sm outline-none"
            style={{ borderColor: 'var(--divider)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="mb-3">
          <p className="mb-1 text-xs" style={{ color: 'var(--text-label)' }}>
            Sort · tap multiple (order = priority)
          </p>
          <div className="flex flex-wrap gap-1">
            {SORT_CHIPS.map((c) => {
              const active = sortDims.includes(c.value)
              const rank = active ? sortDims.indexOf(c.value) + 1 : null
              return (
                <Chip key={c.value} active={active} onClick={() => toggleSort(c.value)}>
                  {c.label}
                  {rank != null && (
                    <span className="ml-1 tabular-nums" style={{ color: 'var(--text-label)' }}>
                      {rank}
                    </span>
                  )}
                </Chip>
              )
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-1 text-xs" style={{ color: 'var(--text-label)' }}>
            Where
          </p>
          <div className="flex flex-wrap gap-1">
            {WHERE_CHIPS.map((c) => (
              <Chip
                key={c.value}
                active={mode === c.value}
                onClick={() => startTransition(() => setMode(c.value))}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={hideExpired}
              onChange={(e) => setHideExpired(e.target.checked)}
            />
            Hide ended
          </label>
          <button
            type="button"
            className="underline-offset-2 hover:underline"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => {
              if (confirm('Clear all marks in this browser?')) {
                setUserMap({})
                saveUserMap({})
              }
            }}
          >
            Reset marks
          </button>
        </div>

        {tab === 'current' && counts.applying === 0 && (
          <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            Nothing in Current. Tap Applying on a row to pin it here.
          </p>
        )}

        {loading && visible.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Loading…
          </p>
        ) : visible.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No matches for these filters.
          </p>
        ) : (
          <ul className="border-t" style={{ borderColor: 'var(--divider)' }}>
            {visible.map((h) => {
              const state = userMap[h.id] || 'none'
              return (
                <li
                  key={h.id}
                  className="border-b py-5"
                  style={{ borderColor: 'var(--divider)' }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="text-base font-semibold tracking-[-0.02em]">{h.name}</h2>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {statusLabel(h, state)} · {h.source}
                        </span>
                      </div>
                      <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {[h.organization, h.location, modeLabel(h.mode)]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                      <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {h.dateLabel}
                        {h.themes.length ? ` · ${h.themes.slice(0, 4).join(', ')}` : ''}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                      <p className="text-sm font-medium tabular-nums">{h.prizeLabel}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            setState(h.id, state === 'applying' ? 'none' : 'applying')
                          }
                          className="underline-offset-2 hover:underline"
                          style={{
                            color:
                              state === 'applying'
                                ? 'var(--text-primary)'
                                : 'var(--text-muted)',
                            fontWeight: state === 'applying' ? 600 : 400,
                          }}
                        >
                          {state === 'applying' ? 'Applying ✓' : 'Applying'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setState(h.id, state === 'done' ? 'none' : 'done')}
                          className="underline-offset-2 hover:underline"
                          style={{
                            color:
                              state === 'done' ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontWeight: state === 'done' ? 600 : 400,
                          }}
                        >
                          {state === 'done' ? 'Done ✓' : 'Done'}
                        </button>
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-2 hover:underline"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Open ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <p className="mt-10 text-xs leading-relaxed" style={{ color: 'var(--text-label)' }}>
          Feed refreshes on deploy from Devpost, Devfolio, and Unstop. Marks stay in localStorage.
        </p>
      </main>
    </div>
  )
}
