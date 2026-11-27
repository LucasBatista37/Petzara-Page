// Conversões de clique do Google Ads (WhatsApp, Criar conta, Play/App Store).
import { test } from 'node:test'
import assert from 'node:assert/strict'

const { ADS_ACCOUNT, ADS_CLICK_CONVERSIONS, reportAdsClick } = await import('../../src/lib/adsConversions.js')

function fakeGtag() {
    const calls = []
    const gtag = (...args) => calls.push(args)
    return { gtag, calls }
}

test('cada botão medido tem uma conversão da conta certa', () => {
    for (const name of ['click_whatsapp', 'click_signup', 'click_play', 'click_app_store']) {
        assert.match(ADS_CLICK_CONVERSIONS[name], /^AW-18445564611\/[A-Za-z0-9_-]{20}$/)
    }
    assert.equal(ADS_CLICK_CONVERSIONS.click_play, ADS_CLICK_CONVERSIONS.click_app_store)
})

test('envia a conversão com valor fixo e beacon, sem dado do clique', () => {
    const { gtag, calls } = fakeGtag()
    assert.equal(reportAdsClick('click_whatsapp', { adsId: ADS_ACCOUNT, gtag }), true)
    assert.deepEqual(calls, [[
        'event',
        'conversion',
        { send_to: ADS_CLICK_CONVERSIONS.click_whatsapp, value: 1.0, currency: 'BRL', transport_type: 'beacon' },
    ]])
})

test('nada sai sem a tag, com outra conta ou com evento que não é clique medido', () => {
    const { gtag, calls } = fakeGtag()
    assert.equal(reportAdsClick('click_signup', { adsId: ADS_ACCOUNT }), false)
    assert.equal(reportAdsClick('click_signup', { adsId: 'AW-999', gtag }), false)
    assert.equal(reportAdsClick('view_pricing', { adsId: ADS_ACCOUNT, gtag }), false)
    assert.equal(reportAdsClick('toString', { adsId: ADS_ACCOUNT, gtag }), false)
    assert.equal(calls.length, 0)
})

test('erro na tag nunca quebra o site', () => {
    const gtag = () => { throw new Error('bloqueado') }
    assert.equal(reportAdsClick('click_play', { adsId: ADS_ACCOUNT, gtag }), false)
})
