import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Gift } from 'lucide-react'
import { ease, useResponsiveInView, getCardViewport } from '../animations/variants'
import { useEffect } from 'react'
import { track } from '../lib/analytics'
import { useLinks } from '../lib/links'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'
import { pricingFor, moneyParts, formatMoney, annualDerived } from '../config/pricingByLocale'

/** Preço grande do card: "R$ 49,90 /mês" — ou, sem preço definido para o idioma, "Prueba gratis". */
function PriceTag({ amount, per, className = 'mb-8' }) {
    const { t, locale, meta } = useI18n()
    const { currency } = pricingFor(locale)
    if (amount == null || !currency) {
        return (
            <div className={className}>
                <span className="font-accent text-4xl sm:text-5xl font-extrabold text-white block leading-tight">{t('pricing.noPriceTrial')}</span>
                <span className="text-white/65 text-sm">{t('pricing.noPrice')}</span>
            </div>
        )
    }
    const { symbol, number } = moneyParts(amount, currency, meta.intl)
    return (
        <div className={`${className} flex items-baseline gap-1`}>
            <span className="text-white/65 font-bold">{symbol}</span>
            <span className="font-accent text-5xl font-extrabold text-white">{number}</span>
            <span className="text-white/65">{per}</span>
        </div>
    )
}

export default function PricingSection() {
    const { ref, isInView } = useResponsiveInView()
    const { t, tm, locale, meta } = useI18n()
    const links = useLinks()
    const pricing = pricingFor(locale)
    const derived = pricing.currency ? annualDerived(pricing) : null
    const sharedFeatures = tm('pricing.features') || []
    const footnote2 = t('pricing.footnote2')

    // GA4: a seção de preços apareceu na tela (uma vez por visita à página)
    useEffect(() => {
        if (isInView) track('view_pricing')
    }, [isInView])

    return (
        <section id="precos" className="py-20 sm:py-28 relative overflow-hidden">
            {/* Dark premium background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0c] via-[#2c1a14] to-[#1a1208]" />
            <div className="absolute -top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                 style={{ background: 'var(--color-terracotta)', opacity: 0.08 }} />
            <div className="absolute bottom-0 right-[10%] w-[500px] h-[200px] rounded-full blur-[120px] pointer-events-none"
                 style={{ background: 'var(--color-sage)', opacity: 0.06 }} />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="inline-block bg-white/10 border border-white/15 text-white/70 px-4 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                        {t('pricing.badge')}
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
                        <Highlighted parts={tm('pricing.title')} />
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed mb-5">
                        {t('pricing.subtitle')}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-terracotta/20 border border-terracotta/35 text-terracotta px-4 py-2 rounded-full text-sm font-bold">
                        <Gift size={14} aria-hidden="true" className="shrink-0" />
                        {t('pricing.bonus')}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Plano Mensal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.6, ease }}
                        className="relative rounded-2xl p-8 backdrop-blur-sm border border-white/12 bg-white/8 shadow-md shadow-black/20 transition-all hover:-translate-y-1"
                    >
                        <div className="mb-6">
                            <h3 className="font-accent font-bold text-2xl text-white mb-1">{t('pricing.monthly.name')}</h3>
                            <p className="text-white/65 text-sm">{t('pricing.monthly.description')}</p>
                        </div>

                        <PriceTag amount={pricing.monthly} per={t('pricing.monthly.per')} />

                        <ul className="space-y-3 mb-8">
                            {sharedFeatures.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                                    <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-white/15 text-white/70">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={links.registerMonthly}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all bg-white/15 hover:bg-white/25 text-white border border-white/20"
                        >
                            {t('pricing.cta')}
                            <ArrowRight size={16} />
                        </a>

                        <p className="mt-4 text-center text-white/40 text-xs">
                            {t('pricing.fineprint')}
                        </p>
                    </motion.div>

                    {/* Plano Anual — destacado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getCardViewport()}
                        transition={{ duration: 0.6, delay: 0.08, ease }}
                        className="relative rounded-2xl p-8 backdrop-blur-sm border-2 border-terracotta/70 bg-white/12 shadow-xl shadow-terracotta/20 transition-all hover:-translate-y-1"
                    >
                        <div className="mb-6">
                            <h3 className="font-accent font-bold text-2xl text-white mb-1">{t('pricing.annual.name')}</h3>
                            <p className="text-white/65 text-sm">
                                {derived
                                    ? t('pricing.annual.description', { amount: formatMoney(derived.perMonth, pricing.currency, meta.intl) })
                                    : t('pricing.annual.descriptionNoPrice')}
                            </p>
                        </div>

                        <PriceTag amount={pricing.annual} per={t('pricing.annual.per')} className={derived?.savings > 0 ? 'mb-2' : 'mb-8'} />

                        {derived?.savings > 0 && (
                            <div className="mb-8 inline-flex items-center gap-1 bg-sage/20 text-sage text-xs font-bold px-3 py-1 rounded-full">
                                <Sparkles size={11} />
                                {t('pricing.annual.savings', { amount: formatMoney(derived.savings, pricing.currency, meta.intl), months: derived.monthsFree })}
                            </div>
                        )}

                        <ul className="space-y-3 mb-8">
                            {sharedFeatures.map((f) => (
                                <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                                    <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-terracotta/25 text-terracotta">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span className="leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={links.registerAnnual}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all bg-terracotta hover:bg-terracotta-dark text-white shadow-lg shadow-terracotta/30 hover:-translate-y-0.5"
                        >
                            {t('pricing.cta')}
                            <ArrowRight size={16} />
                        </a>

                        <p className="mt-4 text-center text-white/40 text-xs">
                            {t('pricing.fineprint')}
                        </p>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={getCardViewport()}
                    transition={{ duration: 0.6, ease }}
                    className="text-center text-white/40 text-sm mt-10"
                >
                    {t('pricing.footnote')}
                    {footnote2 ? (
                        <>
                            <br className="hidden sm:block" />
                            {' '}{footnote2}
                        </>
                    ) : null}
                </motion.p>
            </div>
        </section>
    )
}
