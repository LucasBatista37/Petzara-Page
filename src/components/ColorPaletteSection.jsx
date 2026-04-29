import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Monitor, Smartphone } from 'lucide-react'

// ─── Palette definitions ─────────────────────────────────────────────────────

const PALETTES = [
  {
    id: 'terracotta',
    name: 'Terracotta & Sage',
    tagline: 'Para pet shops acolhedores',
    primary: '#E07A5F',
    secondary: '#81B29A',
    primaryDark: '#C4634A',
    secondaryDark: '#6A9980',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    tagline: 'Para clínicas veterinárias',
    primary: '#2C5F2D',
    secondary: '#97BC62',
    primaryDark: '#1e4520',
    secondaryDark: '#7aa34e',
  },
  {
    id: 'ocean',
    name: 'Muted Ocean',
    tagline: 'Para banho & tosa premium',
    primary: '#003049',
    secondary: '#669BBC',
    primaryDark: '#001e2f',
    secondaryDark: '#4a86a8',
  },
  {
    id: 'ochre',
    name: 'Earthy Ochre',
    tagline: 'Para petshops boutique',
    primary: '#BC6C25',
    secondary: '#DDA15E',
    primaryDark: '#9a5519',
    secondaryDark: '#c8894a',
  },
]

// ─── Apply palette site-wide via CSS variables ────────────────────────────────

function applyPaletteGlobally(palette) {
  const root = document.documentElement
  root.style.setProperty('--color-terracotta', palette.primary)
  root.style.setProperty('--color-terracotta-dark', palette.primaryDark)
  root.style.setProperty('--color-sage', palette.secondary)
  root.style.setProperty('--color-sage-dark', palette.secondaryDark)
}

// ─── Desktop Mockup (browser frame style da DemoSection) ─────────────────────

