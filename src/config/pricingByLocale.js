/**
 * Preços exibidos na landing, por idioma. Só dados — o componente formata com Intl na moeda e
 * no idioma da página.
 *
 * - pt-BR: preços atuais da assinatura pelo site (Stripe, BRL). Pix e preço de fundador são só
 *   do Brasil e não aparecem nos outros idiomas.
 * - es / en: `monthly`/`annual` = null → os cards mostram "Prueba gratis · Precio en tu moneda en
 *   Google Play" / "Free trial · Price in your currency on Google Play". Assinatura internacional
 *   pelo Stripe está desligada (contrato §8) e os preços por país são configurados no Play Console.
 *
 * Quando o fundador definir preços internacionais (análise financeira), basta preencher, ex.:
 *   es: { currency: 'USD', monthly: 9.9, annual: 99 }
 * e os cards passam a mostrar o valor, o "equivale a …/mês" e a economia do anual, calculados aqui.
 * `schemaCurrency` é só para o JSON-LD (Offer de teste grátis, price "0").
 */
export const PRICING_BY_LOCALE = {
    'pt-BR': { currency: 'BRL', monthly: 49.9, annual: 499, schemaCurrency: 'BRL' },
    es: { currency: null, monthly: null, annual: null, schemaCurrency: 'USD' },
    en: { currency: null, monthly: null, annual: null, schemaCurrency: 'USD' },
}

export function pricingFor(locale) {
    return PRICING_BY_LOCALE[locale] || PRICING_BY_LOCALE['pt-BR']
}

/** Valor formatado em partes (símbolo e número separados, como no layout dos cards). */
export function moneyParts(amount, currency, intlLocale) {
    const parts = new Intl.NumberFormat(intlLocale, { style: 'currency', currency }).formatToParts(amount)
    const symbol = parts.filter((p) => p.type === 'currency').map((p) => p.value).join('')
    const number = parts
        .filter((p) => ['integer', 'group', 'decimal', 'fraction', 'minusSign'].includes(p.type))
        .map((p) => p.value)
        .join('')
    return { symbol, number }
}

export function formatMoney(amount, currency, intlLocale) {
    return new Intl.NumberFormat(intlLocale, { style: 'currency', currency }).format(amount)
}

/** Derivados do plano anual (null quando falta preço). */
export function annualDerived(pricing) {
    const { monthly, annual } = pricing
    if (monthly == null || annual == null) return null
    const perMonth = Math.floor((annual / 12) * 100) / 100
    const savings = Math.round((monthly * 12 - annual) * 100) / 100
    const monthsFree = savings > 0 ? Math.round(savings / monthly) : 0
    return { perMonth, savings, monthsFree }
}
