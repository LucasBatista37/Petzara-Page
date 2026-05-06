import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Monitor, Smartphone } from 'lucide-react'
import { useResponsiveInView } from '../animations/variants'

const PALETTES = [
  {
    id: 'terracotta',
    name: 'Terracotta & Sage',
    tagline: 'Para pet shops acolhedores',
    primary: '#E07A5F',
    secondary: '#81B29A',
    primaryDark: '#C4634A',
    secondaryDark: '#6A9980',
    desktopImage: '/prints/themes/terracotta-desktop.png',
    mobileImage: '/prints/themes/terracotta-mobile.png',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    tagline: 'Para clínicas veterinárias',
    primary: '#2C5F2D',
    secondary: '#97BC62',
    primaryDark: '#1e4520',
    secondaryDark: '#7aa34e',
    desktopImage: '/prints/themes/forest-desktop.png',
    mobileImage: '/prints/themes/forest-mobile.png',
  },
  {
    id: 'ocean',
    name: 'Muted Ocean',
    tagline: 'Para banho & tosa premium',
    primary: '#003049',
    secondary: '#669BBC',
    primaryDark: '#001e2f',
    secondaryDark: '#4a86a8',
    desktopImage: '/prints/themes/ocean-desktop.png',
    mobileImage: '/prints/themes/ocean-mobile.png',
  },
  {
    id: 'ochre',
    name: 'Earthy Ochre',
    tagline: 'Para petshops boutique',
    primary: '#BC6C25',
    secondary: '#DDA15E',
    primaryDark: '#9a5519',
    secondaryDark: '#c8894a',
    desktopImage: '/prints/themes/ochre-desktop.png',
    mobileImage: '/prints/themes/ochre-mobile.png',
  },
]

function applyPaletteGlobally(palette) {
  const root = document.documentElement
  root.style.setProperty('--color-terracotta', palette.primary)
  root.style.setProperty('--color-terracotta-dark', palette.primaryDark)
  root.style.setProperty('--color-sage', palette.secondary)
  root.style.setProperty('--color-sage-dark', palette.secondaryDark)
}

