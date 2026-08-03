#!/usr/bin/env node
/**
 * Builds public/hackathon-state/feed.json from Devpost + Devfolio + Unstop.
 * Filters: coding / product / AI only; remote OR Delhi / Mumbai / Gurgaon / Pune / Noida.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'public', 'hackathon-state', 'feed.json')

const ALLOWED_CITY =
  /\b(new\s*delhi|delhi|noida|greater\s*noida|gurgaon|gurugram|mumbai|bombay|navi\s*mumbai|thane|pune|pimpri|chinchwad)\b/i

const EXCLUDE_TOPIC =
  /\b(mechatronic|mechatr|cad\b|solidworks|autocad|catia|ansys|cnc|3d[\s-]?print|pcb\b|vlsi|embedded\s*hardware|robotics\s*hardware|drone\s*hardware|mechanical\s*design|civil\s*engineering|architecture\s*design|fashion|photography\s*contest|video\s*editing|storyboard|quiz\s*only|treasure\s*hunt|sports\s*quiz|debate\s*only)\b/i

const INCLUDE_TOPIC =
  /\b(cod(e|ing)|software|programm|hackathon|ai\b|artificial\s*intelligence|machine\s*learning|\bml\b|llm|genai|generative|product(\s|$)|saas|web3?|app\s*dev|fullstack|full[\s-]?stack|backend|frontend|devtools|api\b|cloud|data\s*scien|nlp|computer\s*vision|blockchain|fintech|startup|open[\s-]?ended|no\s*restrictions|agentic|typescript|react|python|golang|\bgo\b)\b/i

function blobOf(...parts) {
  return parts
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function isTopicOk(blob) {
  if (EXCLUDE_TOPIC.test(blob)) return false
  if (INCLUDE_TOPIC.test(blob)) return true
  return /\bhack\b/.test(blob)
}

function isLocationOk(mode, blob) {
  if (mode === 'online') return true
  if (/\b(online|remote|virtual|worldwide|global online)\b/i.test(blob)) return true
  return ALLOWED_CITY.test(blob)
}

function parsePrizeAmount(raw) {
  if (!raw) return 0
  const text = String(raw).replace(/<[^>]*>/g, '').replace(/,/g, '').trim()
  const match = text.match(/([\d]+(?:\.\d+)?)/)
  if (!match) return 0
  const value = Number(match[1])
  if (/₹|INR|Rs\.?/i.test(text)) return value
  if (/€|EUR/i.test(text)) return value * 1.08
  if (/£|GBP/i.test(text)) return value * 1.27
  return value
}

function formatPrizeLabel(raw, amount, currencyHint) {
  if (raw) {
    const cleaned = String(raw).replace(/<[^>]*>/g, '').trim()
    if (cleaned) {
      return cleaned.startsWith('$') || cleaned.startsWith('₹') || cleaned.startsWith('€')
        ? cleaned
        : `$${cleaned}`
    }
  }
  if (!amount) return 'TBA'
  if (currencyHint === 'INR') return `₹${amount.toLocaleString('en-IN')}`
  return `$${amount.toLocaleString('en-US')}`
}

function parseDevpostDates(label) {
  const cleaned = String(label || '').replace(/\u2013|\u2014/g, '-').trim()
  const yearMatch = cleaned.match(/(20\d{2})\s*$/)
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear()
  const months = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
    apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
    aug: 7, august: 7, sep: 8, sept: 8, september: 8,
    oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
  }
  const range = cleaned.replace(/,?\s*20\d{2}\s*$/, '').trim()
  const parts = range.split(/\s*-\s*/)
  if (parts.length < 2) return { startDate: null, endDate: null }
  const parseSide = (side, fallbackMonth) => {
    const tokens = side.trim().split(/\s+/)
    if (tokens.length === 1 && /^\d+$/.test(tokens[0]) && fallbackMonth != null) {
      return new Date(Date.UTC(year, fallbackMonth, Number(tokens[0]))).toISOString().slice(0, 10)
    }
    if (tokens.length >= 2) {
      const m = months[tokens[0].toLowerCase()]
      const day = Number(tokens[1])
      if (m == null || !day) return null
      return new Date(Date.UTC(year, m, day)).toISOString().slice(0, 10)
    }
    return null
  }
  const startMonth = months[parts[0].trim().split(/\s+/)[0]?.toLowerCase()]
  return { startDate: parseSide(parts[0]), endDate: parseSide(parts[1], startMonth) }
}

