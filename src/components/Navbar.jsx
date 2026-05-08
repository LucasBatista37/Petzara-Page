import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { appRegisterUrl } from '../siteConfig'

const navLinks = [
    { label: 'Problema', href: '#problema' },
    { label: 'Solução', href: '#solucao' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Demo', href: '#demo' },
    { label: 'Preços', href: '#precos' },
    { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            <nav className="relative z-50 py-4 bg-cream sm:bg-cream/90 sm:backdrop-blur-sm sm:shadow-sm sm:shadow-sand/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <svg width="36" height="36" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform" style={{ transition: 'transform 0.2s' }}>
                            <rect width="512" height="512" rx="160" fill="#F4F1DE" />
                            <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" style={{ fill: 'var(--color-terracotta)', transition: 'fill 0.5s ease' }} />
                            <circle cx="160" cy="220" r="45" style={{ fill: 'var(--color-sage)', transition: 'fill 0.5s ease' }} />
                            <circle cx="256" cy="170" r="50" style={{ fill: 'var(--color-terracotta)', transition: 'fill 0.5s ease' }} />
                            <circle cx="352" cy="220" r="45" style={{ fill: 'var(--color-sage)', transition: 'fill 0.5s ease' }} />
                        </svg>
                        <span className="font-accent font-bold text-xl text-espresso">
                            Pet<span className="text-terracotta">zara</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-taupe hover:text-espresso font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-terracotta after:transition-all hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}
                        <motion.a
                            href={appRegisterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97, y: 0 }}
                            className="bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
                        >
                            Começar Grátis
                        </motion.a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-espresso hover:text-terracotta transition-colors"
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm md:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[280px] bg-cream shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu principal"
                        >
                            <motion.div
                                variants={{ animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                                initial="initial"
                                animate="animate"
                                className="p-6 pt-20 flex flex-col gap-2"
                            >
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        variants={{
                                            initial: { opacity: 0, x: 20 },
                                            animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                                        }}
                                        className="text-espresso hover:text-terracotta font-medium text-lg py-3 px-4 rounded-xl hover:bg-terracotta/5 transition-all"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0, y: 8 },
                                        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                                    }}
                                    className="mt-4 pt-4 border-t border-sand"
                                >
                                    <a
                                        href={appRegisterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-6 py-3.5 rounded-xl transition-all"
                                    >
                                        Começar Grátis →
                                    </a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
