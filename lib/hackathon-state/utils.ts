import type {
  Hackathon,
  HackathonMode,
  HackathonStatus,
  ModeFilter,
  SortDimension,
  UserHackathonState,
  ViewTab,
} from './types'
import { matchesLocationPreset, matchesStudentPreferences } from './filters'

const STORAGE_KEY = 'hackathon-state:v1'
const GRAD_YEAR = 2027

export function parsePrizeAmount(raw: string | null | undefined): number {
  if (!raw) return 0
  const text = raw.replace(/<[^>]*>/g, '').replace(/,/g, '').trim()
  const match = text.match(/([\d]+(?:\.\d+)?)/)
  if (!match) return 0
  const value = Number(match[1])
  if (/₹|INR|Rs\.?/i.test(text)) return value
  if (/€|EUR/i.test(text)) return value * 1.08
  if (/£|GBP/i.test(text)) return value * 1.27
  return value
}

export function formatPrizeLabel(raw: string | null | undefined, amount: number): string {
  if (raw) {
    const cleaned = raw.replace(/<[^>]*>/g, '').trim()
    if (cleaned) {
      return cleaned.startsWith('$') || cleaned.startsWith('₹') || cleaned.startsWith('€')
        ? cleaned
        : `$${cleaned}`
    }
  }
  if (!amount) return 'TBA'
  return `$${amount.toLocaleString('en-US')}`
}

export function detectMode(location: string, icon?: string): HackathonMode {
  const loc = (location || '').toLowerCase()
  if (icon === 'globe' || loc.includes('online') || loc.includes('virtual') || loc.includes('remote')) {
    return 'online'
  }
  if (loc.includes('hybrid')) return 'hybrid'
  if (!loc || loc === 'tbd' || loc === 'tba') return 'unknown'
  return 'in-person'
}

export function parseDevpostDates(label: string): {
  startDate: string | null
  endDate: string | null
} {
  const cleaned = label.replace(/\u2013|\u2014/g, '-').trim()
  const yearMatch = cleaned.match(/(20\d{2})\s*$/)
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear()

  const months: Record<string, number> = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
    apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
    aug: 7, august: 7, sep: 8, sept: 8, september: 8,
    oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
  }

  const range = cleaned.replace(/,?\s*20\d{2}\s*$/, '').trim()
  const parts = range.split(/\s*-\s*/)
  if (parts.length < 2) return { startDate: null, endDate: null }

  const parseSide = (side: string, fallbackMonth?: number) => {
    const tokens = side.trim().split(/\s+/)
    if (tokens.length === 1 && /^\d+$/.test(tokens[0]) && fallbackMonth != null) {
      const day = Number(tokens[0])
      return new Date(Date.UTC(year, fallbackMonth, day)).toISOString().slice(0, 10)
    }
    if (tokens.length >= 2) {
      const m = months[tokens[0].toLowerCase()]
      const day = Number(tokens[1])
      if (m == null || !day) return null
      return new Date(Date.UTC(year, m, day)).toISOString().slice(0, 10)
    }
    return null
  }

  const startMonthToken = parts[0].trim().split(/\s+/)[0]?.toLowerCase()
  const startMonth = months[startMonthToken]
  return {
    startDate: parseSide(parts[0]),
    endDate: parseSide(parts[1], startMonth),
  }
}

export function mapDevpostStatus(openState: string, endDate: string | null): HackathonStatus {
  if (openState === 'ended') return 'ended'
  if (endDate && new Date(endDate) < new Date()) return 'ended'
  if (openState === 'open') return 'open'
  return 'upcoming'
}

export function isEligibleForStudent(hackathon: Hackathon): boolean {
  const blob = [hackathon.name, hackathon.eligibility, hackathon.notes, ...hackathon.themes]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (
    blob.includes('high school only') ||
    blob.includes('high-school only') ||
    blob.includes('grades 9') ||
    blob.includes('k-12 only')
  ) {
    return false
  }

  void GRAD_YEAR
  return matchesStudentPreferences(hackathon)
}

export function isExpired(hackathon: Hackathon, now = new Date()): boolean {
  if (hackathon.status === 'ended') return true
  if (!hackathon.endDate) return false
  const end = new Date(hackathon.endDate + 'T23:59:59Z')
  return end.getTime() < now.getTime()
}

export function loadUserMap(): Record<string, UserHackathonState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, UserHackathonState>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function saveUserMap(map: Record<string, UserHackathonState>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function mergeHackathons(lists: Hackathon[][]): Hackathon[] {
  const byId = new Map<string, Hackathon>()
  const byName = new Map<string, Hackathon>()

  for (const list of lists) {
    for (const item of list) {
      const key = item.name.trim().toLowerCase()
      if (byId.has(item.id) || byName.has(key)) {
        const existing = byId.get(item.id) || byName.get(key)!
        const merged: Hackathon = {
          ...existing,
          ...item,
          featured: existing.featured || item.featured,
          prizeAmount: Math.max(existing.prizeAmount, item.prizeAmount),
          prizeLabel:
            item.prizeAmount >= existing.prizeAmount ? item.prizeLabel : existing.prizeLabel,
          themes: Array.from(new Set([...existing.themes, ...item.themes])),
          notes: item.notes || existing.notes,
          eligibility: item.eligibility || existing.eligibility,
        }
        byId.set(merged.id, merged)
        byName.set(key, merged)
        continue
      }
      byId.set(item.id, item)
      byName.set(key, item)
    }
  }

  return Array.from(byId.values())
}

export function sortHackathons(list: Hackathon[], dims: SortDimension[]): Hackathon[] {
  const active = dims.length ? dims : (['prize', 'date'] as SortDimension[])
  const time = (d: string | null) => (d ? new Date(d).getTime() : Number.MAX_SAFE_INTEGER)

  return [...list].sort((a, b) => {
    for (const dim of active) {
      let cmp = 0
      if (dim === 'prize') cmp = b.prizeAmount - a.prizeAmount
      else if (dim === 'date') cmp = time(a.startDate) - time(b.startDate)
      else if (dim === 'name') cmp = a.name.localeCompare(b.name)
      if (cmp !== 0) return cmp
    }
    return a.name.localeCompare(b.name)
  })
}

export function filterHackathons(
  list: Hackathon[],
  opts: {
    tab: ViewTab
    userMap: Record<string, UserHackathonState>
    query: string
    mode: ModeFilter
    minPrize: number
    hideExpired: boolean
  }
): Hackathon[] {
  const q = opts.query.trim().toLowerCase()
  const locationPreset =
    opts.mode === 'online' ? 'remote' : opts.mode === 'cities' ? 'cities' : 'all'

  return list.filter((h) => {
    if (opts.hideExpired && isExpired(h) && opts.userMap[h.id] !== 'done') return false
    if (!isEligibleForStudent(h)) return false
    if (!matchesLocationPreset(h, locationPreset)) return false

    const state = opts.userMap[h.id] || 'none'
    if (opts.tab === 'current' && state !== 'applying') return false
    if (opts.tab === 'done' && state !== 'done') return false
    if (opts.tab === 'upcoming' && (state === 'done' || isExpired(h))) return false

    if (h.prizeAmount < opts.minPrize) return false

    if (q) {
      const hay = [h.name, h.organization, h.location, h.eligibility, ...h.themes]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!hay.includes(q)) return false
    }

    return true
  })
}
