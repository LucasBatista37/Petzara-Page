/**
 * Conversões de clique do Google Ads (conta 756-817-4864), criadas em 27/11/2026.
 *
 * Por que existem: quase todo mundo que chega por anúncio cria a conta pelo app (Play Store / App Store)
 * ou chama no WhatsApp — e nesses casos a conversão "sign_up" do sistema nunca dispara. Sem nenhum sinal,
 * o Google Ads não consegue otimizar. Estes cliques no site são o sinal mais próximo do cadastro que dá
 * para medir aqui.
 *
 * Regras: só são enviadas pela tag do Google, que só carrega depois do "Aceitar" na faixa de cookies
 * (analytics.js → track). Nada pessoal vai junto: só o destino da conversão e o valor fixo.
 * Uma por tipo de botão (o Google conta uma por clique no anúncio).
 */

export const ADS_ACCOUNT = 'AW-18445564611'

export const ADS_CLICK_CONVERSIONS = {
    click_whatsapp: `${ADS_ACCOUNT}/B94GCN2d3MAdEMP1w9tE`, // Clique no WhatsApp (site) · Contato
    click_signup: `${ADS_ACCOUNT}/0e0vCOCd3MAdEMP1w9tE`, // Clique em Criar conta (site) · Inscrição
    click_play: `${ADS_ACCOUNT}/IPTICOOd3MAdEMP1w9tE`, // Clique na Play Store ou App Store (site) · Clique de saída
    click_app_store: `${ADS_ACCOUNT}/IPTICOOd3MAdEMP1w9tE`,
}

/**
 * Avisa o Google Ads do clique. Devolve true se avisou.
 * Só vale para a conta acima (outro AW- no build não tem estes rótulos) e com a tag carregada.
 */
export function reportAdsClick(name, { adsId, gtag } = {}) {
    if (adsId !== ADS_ACCOUNT || typeof gtag !== 'function') return false
    const sendTo = Object.prototype.hasOwnProperty.call(ADS_CLICK_CONVERSIONS, name) ? ADS_CLICK_CONVERSIONS[name] : null
    if (!sendTo) return false
    try {
        // beacon: o clique costuma sair da página (WhatsApp, loja, cadastro) logo em seguida.
        gtag('event', 'conversion', { send_to: sendTo, value: 1.0, currency: 'BRL', transport_type: 'beacon' })
        return true
    } catch {
        return false
    }
}
