/**
 * Medição do site (L1) — GA4 + Meta Pixel, sem dependências.
 *
 * Regras (LGPD):
 * - Nada é carregado sem consentimento explícito ("Aceitar" na faixa de cookies).
 * - Cada ferramenta só carrega se a variável de ambiente existir no build:
 *     VITE_GA4_ID         (ex.: G-XXXXXXXXXX)
 *     VITE_META_PIXEL_ID  (ex.: 123456789012345)
 * - Sem nenhuma das duas, a faixa nem aparece (o site não usa cookies de medição).
 *
 * Eventos:
 * - GA4: click_signup, click_whatsapp, click_play, view_pricing
 * - Pixel: Lead (cadastro e Play), Contact (WhatsApp) + PageView
 * Os cliques são capturados por um único listener no documento, pelo destino do link,
 * então qualquer link novo para cadastro/WhatsApp/Play já é medido.
 *
 * Idioma do site: todo evento (page_view automático, cliques, view_pricing) leva o parâmetro
 * `site_language` = pt-BR | es | en (idioma da página, nada pessoal). Não usamos o nome
 * `language`: no GA4 ele é um campo reservado que substituiria a dimensão "Idioma" (idioma do
 * navegador), que continua útil. Para relatórios: GA4 → Admin → Definições personalizadas →
 * dimensão de evento "site_language".
 */

// IDs públicos (aparecem no HTML de qualquer site que os usa). A variável da Vercel, se existir, tem prioridade.
// GA4: propriedade "Petzara — site", fluxo petzara.app (criado em 16/10/2026).
const GA4_DEFAULT = 'G-QZ53SEKZ7L'
const PIXEL_DEFAULT = ''
const GA4_ID = (import.meta.env.VITE_GA4_ID || GA4_DEFAULT).trim()
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID || PIXEL_DEFAULT).trim()

export const CONSENT_KEY = 'pz_cookie_consent'
export const CONSENT_EVENT = 'pz:consent-change'

export const analyticsConfigured = Boolean(GA4_ID || PIXEL_ID)

let loaded = false
let siteLanguage = 'pt-BR'

/** Idioma da página atual (definido pelo main.jsx e pelo App a cada troca de rota). */
export function setSiteLanguage(locale) {
    if (locale) siteLanguage = locale
}

function safeGet(key) {
    try { return window.localStorage.getItem(key) } catch { return null }
}
function safeSet(key, value) {
    try {
        if (value === null) window.localStorage.removeItem(key)
        else window.localStorage.setItem(key, value)
    } catch { /* navegação privada / armazenamento bloqueado */ }
}

/** 'accepted' | 'declined' | null (ainda não respondeu) */
export function getConsent() {
    const v = safeGet(CONSENT_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
}

export function setConsent(value) {
    safeSet(CONSENT_KEY, value)
    if (value === 'accepted') loadAnalytics()
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/** Volta a perguntar (link "Preferências de cookies" no rodapé). */
export function resetConsent() {
    safeSet(CONSENT_KEY, null)
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
}

function injectScript(src) {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
}

function loadGA4() {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    // page_view inicial automático; mudanças de rota do SPA são medidas pela
    // "medição otimizada" do GA4 (eventos de histórico do navegador), ligada por padrão.
    window.gtag('config', GA4_ID, { site_language: siteLanguage })
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`)
}

function loadPixel() {
    if (window.fbq) return
    const fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments)
        else fbq.queue.push(arguments)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    if (!window._fbq) window._fbq = fbq
    injectScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', PIXEL_ID)
    window.fbq('track', 'PageView')
}

export function loadAnalytics() {
    if (loaded || !analyticsConfigured || typeof window === 'undefined') return
    if (getConsent() !== 'accepted') return
    loaded = true
    if (GA4_ID) loadGA4()
    if (PIXEL_ID) loadPixel()
}

const PIXEL_EVENT = {
    click_signup: 'Lead',
    click_play: 'Lead',
    click_whatsapp: 'Contact',
}

/** Envia um evento (só se a medição estiver carregada, ou seja, com consentimento). */
export function track(name, params = {}) {
    if (!loaded) return
    try {
        const withLanguage = { site_language: siteLanguage, ...params }
        if (GA4_ID && window.gtag) window.gtag('event', name, withLanguage)
        const px = PIXEL_EVENT[name]
        if (PIXEL_ID && window.fbq && px) window.fbq('track', px, { content_name: name, ...withLanguage })
    } catch { /* medição nunca pode quebrar o site */ }
}

/** PageView do Pixel em navegação interna (blog, download…). */
export function trackPageView() {
    if (!loaded) return
    try { if (PIXEL_ID && window.fbq) window.fbq('track', 'PageView', { site_language: siteLanguage }) } catch { /* noop */ }
}

/** Classifica um link pelo destino. */
export function classifyHref(href = '') {
    if (href.includes('app.petzara.app/register')) return 'click_signup'
    if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'click_whatsapp'
    if (href.includes('play.google.com/store')) return 'click_play'
    return null
}

let clickListenerInstalled = false

/** Um listener só, no documento: mede cliques em cadastro, WhatsApp e Play. */
export function installClickTracking() {
    if (clickListenerInstalled || typeof document === 'undefined') return
    clickListenerInstalled = true
    const handler = (e) => {
        const a = e.target?.closest?.('a[href]')
        if (!a) return
        const name = classifyHref(a.href)
        if (!name) return
        const where = a.dataset.track || a.closest('section[id]')?.id || (a.closest('footer') ? 'rodape' : 'outro')
        track(name, { link_location: where, link_text: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 60) })
    }
    document.addEventListener('click', handler, { capture: true })
    document.addEventListener('auxclick', handler, { capture: true })
}

/** Medição inicial: carrega se já houver consentimento e liga o listener de cliques. */
export function initAnalytics() {
    installClickTracking()
    loadAnalytics()
}
