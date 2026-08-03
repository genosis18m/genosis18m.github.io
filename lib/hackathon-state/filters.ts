import type { Hackathon } from './types'

/** Cities the user can travel to (NCR + Mumbai + Pune). */
export const ALLOWED_CITY_PATTERN =
  /\b(new\s*delhi|delhi|noida|greater\s*noida|gurgaon|gurugram|mumbai|bombay|navi\s*mumbai|thane|pune|pimpri|chinchwad)\b/i

const EXCLUDE_TOPIC =
  /\b(mechatronic|mechatr|cad\b|solidworks|autocad|catia|ansys|cnc|3d[\s-]?print|pcb\b|vlsi|embedded\s*hardware|robotics\s*hardware|drone\s*hardware|mechanical\s*design|civil\s*engineering|architecture\s*design|fashion|photography\s*contest|video\s*editing|storyboard|quiz\s*only|treasure\s*hunt|sports\s*quiz|debate\s*only)\b/i

const INCLUDE_TOPIC =
  /\b(cod(e|ing)|software|programm|hackathon|ai\b|artificial\s*intelligence|machine\s*learning|\bml\b|llm|genai|generative|product(\s|$)|saas|web3?|app\s*dev|fullstack|full[\s-]?stack|backend|frontend|devtools|api\b|cloud|data\s*scien|nlp|computer\s*vision|blockchain|fintech|startup|open[\s-]?ended|no\s*restrictions|agentic|typescript|react|python|golang|\bgo\b)\b/i

export function blobForHackathon(h: Pick<Hackathon, 'name' | 'themes' | 'eligibility' | 'notes' | 'organization' | 'location'>): string {
  return [h.name, h.organization, h.location, h.eligibility, h.notes, ...(h.themes || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function isCodingProductOrAi(h: Hackathon): boolean {
  const blob = blobForHackathon(h)
  if (EXCLUDE_TOPIC.test(blob)) return false
  // Soft allow: general software hackathons without strong signals
  if (INCLUDE_TOPIC.test(blob)) return true
  // Devfolio "No Restrictions" / open product builds
  if (/\bhack\b/.test(blob) && !EXCLUDE_TOPIC.test(blob)) return true
  return false
}

export function isRemoteOrAllowedCity(h: Hackathon): boolean {
  if (h.mode === 'online') return true
  const blob = blobForHackathon(h)
  if (/\b(online|remote|virtual|worldwide|global online)\b/i.test(blob)) return true
  if (ALLOWED_CITY_PATTERN.test(blob)) return true
  // Hybrid with unclear city — only keep if online keyword already handled
  return false
}

export function matchesStudentPreferences(h: Hackathon): boolean {
  return isCodingProductOrAi(h) && isRemoteOrAllowedCity(h)
}

export type LocationPreset = 'all' | 'remote' | 'cities'

export function matchesLocationPreset(h: Hackathon, preset: LocationPreset): boolean {
  if (preset === 'all') return isRemoteOrAllowedCity(h)
  if (preset === 'remote') {
    return h.mode === 'online' || /\b(online|remote|virtual)\b/i.test(blobForHackathon(h))
  }
  // cities only
  return h.mode !== 'online' && ALLOWED_CITY_PATTERN.test(blobForHackathon(h))
}