function DesktopFrame({ palette, reduced }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-3 rounded-3xl blur-xl opacity-40"
        animate={{ background: `linear-gradient(135deg, ${palette.primary}33, ${palette.secondary}33)` }}
        transition={{ duration: reduced ? 0 : 0.6 }}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
        {/* Browser bar */}
        <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50">
          <div className="flex gap-1.5">
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{ backgroundColor: palette.primary + '99' }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{ backgroundColor: palette.secondary + '99' }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            />
            <div className="w-3 h-3 rounded-full bg-sand" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs">
              app.petzara.app/dashboard
            </div>
          </div>
        </div>
        {/* Todas as imagens empilhadas — cross-fade via opacity */}
        <div className="grid">
          {PALETTES.map(p => (
            <motion.img
              key={p.id}
              src={p.desktopImage}
              alt={`Petzara - tema ${p.name}`}
              className="w-full object-cover"
              style={{ gridArea: '1 / 1' }}
              animate={{ opacity: p.id === palette.id ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              loading="eager"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileFrame({ palette, reduced }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <motion.div
          className="absolute -inset-4 rounded-[3.5rem] blur-xl opacity-40"
          animate={{ background: `linear-gradient(135deg, ${palette.primary}33, ${palette.secondary}33)` }}
          transition={{ duration: reduced ? 0 : 0.6 }}
        />
        <div
          className="relative rounded-[2.8rem] p-[10px] shadow-2xl shadow-espresso/30 w-[220px] sm:w-[260px]"
          style={{ backgroundColor: '#2C2421' }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] rounded-full z-10"
            style={{ backgroundColor: '#2C2421' }}
          />
          {/* Todas as imagens empilhadas — cross-fade via opacity */}
          <div className="grid rounded-[2.3rem] overflow-hidden">
            {PALETTES.map(p => (
              <motion.img
                key={p.id}
                src={p.mobileImage}
                alt={`Petzara mobile - tema ${p.name}`}
                className="w-full object-cover"
                style={{ gridArea: '1 / 1' }}
                animate={{ opacity: p.id === palette.id ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.4 }}
                loading="eager"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ColorPaletteSection() {
  const reduced = useReducedMotion()
  const { ref, isInView } = useResponsiveInView()

  const isMobileUA =
    typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

  const [activeIdx, setActiveIdx] = useState(0)
  const [device, setDevice] = useState('desktop')

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches || isMobileUA) {
      setDevice('mobile')
    }
  }, [])

  const palette = PALETTES[activeIdx]

  const handlePaletteClick = useCallback((idx) => {
    setActiveIdx(idx)
    applyPaletteGlobally(PALETTES[idx])
  }, [])

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{ backgroundColor: palette.primary }}
          transition={{ duration: reduced ? 0 : 0.8 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full blur-3xl opacity-15"
          animate={{ backgroundColor: palette.secondary }}
          transition={{ duration: reduced ? 0 : 0.8 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            animate={{
              backgroundColor: palette.primary + '18',
              color: palette.primary,
            }}
            transition={{ duration: reduced ? 0 : 0.5 }}
          >
            Personalize como quiser
          </motion.span>
          <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-espresso">
            Sua identidade visual,{' '}
            <motion.span
              animate={{ color: palette.primary }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            >
              do seu jeito
            </motion.span>
          </h2>
          <p className="text-taupe text-lg leading-relaxed">
            Escolha a paleta que combina com o seu negócio. Seu sistema — e esta página — mudam instantaneamente.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Device toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white border border-sand rounded-2xl p-1 gap-1 shadow-sm">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  device === 'desktop'
                    ? 'bg-espresso text-white shadow-sm'
                    : 'text-taupe hover:text-espresso'
                }`}
                aria-pressed={device === 'desktop'}
              >
                <Monitor size={15} aria-hidden="true" />
                Desktop
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  device === 'mobile'
                    ? 'bg-espresso text-white shadow-sm'
                    : 'text-taupe hover:text-espresso'
                }`}
                aria-pressed={device === 'mobile'}
              >
                <Smartphone size={15} aria-hidden="true" />
                Mobile
              </button>
            </div>
          </div>

          {/* Two-column: mockup + palette picker */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12">

            {/* Mockup */}
            <div className="flex-1 w-full min-w-0">
              <AnimatePresence mode="wait">
                {device === 'desktop' ? (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <DesktopFrame palette={palette} reduced={reduced} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <MobileFrame palette={palette} reduced={reduced} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Palette picker */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">

              {/* Selected style label */}
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold text-taupe uppercase tracking-widest mb-2">
                  Estilo selecionado
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={palette.id}
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  >
                    <motion.p
                      className="font-accent text-lg font-bold"
                      animate={{ color: palette.primary }}
                      transition={{ duration: reduced ? 0 : 0.4 }}
                    >
                      {palette.name}
                    </motion.p>
                    <p className="text-sm text-taupe mt-0.5">{palette.tagline}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-3">
                  {PALETTES.map((pl, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full cursor-pointer"
                      style={{ backgroundColor: pl.primary }}
                      animate={{ width: i === activeIdx ? 24 : 8, opacity: i === activeIdx ? 1 : 0.3 }}
                      transition={{ duration: reduced ? 0 : 0.35 }}
                      onClick={() => handlePaletteClick(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Palette cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-64">
                {PALETTES.map((pl, i) => (
                  <motion.button
                    key={pl.id}
                    onClick={() => handlePaletteClick(i)}
                    whileHover={{ scale: reduced ? 1 : 1.03 }}
                    whileTap={{ scale: reduced ? 1 : 0.96 }}
                    className="relative flex flex-col items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer focus:outline-none text-center transition-colors duration-300"
                    style={{
                      borderColor: i === activeIdx ? pl.primary : '#E6DED8',
                      backgroundColor: i === activeIdx ? pl.primary + '10' : 'white',
                    }}
                    aria-label={`Selecionar paleta ${pl.name}`}
                    aria-pressed={i === activeIdx}
                  >
                    <div className="flex gap-1.5">
                      <div
                        className="w-7 h-7 rounded-full shadow-sm border-2 border-white"
                        style={{ backgroundColor: pl.primary }}
                      />
                      <div
                        className="w-7 h-7 rounded-full shadow-sm border-2 border-white"
                        style={{ backgroundColor: pl.secondary }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-espresso/80 leading-tight">
                      {pl.name}
                    </span>

                    {i === activeIdx && (
                      <motion.div
                        layoutId="palette-ring"
                        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                        style={{ borderColor: pl.primary }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Color swatches preview */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    animate={{ backgroundColor: palette.primary }}
                    transition={{ duration: reduced ? 0 : 0.5 }}
                  />
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm -ml-2"
                    animate={{ backgroundColor: palette.secondary }}
                    transition={{ duration: reduced ? 0 : 0.5 }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={palette.id + '-hex'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-taupe font-mono"
                    transition={{ duration: 0.2 }}
                  >
                    {palette.primary} · {palette.secondary}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
