export type HackathonMode = 'online' | 'in-person' | 'hybrid' | 'unknown'
export type HackathonSource = 'curated' | 'devpost' | 'devfolio' | 'unstop'
export type HackathonStatus = 'upcoming' | 'open' | 'ended'

export interface Hackathon {
  id: string
  name: string
  url: string
  organization?: string
  location: string
  mode: HackathonMode
  startDate: string | null
  endDate: string | null
  dateLabel: string
  prizeAmount: number
  prizeLabel: string
  themes: string[]
  source: HackathonSource
  status: HackathonStatus
  featured?: boolean
  eligibility: string
  notes?: string
}

export type UserHackathonState = 'none' | 'applying' | 'done'

export interface HackathonUserMap {
  [id: string]: UserHackathonState
}

export type SortDimension = 'prize' | 'date' | 'name'

/** @deprecated use SortDimension[] — kept for clarity in comments */
export type SortKey = SortDimension

export type ViewTab = 'all' | 'current' | 'done' | 'upcoming'

export type ModeFilter = 'all' | 'online' | 'cities'
