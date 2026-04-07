import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { appRegisterUrl } from '../siteConfig'

export default function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Aparece após o scroll passar +/- da hero section
            setIsVisible(window.scrollY > 600)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 p-4 z-40 md:hidden bg-cream/90 backdrop-blur-md border-t border-sand shadow-[0_-10px_20px_rgba(0,0,0,0.05)] flex items-center justify-center pointer-events-none"
                >
                    <a
                        href={appRegisterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-terracotta/30 active:scale-95 transition-all pointer-events-auto"
                    >
                        Começar Grátis
                        <ArrowRight size={18} />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
