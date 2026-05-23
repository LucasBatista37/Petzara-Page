import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Bell, Shield, RefreshCw, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DESKTOP_DOWNLOADS, appLoginUrl } from '../siteConfig'

const RELEASES_URL = 'https://github.com/LucasBatista37/petzara-desktop/releases/latest'

const DARK_GRADIENT = 'linear-gradient(135deg, #1a1210 0%, #2C2421 50%, #1a1210 100%)'

const PLATFORMS = [
    {
        id: 'windows',
        name: 'Windows',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#0078D4" aria-hidden="true">
                <path d="M3 5.557L10.5 4.5V11.5H3V5.557ZM11.5 4.356L21 3V11.5H11.5V4.356ZM3 12.5H10.5V19.5L3 18.443V12.5ZM11.5 12.5H21V21L11.5 19.644V12.5Z" />
            </svg>
        ),
        requirement: 'Windows 10 ou superior (64-bit)',
        downloads: [
            { label: 'Baixar para Windows', url: DESKTOP_DOWNLOADS.windows.url, primary: true },
        ],
        note: 'Instalador · ~74 MB · Gratuito',
        warning: 'Se o SmartScreen exibir "O Windows protegeu seu PC", clique em "Mais informações" → "Executar assim mesmo".',
    },
    {
        id: 'mac',
        name: 'macOS',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
        ),
        requirement: 'macOS 11 (Big Sur) ou superior',
        downloads: [
            { label: 'Baixar para macOS', url: DESKTOP_DOWNLOADS.mac.url, primary: true },
        ],
        note: 'Arquivo DMG · ~74 MB · Gratuito',
        warning: 'Como o app não é assinado pela Apple, na primeira abertura abra o Terminal e execute: xattr -cr /Applications/Petzara.app',
    },
    {
        id: 'linux',
        name: 'Linux',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700" fill="currentColor" aria-hidden="true">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00.11.27c.05.06.12.09.19.09a.53.53 0 00.47-.3c.165-.375.352-.75.56-1.12.45.766 1.012 1.49 1.695 2.19-.2.396-.38.8-.536 1.213-.217.581-.296 1.2-.296 1.818C7 22.52 9.53 24 12 24c2.468 0 5-1.48 5-5.77 0-.618-.079-1.237-.296-1.817-.155-.413-.336-.817-.535-1.212.683-.7 1.244-1.424 1.695-2.19.208.37.395.745.56 1.12a.53.53 0 00.47.3c.07 0 .14-.03.19-.09a.424.424 0 00.11-.27c.123-.806-.009-1.657-.287-2.49-.59-1.77-1.831-3.47-2.716-4.52-.75-1.067-.974-1.928-1.05-3.02-.064-1.49 1.057-5.965-3.17-6.298a6.04 6.04 0 00-.481-.02z" />
            </svg>
        ),
        requirement: 'Qualquer distribuição moderna (x64)',
        downloads: [
            { label: 'Baixar para Linux (AppImage)', url: DESKTOP_DOWNLOADS.linux.url, primary: true },
        ],
        note: 'AppImage · ~74 MB · sem instalação',
        warning: 'Após baixar, marque o arquivo como executável: chmod +x *.AppImage',
    },
]

const FEATURES = [
    { icon: Zap,       text: 'Acesso rápido pelo atalho na área de trabalho, sem abrir o navegador' },
    { icon: Bell,      text: 'Notificações desktop de novos agendamentos e atualizações' },
    { icon: Shield,    text: 'Seguro — sem dados armazenados localmente, tudo na nuvem' },
    { icon: RefreshCw, text: 'Atualizações automáticas incluídas, sem precisar reinstalar' },
]

const STEPS = [
    { n: '1', title: 'Baixe o instalador', desc: 'Escolha o arquivo para o seu sistema operacional e aguarde o download.' },
    { n: '2', title: 'Execute o instalador', desc: 'Abra o arquivo baixado e siga as instruções na tela. Leva menos de 1 minuto.' },
    { n: '3', title: 'Pronto!', desc: 'O Petzara abrirá automaticamente. Faça login com sua conta e comece a usar.' },
]

