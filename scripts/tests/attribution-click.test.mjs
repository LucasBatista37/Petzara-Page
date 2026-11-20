// Clique do Google Ads no link de cadastro (CONTRATO-ADS).
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

const store = new Map()
globalThis.window = {
    location: { search: '' },
    localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k),
    },
}
const { resolveClick, clickFromSearch, withParams } = await import('../../src/lib/attribution.js')

const GCLID = 'Cj0KCQjw-abcDEF_123456789'
const NOW = Date.parse('2026-10-30T12:00:00Z')
beforeEach(() => { store.clear(); window.location.search = '' })

test('lê só ids de clique válidos', () => {
    assert.deepEqual(clickFromSearch(`?gclid=${GCLID}&utm_source=google`), { gclid: GCLID })
    assert.deepEqual(clickFromSearch('?gclid=%3Cx%3E&wbraid=curto'), {})
})

test('clique da URL vai para o link com a hora; depois vem do armazenamento; expira em 90 dias', () => {
    window.location.search = `?gclid=${GCLID}`
    assert.deepEqual(resolveClick(NOW), { gclid: GCLID, gclid_at: String(NOW) })
    window.location.search = ''
    assert.deepEqual(resolveClick(NOW + 1000), { gclid: GCLID, gclid_at: String(NOW) })
    assert.deepEqual(resolveClick(NOW + 91 * 24 * 3600 * 1000), {})
    const url = withParams('https://app.petzara.app/register', { utm_source: 'google', ...resolveClick(NOW + 1000) })
    assert.match(url, /gclid=Cj0KCQjw-abcDEF_123456789/)
    assert.match(url, new RegExp(`gclid_at=${NOW}`))
})

test('quem recusou os cookies não tem o clique guardado nem repassado', () => {
    store.set('pz_cookie_consent', 'declined')
    window.location.search = `?gclid=${GCLID}`
    assert.deepEqual(resolveClick(NOW), {})
    assert.equal(store.has('pz_click'), false)
})

test('visita de anúncio: clique do Google Ads na URL ou utm_medium pago (nesta visita ou guardado)', async () => {
    const { isPaidVisit } = await import('../../src/lib/attribution.js')
    assert.equal(isPaidVisit(), false)
    window.location.search = '?utm_source=instagram&utm_medium=social'
    assert.equal(isPaidVisit(), false)
    store.clear()
    window.location.search = `?gclid=${GCLID}`
    assert.equal(isPaidVisit(), true)
    window.location.search = '?utm_source=google&utm_medium=cpc&utm_campaign=mae'
    assert.equal(isPaidVisit(), true)
    // volta depois, sem parâmetros: vale a origem guardada na 1ª visita
    window.location.search = ''
    assert.equal(isPaidVisit(), true)
})
