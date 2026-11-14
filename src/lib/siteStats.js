/**
 * Medição própria de visitas do site (painel interno → Tráfego), sem cookies e sem dado pessoal.
 *
 * - Independe da faixa de cookies: não usa cookie, não guarda IP e não manda o gclid (só "veio do Google
 *   Ads: sim/não"). Ver Política de Privacidade, item 8.6.
 * - Sessão = número aleatório guardado só na aba (sessionStorage), renovado após 30 min parada ou quando a
 *   URL traz outra campanha. A origem (UTM, Google Ads, site de origem) é a da 1ª página da sessão.
 * - Eventos: pageview (cada rota), cta (cadastro, WhatsApp, Play, App Store — o mesmo listener do GA4) e
 *   video (play nos vídeos da home). Envio com sendBeacon em text/plain (sem preflight de CORS).
 * - Só roda em petzara.app (ou com VITE_SITE_STATS_URL no build, para testar). Robôs/automação: nada.
 * - Para não contar as suas próprias visitas: abra https://petzara.app/?pz_interno=1 uma vez em cada
 *   navegador (?pz_interno=0 desfaz).
 */
import { clickFromSearch, UTM_KEYS } from './attribution'

const DEFAULT_ENDPOINT = 'https://api.petzara.app/api/site/eventos'
const ENDPOINT = (import.meta.env.VITE_SITE_STATS_URL || DEFAULT_ENDPOINT).trim()
const SITE_HOSTS = ['petzara.app', 'www.petzara.app']
const SESSION_KEY = 'pz_sess'
const OPT_OUT_KEY = 'pz_interno'
const IDLE_MS = 30 * 60 * 1000

function enabled() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
    if (navigator.webdriver) return false
    if (!SITE_HOSTS.includes(window.location.hostname) && !import.meta.env.VITE_SITE_STATS_URL) return false
    try {
        const flag = new URLSearchParams(window.location.search).get(OPT_OUT_KEY)
        if (flag === '1') window.localStorage.setItem(OPT_OUT_KEY, '1')
        if (flag === '0') window.localStorage.removeItem(OPT_OUT_KEY)
        if (window.localStorage.getItem(OPT_OUT_KEY) === '1') return false
    } catch { /* armazenamento bloqueado: mede normalmente */ }
    return true
}

function randomId() {
    try {
        const a = new Uint8Array(12)
        window.crypto.getRandomValues(a)
        return Array.from(a, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 20)
    } catch {
        return (Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 20)
    }
}

function utmFromUrl() {
    const out = {}
    try {
        const p = new URLSearchParams(window.location.search)
        for (const k of UTM_KEYS) {
            const v = String(p.get(k) ?? '').trim().slice(0, 100)
            if (v) out[k.slice(4)] = v
        }
    } catch { /* URL inválida */ }
    return out
}

function referrerHost() {
    try {
        if (!document.referrer) return null
        const host = new URL(document.referrer).hostname
        return SITE_HOSTS.includes(host) ? null : host
    } catch { return null }
}

function readSession() {
    try { return JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

function writeSession(s) {
    try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)) } catch { /* só nesta página */ }
}

let memorySession = null

/** Sessão atual (cria ou renova). A origem só é lida da URL/referrer quando a sessão começa. */
function session(now = Date.now()) {
    const s = readSession() || memorySession
    const utm = utmFromUrl()
    const ads = Object.keys(clickFromSearch(window.location.search)).length > 0
    const newCampaign = (Object.keys(utm).length > 0 || ads)
        && s && (JSON.stringify(utm) !== JSON.stringify(s.utm || {}) || ads !== !!s.ads)
    if (!s || !s.sid || now - (s.last || 0) > IDLE_MS || newCampaign) {
        const fresh = { sid: randomId(), utm, ads, ref: referrerHost(), last: now }
        memorySession = fresh
        writeSession(fresh)
        return fresh
    }
    s.last = now
    memorySession = s
    writeSession(s)
    return s
}

function send(payload) {
    const body = JSON.stringify(payload)
    try {
        if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return
    } catch { /* cai no fetch */ }
    try {
        fetch(ENDPOINT, {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            keepalive: true,
            credentials: 'omit',
            mode: 'cors',
        }).catch(() => {})
    } catch { /* medição nunca pode quebrar o site */ }
}

let currentLocale = 'pt-BR'
let lastPage = { path: null, at: 0 }

function event(type, extra = {}) {
    if (!enabled()) return
    try {
        const s = session()
        send({
            v: 1,
            sid: s.sid,
            type,
            path: window.location.pathname,
            locale: currentLocale,
            ref: s.ref,
            utm: s.utm,
            ads: !!s.ads,
            touch: navigator.maxTouchPoints > 1,
            ...extra,
        })
    } catch { /* noop */ }
}

/** Uma visualização de página (chamado a cada troca de rota). Ignora a repetição imediata do StrictMode. */
export function sitePageView(locale) {
    if (locale) currentLocale = locale
    if (typeof window === 'undefined') return
    const path = window.location.pathname
    const now = Date.now()
    if (lastPage.path === path && now - lastPage.at < 1500) return
    lastPage = { path, at: now }
    event('pageview')
}

/** Clique em um botão de conversão: click_signup | click_whatsapp | click_play | click_app_store. */
export function siteCta(name, loc) {
    event('cta', { name, loc: String(loc || '').replace(/[^A-Za-z0-9_.:-]/g, '_').slice(0, 60) || undefined })
}

/** Play em um vídeo do site. */
export function siteVideo(name, loc = 'video') {
    event('video', { name, loc })
}
