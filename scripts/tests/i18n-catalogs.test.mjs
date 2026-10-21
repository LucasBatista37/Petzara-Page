/**
 * Catálogos e configuração de idiomas (não precisa de build).
 * node --test scripts/tests/i18n-catalogs.test.mjs
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
    LOCALES, DEFAULT_LOCALE, X_DEFAULT_LOCALE, PAGES,
    localeFromPath, pageFromPath, alternatesFor, isIndexable, switchPath, matchBrowserLocale, staticRoutes,
} from '../../src/i18n/config.js'
import { registerCatalog, createTranslator } from '../../src/i18n/catalogs.js'
import { PRICING_BY_LOCALE, annualDerived, moneyParts, formatMoney } from '../../src/config/pricingByLocale.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const load = (locale) => JSON.parse(readFileSync(path.join(root, 'src/i18n/locales', `${locale}.json`), 'utf8'))
const catalogs = Object.fromEntries(LOCALES.map((l) => [l, load(l)]))
for (const [l, c] of Object.entries(catalogs)) registerCatalog(l, c)

/** Lista [caminho, valor] de todas as folhas (arrays entram com índice). */
function leaves(node, prefix = '') {
    if (Array.isArray(node)) return node.flatMap((v, i) => leaves(v, `${prefix}[${i}]`))
    if (node && typeof node === 'object') return Object.entries(node).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k))
    return [[prefix, node]]
}
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()

test('es e en têm todas as chaves do pt-BR (inclusive o mesmo nº de itens nas listas)', () => {
    const base = new Map(leaves(catalogs[DEFAULT_LOCALE]))
    for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
        const other = new Map(leaves(catalogs[locale]))
        const missing = [...base.keys()].filter((k) => !other.has(k))
        assert.deepEqual(missing, [], `${locale}: chaves ausentes`)
    }
})

test('placeholders iguais nos 3 idiomas', () => {
    const base = leaves(catalogs[DEFAULT_LOCALE])
    for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
        const other = new Map(leaves(catalogs[locale]))
        for (const [key, value] of base) {
            if (typeof value !== 'string') continue
            assert.deepEqual(placeholders(other.get(key)), placeholders(value), `${locale}: placeholders de ${key}`)
        }
    }
})

test('nenhum texto vazio em es/en onde o pt-BR tem texto', () => {
    const base = leaves(catalogs[DEFAULT_LOCALE])
    for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
        const other = new Map(leaves(catalogs[locale]))
        for (const [key, value] of base) {
            if (value === '') continue
            assert.notEqual(other.get(key), '', `${locale}: ${key} vazio`)
        }
    }
})

test('es/en sem português vazando e com o glossário (§10)', () => {
    const ptWords = /\b(você|não|agendamento|agendamentos|cadastro|banho e tosa|petshops?|grátis|horário)\b/i
    for (const locale of ['es', 'en']) {
        for (const [key, value] of leaves(catalogs[locale])) {
            if (typeof value !== 'string') continue
            assert.doesNotMatch(value, ptWords, `${locale}: português em ${key}: "${value}"`)
        }
    }
    const es = JSON.stringify(catalogs.es)
    const en = JSON.stringify(catalogs.en)
    for (const term of ['cita', 'mascota', 'Prueba gratis', 'Enlace de reservas', 'Finanzas', 'Por cobrar', 'solo lectura', 'peluquería canina', 'estética canina']) {
        assert.ok(es.toLowerCase().includes(term.toLowerCase()), `es: falta o termo do glossário "${term}"`)
    }
    for (const term of ['appointment', 'pet owner', 'Free trial', 'Booking link', 'Finances', 'Receivables', 'read-only', 'grooming', 'groomer']) {
        assert.ok(en.toLowerCase().includes(term.toLowerCase()), `en: falta o termo do glossário "${term}"`)
    }
    // Termos que o glossário NÃO usa.
    assert.doesNotMatch(es, /\bturno|reservación|usted\b/i, 'es: usar "cita" e "tú"')
    assert.doesNotMatch(en, /\bcustomer portal|tutor\b/i, 'en: "client / pet owner", não "tutor"')
})

test('es/en não prometem coisas só do Brasil (Pix, Stripe, 1ª cobrança no fim do teste)', () => {
    for (const locale of ['es', 'en']) {
        const text = JSON.stringify(catalogs[locale])
        assert.doesNotMatch(text, /\bPix\b|fundador|founder|Stripe|R\$/i, `${locale}: oferta/termo só do Brasil`)
        assert.doesNotMatch(text, /fin de la prueba: los días|end of the trial: the remaining/i, `${locale}: cobrança adiada (ofertas da Play só no Brasil)`)
    }
})

test('fallback: chave ausente em es cai no pt-BR, nunca mostra a chave', () => {
    const { t } = createTranslator('es')
    assert.equal(t('hero.webCta'), catalogs.es.hero.webCta)
    registerCatalog('es', { ...catalogs.es, hero: { ...catalogs.es.hero, webCta: undefined } })
    assert.equal(createTranslator('es').t('hero.webCta'), catalogs['pt-BR'].hero.webCta)
    assert.equal(createTranslator('es').t('nao.existe'), '')
    registerCatalog('es', catalogs.es)
})