const REQUIREMENTS = [
    ['Windows',              'Windows 10 ou superior (64-bit)'],
    ['macOS',                'macOS 11 Big Sur ou superior (Intel ou Apple Silicon)'],
    ['Linux',                'Qualquer distribuição x64 com suporte a AppImage'],
    ['Conexão com internet', 'Necessária — o sistema roda na nuvem'],
    ['Conta Petzara',        'Necessária — crie gratuitamente em petzara.app'],
]

function getDetectedPlatform() {
    if (typeof navigator === 'undefined') return null
    const ua       = navigator.userAgent || ''
    const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase()
    const isIPadOS = platform === 'macintel' && navigator.maxTouchPoints > 1
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua) || isIPadOS
    if (isMobile)                                                  return 'mobile'
    if (/win/i.test(platform)  || /windows/i.test(ua))            return 'windows'
    if (/mac/i.test(platform)  || /mac os x/i.test(ua))           return 'mac'
    if (/linux|x11/i.test(platform) || /linux/i.test(ua))         return 'linux'
    return null
}

const PLATFORM_LABELS = {
    windows: 'Windows',
    mac:     'macOS',
    linux:   'Linux',
    mobile:  'dispositivo móvel',
}

export default function DownloadPage() {
    const [detectedPlatform, setDetectedPlatform] = useState(null)

    useEffect(() => {
        setDetectedPlatform(getDetectedPlatform())
        document.title = 'Petzara Desktop | Baixar aplicativo para Windows, macOS e Linux'
        return () => { document.title = 'Petzara — Gestão completa para pet shops' }
    }, [])

    const detectedLabel = PLATFORM_LABELS[detectedPlatform]

    return (
        <div className="min-h-screen bg-cream overflow-x-hidden flex flex-col">
            <Navbar />

            {/* ── Hero ── */}
            <section
                className="pt-32 pb-20 px-4"
                style={{ background: DARK_GRADIENT }}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-cream/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/10">
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: 'var(--color-terracotta)' }}
                        />
                        Disponível para Windows, macOS e Linux
                    </div>
                    <h1 className="font-accent text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                        Petzara para Desktop
                    </h1>
                    <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(250,250,249,0.65)' }}>
                        Toda a potência do Petzara em um aplicativo instalável. Acesso mais rápido, notificações nativas e experiência profissional em qualquer sistema.
                    </p>
                    {detectedLabel && (
                        <p className="mt-5 text-sm" style={{ color: 'rgba(250,250,249,0.6)' }}>
                            {detectedPlatform === 'mobile'
                                ? 'Você parece estar em um dispositivo móvel. Para instalar o app desktop, abra esta página no computador.'
                                : `Detectamos ${detectedLabel}. O download recomendado está destacado abaixo.`}
                        </p>
                    )}
                </div>
            </section>

            {/* ── Platform cards (overlap hero) ── */}
            <section className="px-4 -mt-8 mb-16">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PLATFORMS.map((p) => {
                        const isDetected = detectedPlatform === p.id
                        return (
                            <div
                                key={p.id}
                                className={`relative bg-white rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                                    isDetected
                                        ? 'border-2 shadow-xl'
                                        : 'border border-sand/60 shadow-lg'
                                }`}
                                style={isDetected ? {
                                    borderColor: 'var(--color-terracotta)',
                                    boxShadow: '0 20px 40px -10px rgba(224,122,95,0.15)',
                                    outline: '4px solid rgba(224,122,95,0.08)',
                                    outlineOffset: '0',
                                } : {}}
                            >
                                {isDetected && (
                                    <div
                                        className="absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                                        style={{ backgroundColor: 'var(--color-terracotta)' }}
                                    >
                                        Recomendado
                                    </div>
                                )}

                                <div className={`flex items-center gap-3 mb-4 ${isDetected ? 'pr-28' : ''}`}>
                                    {p.icon}
                                    <div>
                                        <h2 className="font-bold text-espresso">{p.name}</h2>
                                        <p className="text-xs text-taupe/50">{p.requirement}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mb-3 mt-auto">
                                    {p.downloads.map((d) => (
                                        <a
                                            key={d.url}
                                            href={d.url}
                                            className={`flex items-center justify-center gap-2 text-center text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors ${
                                                isDetected && d.primary
                                                    ? 'text-white shadow-lg'
                                                    : d.primary
                                                    ? 'text-white'
                                                    : 'bg-cream hover:bg-sand/40 text-espresso/70'
                                            }`}
                                            style={(d.primary) ? {
                                                backgroundColor: isDetected
                                                    ? 'var(--color-terracotta-dark)'
                                                    : 'var(--color-terracotta)',
                                            } : {}}
                                            onMouseEnter={e => {
                                                if (d.primary) e.currentTarget.style.backgroundColor = 'var(--color-terracotta-dark)'
                                            }}
                                            onMouseLeave={e => {
                                                if (d.primary) e.currentTarget.style.backgroundColor = isDetected
                                                    ? 'var(--color-terracotta-dark)'
                                                    : 'var(--color-terracotta)'
                                            }}
                                        >
                                            <Download size={14} />
                                            {d.label}
                                        </a>
                                    ))}
                                </div>

                                <p className="text-xs text-taupe/40 text-center">{p.note}</p>

                                {p.warning && (
                                    <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 leading-relaxed">
                                        ⚠️ {p.warning}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="text-center mt-5">
                    <a
                        href={RELEASES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-taupe/40 hover:text-terracotta transition-colors"
                    >
                        Ver todas as versões e changelogs no GitHub →
                    </a>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="px-4 pb-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-accent text-xl font-bold text-espresso text-center mb-8">
                        Por que usar o aplicativo desktop?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-start gap-3 bg-cream-warm rounded-xl p-4">
                                <span
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: 'rgba(224,122,95,0.1)' }}
                                >
                                    <Icon size={16} style={{ color: 'var(--color-terracotta)' }} />
                                </span>
                                <p className="text-sm text-taupe/75 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Steps ── */}
            <section className="bg-cream-warm px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-accent text-xl font-bold text-espresso text-center mb-10">
                        Como instalar
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-8">
                        {STEPS.map((s) => (
                            <div key={s.n} className="flex-1 text-center">
                                <div
                                    className="w-10 h-10 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-3"
                                    style={{ backgroundColor: 'var(--color-terracotta)' }}
                                >
                                    {s.n}
                                </div>
                                <h3 className="font-semibold text-espresso/80 mb-1">{s.title}</h3>
                                <p className="text-sm text-taupe/60">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Requirements ── */}
            <section className="px-4 py-14">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-accent text-xl font-bold text-espresso text-center mb-6">
                        Requisitos
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-sand/60">
                        <table className="w-full text-sm">
                            <tbody>
                                {REQUIREMENTS.map(([req, val], i) => (
                                    <tr
                                        key={req}
                                        className={i % 2 === 1 ? 'bg-cream-warm' : 'bg-white'}
                                        style={{ borderBottom: i < REQUIREMENTS.length - 1 ? '1px solid rgba(230,222,216,0.6)' : 'none' }}
                                    >
                                        <td className="px-5 py-3 font-medium text-espresso/75 w-2/5">{req}</td>
                                        <td className="px-5 py-3 text-taupe/60">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── CTA Bottom ── */}
            <section
                className="px-4 py-14 text-center"
                style={{ background: DARK_GRADIENT }}
            >
                <h2 className="font-accent text-2xl font-extrabold text-white mb-2">
                    Pronto para começar?
                </h2>
                <p className="text-sm mb-6" style={{ color: 'rgba(250,250,249,0.55)' }}>
                    Escolha o instalador para o seu sistema e acesse o Petzara direto do seu desktop.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href={DESKTOP_DOWNLOADS.windows.url}
                        className="bg-white font-bold px-6 py-3 rounded-xl hover:bg-cream transition-colors text-sm"
                        style={{ color: 'var(--color-espresso)' }}
                    >
                        Baixar para Windows
                    </a>
                    <a
                        href={RELEASES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'rgba(250,250,249,0.55)' }}
                    >
                        Outras plataformas →
                    </a>
                    <a
                        href={appLoginUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'rgba(250,250,249,0.55)' }}
                    >
                        Acessar versão web →
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}
