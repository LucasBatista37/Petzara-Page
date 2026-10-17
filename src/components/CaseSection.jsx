import { motion } from 'framer-motion'
import { MapPin, Quote } from 'lucide-react'
import { CASE_STUDY } from '../siteConfig'
import { ease, useResponsiveInView } from '../animations/variants'

/** Rótulos só para a prévia de layout (npm run dev + ?previewCase=1) — nunca vão para produção. */
const PREVIEW = {
    petshopName: '[Nome do pet shop]',
    city: '[Cidade – UF]',
    photo: '',
    photoAlt: '',
    quote: '[Frase real de quem usa, com autorização]',
    author: '[Nome]',
    role: '[Função]',
    numbers: [
        { value: '[nº]', label: '[o que foi medido no Petzara]' },
        { value: '[nº]', label: '[o que foi medido no Petzara]' },
        { value: '[nº]', label: '[o que foi medido no Petzara]' },
    ],
}

export function isCaseComplete(c) {
    return Boolean(c && c.petshopName?.trim() && c.quote?.trim() && c.author?.trim())
}

/**
 * Prova social com a loja-piloto (L9). Desligada por SHOW_CASE em siteConfig.js e sem
 * conteúdo: o Lucas preenche com dados reais. Se faltar nome, frase ou autor, não renderiza.
 */
export default function CaseSection({ preview = false }) {
    const { ref, isInView } = useResponsiveInView()
    const c = preview ? PREVIEW : CASE_STUDY
    if (!isCaseComplete(c)) return null

    const numbers = (c.numbers || []).filter((n) => n.value?.trim() && n.label?.trim())
    const initials = c.petshopName.replace(/[^\p{L}\s]/gu, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase()

    return (
        <section id="caso" className="py-20 sm:py-28 relative overflow-hidden">
            <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <span className="inline-block bg-sage/10 text-sage-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Quem já usa
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl font-extrabold">
                        A rotina do <span className="gradient-text">{c.petshopName}</span> com o Petzara
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="bg-white rounded-3xl border border-sand/60 shadow-xl shadow-espresso/5 overflow-hidden grid md:grid-cols-[2fr_3fr]"
                >
                    <div className="relative bg-cream-warm min-h-[220px] md:min-h-full flex items-center justify-center">
                        {c.photo ? (
                            <img src={c.photo} alt={c.photoAlt || c.petshopName} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        ) : (
                            <span className="w-24 h-24 rounded-3xl bg-terracotta/15 text-terracotta font-accent font-extrabold text-3xl flex items-center justify-center" aria-hidden="true">
                                {initials}
                            </span>
                        )}
                    </div>

                    <div className="p-7 sm:p-10">
                        <Quote size={32} className="text-terracotta/40 mb-3" aria-hidden="true" />
                        <blockquote className="font-accent text-xl sm:text-2xl font-semibold text-espresso leading-snug mb-6">
                            “{c.quote}”
                        </blockquote>
                        <p className="font-bold text-espresso">{c.author}{c.role ? <span className="font-medium text-taupe"> · {c.role}</span> : null}</p>
                        <p className="text-taupe text-sm flex items-center gap-1.5 mt-1">
                            <MapPin size={14} aria-hidden="true" />
                            {c.petshopName}{c.city ? ` — ${c.city}` : ''}
                        </p>

                        {numbers.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-sand/60 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {numbers.map((n, i) => (
                                    <div key={i}>
                                        <div className="font-accent font-extrabold text-3xl text-terracotta leading-none mb-1">{n.value}</div>
                                        <div className="text-taupe text-sm leading-snug">{n.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
