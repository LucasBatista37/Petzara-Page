import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useResponsiveInView } from '../animations/variants'
import { useLinks } from '../lib/links'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'

// Perguntas e respostas em i18n/locales (faq.items). O JSON-LD FAQPage é gerado no <head>
// por i18n/seo.js com os mesmos textos (um por idioma).

function FAQItem({ faq, index, isOpen, onToggle, revealed }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`rounded-2xl overflow-hidden bg-white transition-all duration-300 ${isOpen ? 'border border-terracotta/30 shadow-sm shadow-terracotta/5' : 'border border-sand/60'}`}
        >
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-cream transition-colors duration-200"
            >
                <span className="font-accent font-bold text-espresso text-base leading-snug">
                    {faq.question}
                </span>
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-terracotta text-white' : 'bg-sand/50 text-taupe'}`}>
                    <ChevronDown
                        size={16}
                        strokeWidth={2.5}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <p className="px-6 pb-5 text-taupe text-sm leading-relaxed">
                            {faq.answer}
                            {faq.link && (
                                <>
                                    {' '}
                                    <a
                                        href={faq.link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-track="faq"
                                        className="font-bold text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                                    >
                                        {faq.link.label}
                                    </a>
                                </>
                            )}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQSection() {
    const { ref, isInView } = useResponsiveInView()
    const [openIndex, setOpenIndex] = useState(null)
    const { t, tm } = useI18n()
    const links = useLinks()
    const faqs = (tm('faq.items') || []).map((f) => (
        f.link === 'whatsapp' ? { ...f, link: { href: links.whatsappSupport, label: t('faq.whatsappLink') } } : { ...f, link: null }
    ))

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

    return (
        <section id="faq" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        {t('faq.badge')}
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl font-extrabold mb-4">
                        <Highlighted parts={tm('faq.title')} />
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        {t('faq.subtitle')}
                    </p>
                </motion.div>

                {/* Sempre no HTML (pré-render): o Google exige que o conteúdo do FAQPage esteja visível na página. */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.question}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => toggle(index)}
                            revealed={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
