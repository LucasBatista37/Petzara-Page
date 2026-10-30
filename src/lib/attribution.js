/**
 * Origem da visita (L2).
 *
 * - Lê ?utm_source, utm_medium, utm_campaign, utm_content, utm_term da página.
 * - Guarda a primeira origem com UTM no localStorage (primeiro toque).
 * - UTM da página atual vale mais que a guardada.
 *
 * Usado por src/siteConfig.js para montar, uma vez por carregamento:
 * - o link de cadastro (app.petzara.app/register?utm_…) — o sistema web lê e grava a origem;
 * - o link da Play com &referrer=utm_source%3D…%26utm_medium%3D…%26utm_campaign%3D… (padrão "site").
 */

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const STORAGE_KEY = 'pz_utm'
const MAX_LEN = 100

function clean(v) {
    return String(v ?? '').trim().slice(0, MAX_LEN)
}

function fromSearch(search) {
    const out = {}
    try {
        const params = new URLSearchParams(search)
        for (const k of UTM_KEYS) {
            const v = clean(params.get(k))
            if (v) out[k] = v
        }
    } catch { /* URL inválida */ }
    return out
}

function readStored() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : null
        if (!parsed || typeof parsed !== 'object') return {}
        const out = {}
        for (const k of UTM_KEYS) if (parsed[k]) out[k] = clean(parsed[k])
        return out
    } catch { return {} }
}

/** UTM efetiva da visita: a da URL atual; sem UTM na URL, a guardada na 1ª visita. */
export function resolveUtm() {
    if (typeof window === 'undefined') return {}
    const current = fromSearch(window.location.search)
    const stored = readStored()
    if (Object.keys(current).length) {
        if (!Object.keys(stored).length) {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, at: new Date().toISOString() }))
            } catch { /* armazenamento bloqueado */ }
        }
        return current
    }
    return stored
}

// ── Clique do Google Ads (CONTRATO-ADS) ────────────────────────────────────────────────────────
// gclid/gbraid/wbraid que o Google Ads acrescenta na URL (marcação automática). Vale o último clique,
// por até 90 dias. Vai no link de cadastro (com gclid_at = hora do clique) para o sistema web gravar na
// conta; o backend usa só o id do clique para a importação de conversões offline (sem dados pessoais).
// Quem recusou os cookies não tem o clique guardado nem repassado.
export const CLICK_KEYS = ['gclid', 'gbraid', 'wbraid']
const CLICK_STORAGE_KEY = 'pz_click'
const CLICK_ID = /^[A-Za-z0-9_-]{10,300}$/
const CLICK_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

function consentDeclined() {
    try { return window.localStorage.getItem('pz_cookie_consent') === 'declined' } catch { return false }
}

export function clickFromSearch(search) {
    const out = {}
    try {
        const params = new URLSearchParams(search)
        for (const k of CLICK_KEYS) {
            const v = String(params.get(k) ?? '').trim()
            if (CLICK_ID.test(v)) out[k] = v
        }
    } catch { /* URL inválida */ }
    return out
}

function readStoredClick(now) {
    try {
        const parsed = JSON.parse(window.localStorage.getItem(CLICK_STORAGE_KEY) || 'null')
        const at = Number(parsed?.at)
        if (!Number.isFinite(at) || at > now || now - at > CLICK_MAX_AGE_MS) return {}
        const out = {}
        for (const k of CLICK_KEYS) if (CLICK_ID.test(String(parsed[k] ?? ''))) out[k] = parsed[k]
        return Object.keys(out).length ? { ...out, gclid_at: String(at) } : {}
    } catch { return {} }
}

/** Parâmetros do clique para o link de cadastro: { gclid?, gbraid?, wbraid?, gclid_at } ou {}. */
export function resolveClick(now = Date.now()) {
    if (typeof window === 'undefined' || consentDeclined()) return {}
    const current = clickFromSearch(window.location.search)
    if (Object.keys(current).length) {
        try {
            window.localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify({ ...current, at: now }))
        } catch { /* armazenamento bloqueado: repassa só nesta visita */ }
        return { ...current, gclid_at: String(now) }
    }
    return readStoredClick(now)
}

/** Acrescenta parâmetros a uma URL absoluta, sem duplicar "?". */
export function withParams(url, params = {}) {
    const u = new URL(url)
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && v !== '') u.searchParams.set(k, v)
    }
    return u.toString()
}

/** Link da Play com referrer de instalação (a Play repassa ao app/Play Console). */
export function playUrlWithReferrer(baseUrl, utm = {}) {
    const referrer = [
        `utm_source=${encodeURIComponent(utm.utm_source || 'site')}`,
        `utm_medium=${encodeURIComponent(utm.utm_medium || 'site')}`,
        `utm_campaign=${encodeURIComponent(utm.utm_campaign || 'site')}`,
    ].join('&')
    return withParams(baseUrl, { referrer })
}