function DesktopMockup({ palette }) {
  const p = palette.primary
  const s = palette.secondary

  const menuItems = ['Dashboard', 'Agendamentos', 'Clientes', 'Pets', 'Financeiro']

  return (
    <div className="relative">
      <div
        className="absolute -inset-3 rounded-3xl blur-xl opacity-40"
        style={{
          background: `linear-gradient(135deg, ${p}33, ${s}33)`,
        }}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-espresso/10 border border-sand/50 overflow-hidden">
        {/* Browser bar — mesmo estilo da DemoSection */}
        <div className="bg-cream-warm px-4 py-3 flex items-center gap-2 border-b border-sand/50">
          <div className="flex gap-1.5">
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{ backgroundColor: p + '99' }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{ backgroundColor: s + '99' }}
              transition={{ duration: 0.5 }}
            />
            <div className="w-3 h-3 rounded-full bg-sand" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-lg px-3 py-1 text-xs text-taupe/60 border border-sand/50 max-w-xs">
              app.petzara.app/dashboard
            </div>
          </div>
        </div>

        {/* App shell */}
        <div className="flex h-72 sm:h-80">
          {/* Sidebar */}
          <motion.div
            className="w-36 sm:w-40 flex-shrink-0 flex flex-col py-4 px-2.5 gap-0.5"
            animate={{ backgroundColor: p }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-5 h-5 rounded-full bg-white/30 flex-shrink-0" />
              <div className="h-2.5 w-14 rounded bg-white/60" />
            </div>
            {menuItems.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.22)' : 'transparent' }}
              >
                <div className="w-2.5 h-2.5 rounded-sm bg-white/60 flex-shrink-0" />
                <span className="text-white/90 text-[11px] font-medium truncate">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAF9]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-sand/40 bg-white">
              <div>
                <p className="text-[10px] text-taupe">Bom dia,</p>
                <p className="text-xs font-semibold text-espresso">Pet Shop Amigo Fiel</p>
              </div>
              <motion.div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                animate={{ backgroundColor: s }}
                transition={{ duration: 0.5 }}
              >
                A
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5 px-4 py-3">
              {[
                { label: 'Agendamentos hoje', value: '12' },
                { label: 'Faturamento', value: 'R$ 840' },
                { label: 'Clientes ativos', value: '87' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-2.5 border border-sand/50 bg-white"
                >
                  <p className="text-[9px] text-taupe leading-tight">{stat.label}</p>
                  <motion.p
                    className="text-sm font-bold mt-0.5"
                    animate={{ color: p }}
                    transition={{ duration: 0.4 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              ))}
            </div>

            {/* Appointments */}
            <div className="px-4 flex-1 overflow-hidden">
              <p className="text-[10px] font-semibold text-espresso mb-1.5">Próximos agendamentos</p>
              {[
                { pet: 'Bidu', service: 'Banho & Tosa', time: '09:30', owner: 'Carlos M.' },
                { pet: 'Luna', service: 'Consulta', time: '10:15', owner: 'Ana S.' },
                { pet: 'Thor', service: 'Banho', time: '11:00', owner: 'Roberto P.' },
              ].map((appt, i) => (
                <div
                  key={appt.pet}
                  className="flex items-center gap-2.5 py-1.5 border-b border-sand/30 last:border-0"
                >
                  <motion.div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold"
                    animate={{ backgroundColor: i % 2 === 0 ? p : s }}
                    transition={{ duration: 0.5 }}
                  >
                    {appt.pet[0]}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-espresso truncate">
                      {appt.pet} · {appt.service}
                    </p>
                    <p className="text-[9px] text-taupe">{appt.owner}</p>
                  </div>
                  <motion.span
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    animate={{ color: p, backgroundColor: p + '20' }}
                    transition={{ duration: 0.4 }}
                  >
                    {appt.time}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Mockup (phone frame style da DemoSection) ────────────────────────

function MobileMockup({ palette }) {
  const p = palette.primary
  const s = palette.secondary

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-[3.5rem] blur-xl opacity-40"
          style={{ background: `linear-gradient(135deg, ${p}33, ${s}33)` }}
        />
        {/* Phone frame — mesmo estilo da DemoSection */}
        <motion.div
          className="relative rounded-[2.8rem] p-[10px] shadow-2xl shadow-espresso/30 w-[220px] sm:w-[260px]"
          style={{ backgroundColor: '#2C2421' }}
        >
          {/* Dynamic island */}
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] rounded-full z-10" style={{ backgroundColor: '#2C2421' }} />

          {/* Screen content */}
          <div className="bg-[#FAFAF9] rounded-[2.3rem] overflow-hidden">
            {/* Status bar */}
            <motion.div
              className="flex justify-between items-center px-5 pt-8 pb-2"
              animate={{ backgroundColor: p }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white/80 text-[9px] font-semibold">9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-3 h-1.5 border border-white/60 rounded-sm">
                  <div className="w-2/3 h-full bg-white/80 rounded-sm" />
                </div>
              </div>
            </motion.div>

            {/* App header */}
            <motion.div
              className="px-4 py-3 flex items-center justify-between"
              animate={{ backgroundColor: p }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="text-white/70 text-[9px]">Olá, Ana</p>
                <p className="text-white text-xs font-bold">Amigo Fiel</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">AF</span>
              </div>
            </motion.div>

            {/* Content */}
            <div className="px-3 py-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Hoje', value: '12' },
                  { label: 'Receita', value: 'R$840' },
                ].map((st) => (
                  <div key={st.label} className="bg-white rounded-xl p-2.5 shadow-sm border border-sand/30">
                    <p className="text-[9px] text-taupe">{st.label}</p>
                    <motion.p
                      className="text-sm font-bold"
                      animate={{ color: p }}
                      transition={{ duration: 0.4 }}
                    >
                      {st.value}
                    </motion.p>
                  </div>
                ))}
              </div>

              <p className="text-[9px] font-semibold text-espresso pt-0.5">Agendamentos</p>
              {[
                { pet: 'Bidu', service: 'Banho & Tosa', time: '09:30' },
                { pet: 'Luna', service: 'Consulta Vet.', time: '10:15' },
              ].map((appt, i) => (
                <div key={appt.pet} className="bg-white rounded-xl p-2.5 shadow-sm border border-sand/30 flex items-center gap-2">
                  <motion.div
                    className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold"
                    animate={{ backgroundColor: i === 0 ? p : s }}
                    transition={{ duration: 0.5 }}
                  >
                    {appt.pet[0]}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-semibold text-espresso truncate">{appt.pet}</p>
                    <p className="text-[8px] text-taupe">{appt.service}</p>
                  </div>
                  <motion.span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    animate={{ color: p, backgroundColor: p + '20' }}
                    transition={{ duration: 0.4 }}
                  >
                    {appt.time}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div className="flex justify-around items-center px-3 py-2.5 border-t border-sand/40 bg-white mt-1">
              {['🏠', '📅', '🐾', '💰'].map((icon, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-sm">{icon}</span>
                  {i === 0 && (
                    <motion.div
                      className="w-1 h-1 rounded-full"
                      animate={{ backgroundColor: p }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ColorPaletteSection() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
          {/* Device toggle — mesmo estilo da DemoSection */}
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
                    <DesktopMockup palette={palette} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile"
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <MobileMockup palette={palette} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Palette picker */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">

              {/* Tagline */}
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
                    {/* Color swatches */}
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

                    {/* Active ring */}
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