function detectMode(location, icon, isOnline) {
  if (isOnline === true) return 'online'
  const loc = (location || '').toLowerCase()
  if (icon === 'globe' || loc.includes('online') || loc.includes('virtual') || loc.includes('remote')) {
    return 'online'
  }
  if (loc.includes('hybrid')) return 'hybrid'
  if (!loc || loc === 'tbd' || loc === 'tba') return 'unknown'
  return 'in-person'
}

function keep(item) {
  if (!item || item.status === 'ended') return false
  if (item.invite_only) return false
  const blob = blobOf(
    item.name,
    item.organization,
    item.location,
    item.eligibility,
    item.notes,
    item.themes
  )
  if (blob.includes('high school only') || blob.includes('high-school only')) return false
  if (!isTopicOk(blob)) return false
  if (!isLocationOk(item.mode, blob)) return false
  return true
}

async function fetchDevpost() {
  const PER_PAGE = 9
  const MAX_PAGES = 10
  async function page(status, n) {
    const params = new URLSearchParams()
    params.append('status[]', status)
    params.set('page', String(n))
    const res = await fetch(`https://devpost.com/api/hackathons?${params}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'hackathon-state-feed/2.0' },
    })
    if (!res.ok) throw new Error(`Devpost ${status} ${n}: ${res.status}`)
    return res.json()
  }
  const out = []
  for (const status of ['open', 'upcoming']) {
    const first = await page(status, 1)
    const total = first.meta?.total_count || 0
    const pages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(total / PER_PAGE)))
    const rows = [...(first.hackathons || [])]
    for (let p = 2; p <= pages; p++) {
      try {
        const data = await page(status, p)
        rows.push(...(data.hackathons || []))
      } catch (e) {
        console.warn(e.message)
        break
      }
    }
    for (const h of rows) {
      if (!h || h.invite_only) continue
      const location = h.displayed_location?.location || 'TBA'
      const { startDate, endDate } = parseDevpostDates(h.submission_period_dates || '')
      const prizeAmount = parsePrizeAmount(h.prize_amount)
      let statusMapped = h.open_state === 'open' ? 'open' : 'upcoming'
      if (endDate && new Date(endDate) < new Date()) statusMapped = 'ended'
      out.push({
        id: `devpost-${h.id}`,
        name: h.title,
        url: h.url,
        organization: h.organization_name || undefined,
        location,
        mode: detectMode(location, h.displayed_location?.icon),
        startDate,
        endDate,
        dateLabel: h.submission_period_dates || 'TBA',
        prizeAmount,
        prizeLabel: formatPrizeLabel(h.prize_amount, prizeAmount),
        themes: (h.themes || []).map((t) => t.name).filter(Boolean),
        source: 'devpost',
        status: statusMapped,
        featured: Boolean(h.featured),
        eligibility: 'Open registration (check event page)',
        notes: h.time_left_to_submission || undefined,
      })
    }
  }
  return out
}

async function fetchDevfolio() {
  const out = []
  for (const filter of ['application_open', 'upcoming', 'live']) {
    let page = 1
    let pages = 1
    do {
      const res = await fetch(
        `https://api.devfolio.co/api/hackathons?filter=${filter}&page=${page}&limit=50`,
        { headers: { Accept: 'application/json', 'User-Agent': 'hackathon-state-feed/2.0' } }
      )
      if (!res.ok) {
        console.warn(`Devfolio ${filter} page ${page}: ${res.status}`)
        break
      }
      const data = await res.json()
      pages = data.pages || 1
      for (const h of data.result || []) {
        const location =
          h.is_online
            ? 'Online'
            : [h.city, h.state, h.country].filter(Boolean).join(', ') ||
              h.location ||
              'India'
        const startDate = h.starts_at ? h.starts_at.slice(0, 10) : null
        const endDate = h.ends_at ? h.ends_at.slice(0, 10) : null
        const themes = (h.themes || []).map((t) => t.name).filter(Boolean)
        const subdomain = h.hackathon_setting?.subdomain || h.slug
        out.push({
          id: `devfolio-${h.uuid}`,
          name: h.name,
          url: subdomain ? `https://${subdomain}.devfolio.co/` : `https://devfolio.co/hackathons/${h.slug}`,
          organization: h.hackathon_brand?.name || 'Devfolio',
          location,
          mode: detectMode(location, undefined, Boolean(h.is_online)),
          startDate,
          endDate,
          dateLabel:
            startDate && endDate
              ? `${startDate} → ${endDate}`
              : startDate || 'TBA',
          prizeAmount: 0,
          prizeLabel: 'See Devfolio',
          themes: themes.length ? themes : ['Software', 'Hackathon'],
          source: 'devfolio',
          status: filter === 'live' ? 'open' : filter === 'application_open' ? 'open' : 'upcoming',
          featured: Boolean(h.devfolio_official),
          eligibility: 'Open on Devfolio (India-friendly)',
        })
      }
      page += 1
    } while (page <= pages && page <= 4)
  }
  return out
}