test('rotas: pt-BR na raiz (URLs antigas iguais), es em /es/, en em /en/', () => {
    assert.equal(PAGES.home.paths['pt-BR'], '/')
    assert.equal(PAGES.download.paths['pt-BR'], '/download')
    assert.equal(PAGES.terms.paths['pt-BR'], '/termos-de-uso')
    assert.equal(PAGES.privacy.paths['pt-BR'], '/politica-de-privacidade')
    assert.equal(PAGES.blog.paths['pt-BR'], '/blog')
    assert.equal(localeFromPath('/'), 'pt-BR')
    assert.equal(localeFromPath('/download'), 'pt-BR')
    assert.equal(localeFromPath('/es'), 'es')
    assert.equal(localeFromPath('/es/descargar'), 'es')
    assert.equal(localeFromPath('/en/terms-of-use'), 'en')
    assert.equal(localeFromPath('/estetica'), 'pt-BR', 'prefixo só com barra')
    assert.deepEqual(pageFromPath('/es/'), { page: 'home', locale: 'es' })
    assert.deepEqual(pageFromPath('/en/privacy-policy'), { page: 'privacy', locale: 'en' })
    assert.deepEqual(pageFromPath('/blog/x'), { page: 'blogPost', locale: 'pt-BR' })
    for (const r of staticRoutes()) {
        if (r.locale !== 'pt-BR') assert.ok(r.path.startsWith(`/${r.locale}/`), r.path)
    }
})

test('hreflang: home e download com pt-BR, es, en e x-default = en; legais e blog sem hreflang', () => {
    assert.equal(X_DEFAULT_LOCALE, 'en')
    for (const page of ['home', 'download']) {
        const alts = alternatesFor(page)
        assert.deepEqual(alts.map((a) => a.hreflang), ['pt-BR', 'es', 'en', 'x-default'])
        assert.equal(alts.at(-1).href, alts.find((a) => a.hreflang === 'en').href)
    }
    assert.deepEqual(alternatesFor('terms'), [])
    assert.deepEqual(alternatesFor('privacy'), [])
    assert.deepEqual(alternatesFor('blog'), [])
    assert.equal(isIndexable('terms', 'es'), false)
    assert.equal(isIndexable('terms', 'pt-BR'), true)
})

test('seletor de idioma leva à página equivalente (blog → home do idioma)', () => {
    assert.equal(switchPath('download', 'es'), '/es/descargar')
    assert.equal(switchPath('privacy', 'en'), '/en/privacy-policy')
    assert.equal(switchPath('blog', 'es'), '/es/')
    assert.equal(switchPath('blogPost', 'en'), '/en/')
    assert.equal(switchPath('home', 'pt-BR'), '/')
})

test('idioma do navegador (só para a sugestão): pt*→pt-BR, es*→es, en*→en, outro→en', () => {
    assert.equal(matchBrowserLocale('pt-PT'), 'pt-BR')
    assert.equal(matchBrowserLocale('es-MX'), 'es')
    assert.equal(matchBrowserLocale('en-GB'), 'en')
    assert.equal(matchBrowserLocale('fr-FR'), 'en')
    assert.equal(matchBrowserLocale(''), null)
})

test('preços por idioma: pt-BR igual ao atual; es/en sem valor (Google Play)', () => {
    assert.deepEqual(
        { currency: PRICING_BY_LOCALE['pt-BR'].currency, m: PRICING_BY_LOCALE['pt-BR'].monthly, a: PRICING_BY_LOCALE['pt-BR'].annual },
        { currency: 'BRL', m: 49.9, a: 499 },
    )
    const d = annualDerived(PRICING_BY_LOCALE['pt-BR'])
    assert.deepEqual(d, { perMonth: 41.58, savings: 99.8, monthsFree: 2 })
    assert.deepEqual(moneyParts(49.9, 'BRL', 'pt-BR'), { symbol: 'R$', number: '49,90' })
    assert.deepEqual(moneyParts(499, 'BRL', 'pt-BR'), { symbol: 'R$', number: '499,00' })
    assert.equal(formatMoney(41.58, 'BRL', 'pt-BR').replace(/\s/g, ' '), 'R$ 41,58')
    assert.equal(formatMoney(99.8, 'BRL', 'pt-BR').replace(/\s/g, ' '), 'R$ 99,80')
    for (const l of ['es', 'en']) {
        assert.equal(PRICING_BY_LOCALE[l].monthly, null)
        assert.equal(PRICING_BY_LOCALE[l].annual, null)
        assert.equal(annualDerived(PRICING_BY_LOCALE[l]), null)
    }
    // Quando o fundador definir, o cálculo funciona em outra moeda.
    assert.deepEqual(annualDerived({ monthly: 10, annual: 100 }), { perMonth: 8.33, savings: 20, monthsFree: 2 })
    assert.deepEqual(moneyParts(9.9, 'USD', 'en-US'), { symbol: '$', number: '9.90' })
})
