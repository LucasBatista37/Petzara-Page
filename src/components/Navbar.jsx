import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { appRegisterUrl } from '../siteConfig'

const navLinks = [
    { label: 'Problema', href: '#problema' },
    { label: 'Solução', href: '#solucao' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Como Funciona', href: '#como-funciona' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass border-b border-sand/50 shadow-sm py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <svg width="36" height="36" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                            <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" fill="#E07A5F" />
                            <circle cx="160" cy="220" r="45" fill="#81B29A" />
                            <circle cx="256" cy="170" r="50" fill="#E07A5F" />
                            <circle cx="352" cy="220" r="45" fill="#81B29A" />
                        </svg>
                        <span className="font-accent font-bold text-xl text-espresso">
                            Pet<span className="text-terracotta">zara</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-taupe hover:text-espresso font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-terracotta after:transition-all hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={appRegisterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-terracotta/20 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Começar Grátis
                        </a>
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

            {/* Mobile Menu Overlay */}
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
                            <div className="p-6 pt-20 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-espresso hover:text-terracotta font-medium text-lg py-3 px-4 rounded-xl hover:bg-terracotta/5 transition-all"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="mt-4 pt-4 border-t border-sand">
                                    <a
                                        href={appRegisterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center bg-terracotta hover:bg-terracotta-dark text-white font-bold text-base px-6 py-3.5 rounded-xl transition-all"
                                    >
                                        Começar Grátis →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
