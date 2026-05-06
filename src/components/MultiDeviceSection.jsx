import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Monitor, Smartphone, Download, RefreshCw } from 'lucide-react'

const pills = [
    { icon: Smartphone, label: 'Android & iOS' },
    { icon: Monitor, label: 'Qualquer navegador' },
    { icon: Download, label: 'Instala como app (PWA)' },
    { icon: RefreshCw, label: 'Sincronização em tempo real' },
]

export default function MultiDeviceSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay },
    })

    return (
        <section className="py-20 sm:py-28 relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #3D1F0D15 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
                >
                    <span className="inline-block bg-sage/10 text-sage-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        Acesse de onde quiser
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Funciona em{' '}
                        <span className="gradient-text">qualquer dispositivo</span>
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">
                        Celular, tablet e computador. Instala como app no Android sem precisar da Play Store. Sua equipe acessa de onde estiver.
                    </p>
                </motion.div>

                {/* Mockup image */}
                <motion.div
                    {...fadeUp(0.2)}
                    className="flex justify-center"
                >
                    {/* Substitua o src pela sua imagem de mockup */}
                    <img
                        src="/prints/multi-device-mockup.png"
                        alt="Petzara em celular, tablet e computador"
                        className="w-full max-w-4xl object-contain"
                        loading="lazy"
                    />
                </motion.div>

                {/* Pills */}
                <motion.div
                    {...fadeUp(0.4)}
                    className="flex flex-wrap justify-center gap-3 mt-10 sm:mt-12"
                >
                    {pills.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="inline-flex items-center gap-2 bg-white border border-sand/60 px-4 py-2.5 rounded-full text-sm text-espresso font-medium shadow-sm"
                        >
                            <Icon size={14} className="text-terracotta" />
                            {label}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}
