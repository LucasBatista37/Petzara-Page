import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useResponsiveInView } from '../animations/variants'
import { whatsappSupportUrl } from '../siteConfig'

const faqs = [
    {
        question: 'Posso testar antes de pagar?',
        answer: 'Sim. São 30 dias grátis, sem cartão de crédito, com acesso a tudo. Como não pedimos cartão, nada é cobrado automaticamente: no fim do teste você decide se quer assinar.',
    },
    {
        question: 'Se eu assinar durante o teste, pago na hora?',
        answer: 'Não. Pelo site e pelo app, a 1ª cobrança é só no fim do teste: os dias grátis que faltam continuam valendo. No app Android, a data da 1ª cobrança aparece antes de você confirmar a compra, e dá para cancelar sem custo na Play Store antes dela. Só se faltar menos de 2 dias para o teste acabar a cobrança pode ser feita no dia — e a tela de pagamento avisa antes.',
    },
    {
        question: 'Como ganho +14 dias grátis?',
        answer: 'Crie agendamentos em 3 dias diferentes durante o teste. Conta o dia em que você cria o agendamento no Petzara, não a data marcada para o atendimento: se hoje você cadastra os horários da semana inteira, isso vale como 1 dia. Quando chegar ao 3º dia, os 14 dias extras entram automaticamente no seu teste. Vale uma vez por conta.',
    },
    {
        question: 'O que acontece quando o teste acaba?',
        answer: 'Se você não assinar, a conta fica somente leitura: seus clientes, pets, agendamentos e o financeiro continuam guardados e você consegue consultar tudo, mas não cria nem edita nada até assinar. Assinou, volta tudo na hora.',
    },
    {
        question: 'Manda lembrete no WhatsApp?',
        answer: 'Ainda não. Hoje o Petzara não envia lembretes automáticos por WhatsApp para os seus clientes. O que ele faz: na Agenda pública, o cliente vê os horários livres e é levado para o WhatsApp do seu pet shop para combinar o horário com você; e o Petzara avisa você e a sua equipe pelo app, como quando entra um agendamento novo.',
    },
    {
        question: 'Consigo trazer meus clientes do caderno ou planilha?',
        answer: 'Sim. No sistema pelo navegador (app.petzara.app), em Clientes › Importar, você envia uma planilha CSV com nome e telefone (tem um modelo para baixar; no Excel é só "Salvar como → CSV"). Telefones repetidos são ignorados. Se seus clientes estão no caderno, passe para uma planilha simples ou mande para a gente no WhatsApp que ajudamos.',
    },
    {
        question: 'Vocês me ajudam a configurar?',
        answer: 'Sim, de graça, pelo WhatsApp: ajudamos a cadastrar serviços e preços, horários de funcionamento, importar seus clientes e ativar o seu link de agendamento. Depois, o suporte continua pelo WhatsApp e pelo e-mail suporte@petzara.app, em horário comercial.',
        link: { href: whatsappSupportUrl, label: 'Chamar no WhatsApp' },
    },
    {
        question: 'Preciso instalar algum programa no computador?',
        answer: 'Não. O Petzara funciona no navegador do computador, do tablet ou do celular — é só entrar em app.petzara.app. No Android, também tem o app Petzara na Google Play.',
    },
    {
        question: 'O sistema funciona bem no celular?',
        answer: 'Sim. No Android, baixe o app Petzara na Google Play. No iPhone, use pelo navegador (Safari ou Chrome) em app.petzara.app — dá para adicionar à tela de início. A conta é a mesma em todos os aparelhos.',
    },
    {
        question: 'Meus dados ficam seguros?',
        answer: 'Sim. Os dados ficam na nuvem, com conexão criptografada (HTTPS) e senhas guardadas com hash — não dependem do seu computador nem de um caderno. Só quem você convida acessa a conta, cada um com as permissões que você definir.',
    },
    {
        question: 'Quantos colaboradores posso adicionar?',
        answer: 'Ilimitado nos dois planos. Cada colaborador tem login próprio com permissões configuráveis por módulo — você decide o que cada um pode ver e fazer.',
    },
    {
        question: 'Como funciona o cancelamento?',
        answer: 'Sem multa e sem ligação. Assinou pelo site: cancele quando quiser nas configurações da conta. Assinou pelo app Android: o cancelamento é feito na Google Play, em Pagamentos e assinaturas.',
    },
    {
        question: 'O sistema é difícil de aprender?',
        answer: 'Não. Foi pensado para quem nunca usou um sistema de gestão: você cadastra seus serviços, cria o primeiro agendamento e já está usando. Se travar em algo, a gente ajuda pelo WhatsApp.',
    },
    {
        question: 'Tenho um petshop pequeno com 1 ou 2 funcionários. Vale a pena?',
        answer: 'Vale: o Petzara foi feito para pet shops pequenos de banho e tosa. Com a agenda no celular da equipe, o dono para de ser o intermediário de tudo. E você testa 30 dias grátis antes de decidir.',
    },
]

// Dados estruturados (FAQPage) para o Google
const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
})

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

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

    return (
        <section id="faq" className="py-20 sm:py-28 relative overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

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
