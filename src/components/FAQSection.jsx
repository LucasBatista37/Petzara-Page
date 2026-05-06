import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useResponsiveInView } from '../animations/variants'

const faqs = [
    {
        question: 'Preciso instalar algum programa no computador?',
        answer: 'Não. O Petzara é 100% online — funciona em qualquer navegador, sem instalação. No Android, você pode adicionar à tela inicial como app diretamente pelo Chrome.',
    },
    {
        question: 'Meus dados ficam seguros?',
        answer: 'Sim. Todos os dados são criptografados em trânsito e em repouso, com backup automático na nuvem. Você nunca vai perder informações por falha de computador ou caderno molhado.',
    },
    {
        question: 'Posso testar antes de pagar?',
        answer: 'Sim. São 30 dias grátis com acesso completo a todas as funcionalidades, sem cartão de crédito e sem compromisso.',
    },
    {
        question: 'Quantos colaboradores posso adicionar?',
        answer: 'Ilimitado nos dois planos. Cada colaborador tem login próprio com permissões configuráveis por módulo — você decide o que cada um pode ver e fazer.',
    },
    {
        question: 'Como funciona o cancelamento?',
        answer: 'Você cancela quando quiser, direto nas configurações da sua conta. Sem multa, sem ligação e sem burocracia.',
    },
    {
        question: 'O sistema funciona bem no celular?',
        answer: 'Sim. O Petzara é responsivo e funciona em qualquer tela. No Android, você pode instalar como app pelo navegador — sem precisar da Play Store.',
    },
    {
        question: 'Tenho suporte se precisar de ajuda?',
        answer: 'Sim. Suporte por e-mail e WhatsApp incluso em todos os planos. Nossa equipe responde em horário comercial.',
    },
    {
        question: 'Posso importar meus clientes e pets já cadastrados?',
        answer: 'Sim. Você pode cadastrar clientes e pets manualmente ou importar via planilha. O processo é guiado passo a passo.',
    },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`rounded-2xl overflow-hidden bg-white transition-all duration-300 ${isOpen ? 'border border-terracotta/30 shadow-sm shadow-terracotta/5' : 'border border-sand/60'}`}
        >
            <button
                onClick={onToggle}
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

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

    return (
        <section id="faq" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-72 h-72 bg-terracotta/4 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage/4 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Dúvidas frequentes
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl font-extrabold mb-4">
                        Perguntas{' '}
                        <span className="gradient-text">e respostas</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Tem dúvida? A resposta provavelmente está aqui.
                    </p>
                </motion.div>

                {isInView && (
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={faq.question}
                                faq={faq}
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() => toggle(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