async function fetchUnstop() {
  const out = []
  const MAX_PAGES = 8
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(
      `https://unstop.com/api/public/opportunity/search-new?opportunity=hackathons&page=${page}&per_page=50`,
      { headers: { Accept: 'application/json', 'User-Agent': 'hackathon-state-feed/2.0' } }
    )
    if (!res.ok) {
      console.warn(`Unstop page ${page}: ${res.status}`)
      break
    }
    const data = await res.json()
    const rows = data.data?.data || []
    if (!rows.length) break
    for (const h of rows) {
      const city = h.address_with_country_logo?.city || ''
      const isOnline = String(h.region || '').toLowerCase() === 'online'
      const location = isOnline
        ? 'Online'
        : [city, h.address_with_country_logo?.state, 'India'].filter(Boolean).join(', ')
      const skills = (h.required_skills || []).map((s) => s.skill || s.skill_name).filter(Boolean)
      const prizeAmount = (h.prizes || []).reduce((sum, p) => sum + (Number(p.cash) || 0), 0)
      const startDate = h.start_date ? h.start_date.slice(0, 10) : null
      const endDate = h.end_date ? h.end_date.slice(0, 10) : null
      const path = h.public_url || h.seo_url || ''
      out.push({
        id: `unstop-${h.id}`,
        name: h.title,
        url: path.startsWith('http') ? path : `https://unstop.com/${path}`,
        organization: h.organisation?.name || undefined,
        location,
        mode: detectMode(location, undefined, isOnline),
        startDate,
        endDate,
        dateLabel:
          startDate && endDate ? `${startDate} → ${endDate}` : startDate || 'TBA',
        prizeAmount,
        prizeLabel: formatPrizeLabel(null, prizeAmount, 'INR'),
        themes: skills.slice(0, 8).length ? skills.slice(0, 8) : ['Coding', 'Hackathon'],
        source: 'unstop',
        status: h.regn_open ? 'open' : 'upcoming',
        featured: false,
        eligibility: 'Indian students (Unstop)',
      })
    }
    const last = data.data?.last_page || page
    if (page >= last) break
  }
  return out
}

async function main() {
  console.log('Fetching Devpost + Devfolio + Unstop…')
  const [devpost, devfolio, unstop] = await Promise.all([
    fetchDevpost().catch((e) => {
      console.warn('Devpost failed:', e.message)
      return []
    }),
    fetchDevfolio().catch((e) => {
      console.warn('Devfolio failed:', e.message)
      return []
    }),
    fetchUnstop().catch((e) => {
      console.warn('Unstop failed:', e.message)
      return []
    }),
  ])

  const seen = new Set()
  const hackathons = []
  for (const item of [...devfolio, ...unstop, ...devpost]) {
    if (!keep(item)) continue
    if (seen.has(item.id)) continue
    const nameKey = item.name.trim().toLowerCase()
    if (seen.has(nameKey)) continue
    seen.add(item.id)
    seen.add(nameKey)
    hackathons.push(item)
  }

  hackathons.sort((a, b) => b.prizeAmount - a.prizeAmount)

  const payload = {
    updatedAt: new Date().toISOString(),
    sources: ['devpost', 'devfolio', 'unstop'],
    filters: {
      topics: 'coding | product | AI',
      locations: 'remote OR Delhi / Mumbai / Gurgaon / Pune / Noida',
    },
    count: hackathons.length,
    hackathons,
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2))
  console.log(
    `Wrote ${hackathons.length} filtered hackathons (devpost ${devpost.length}, devfolio ${devfolio.length}, unstop ${unstop.length}) → ${OUT}`
  )
}

main().catch((err) => {
  console.error(err)
  if (!fs.existsSync(OUT)) {
    fs.mkdirSync(path.dirname(OUT), { recursive: true })
    fs.writeFileSync(
      OUT,
      JSON.stringify(
        {
          updatedAt: new Date().toISOString(),
          sources: [],
          count: 0,
          hackathons: [],
          error: String(err),
        },
        null,
        2
      )
    )
  }
  process.exitCode = 0
})
