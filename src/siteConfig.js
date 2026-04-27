/** Origens e contactos centralizados — landing em petzara.app, sistema em app.petzara.app */
export const MARKETING_ORIGIN = 'https://petzara.app'
export const APP_ORIGIN = 'https://app.petzara.app'
/** Hosts sem protocolo — para mocks da barra de endereço */
export const MARKETING_HOST = 'petzara.app'
export const APP_HOST = 'app.petzara.app'
export const SUPPORT_EMAIL = 'suporte@petzara.app'

export const appRegisterUrl = `${APP_ORIGIN}/register`
export const appLoginUrl = `${APP_ORIGIN}/login`

/** Stripe Payment Links — substituir pelas URLs reais quando criadas no dashboard Stripe */
export const stripeMonthlyUrl = `${appRegisterUrl}?plan=monthly`
export const stripeAnnualUrl = `${appRegisterUrl}?plan=annual`

export const marketingUrl = (path = '') =>
    `${MARKETING_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

export const appUrl = (path = '') =>
    `${APP_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
