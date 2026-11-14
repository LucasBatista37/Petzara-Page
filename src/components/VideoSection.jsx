import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, CalendarPlus, CalendarDays, Link2, Wallet, Smartphone, Play, Clapperboard } from 'lucide-react'
import { ease, useResponsiveInView } from '../animations/variants'
import { useLinks } from '../lib/links'
import { useI18n, Highlighted } from '../i18n/I18nProvider.jsx'
import { track } from '../lib/analytics'
import { siteVideo } from '../lib/siteStats'

/**
 * Vídeos reais do Petzara (pasta visual-assets e marketing/video-promocional), comprimidos para a web em
 * public/videos (H.264, faststart). Nada é baixado antes do clique: só o pôster (WebP) e só quando a seção
 * chega perto da tela. O vídeo de 1 minuto tem textos e narração em português → só na página pt-BR.
 * As gravações de tela usam o pet shop fictício do seed (nenhum dado de cliente).
 */
const VIDEOS = [
    { id: 'promo', key: 'promo', icon: Clapperboard, src: '/videos/petzara-1-minuto.mp4', poster: '/videos/petzara-1-minuto.webp', w: 1280, h: 720, duration: '1:06', sound: true, locales: ['pt-BR'] },
    { id: 'novo-agendamento', key: 'novoAgendamento', icon: CalendarPlus, src: '/videos/01-hero-novo-agendamento.mp4', poster: '/videos/01-hero-novo-agendamento.webp', w: 1280, h: 768, duration: '0:48' },
    { id: 'agenda', key: 'agenda', icon: CalendarDays, src: '/videos/02-agenda-calendario.mp4', poster: '/videos/02-agenda-calendario.webp', w: 1280, h: 768, duration: '0:32' },
    { id: 'link-publico', key: 'link', icon: Link2, src: '/videos/03-link-publico-de-agendamento.mp4', poster: '/videos/03-link-publico-de-agendamento.webp', w: 1280, h: 768, duration: '0:19' },
    { id: 'financeiro', key: 'financeiro', icon: Wallet, src: '/videos/05-financeiro-e-exportacao.mp4', poster: '/videos/05-financeiro-e-exportacao.webp', w: 1280, h: 768, duration: '0:41' },
    { id: 'celular', key: 'celular', icon: Smartphone, src: '/videos/08-celular.mp4', poster: '/videos/08-celular.webp', w: 1280, h: 768, duration: '0:32' },
]

export default function VideoSection() {
    const { ref, isInView } = useResponsiveInView()
    const { t, tm, locale } = useI18n()
    const links = useLinks()
    const videos = VIDEOS
        .filter((v) => !v.locales || v.locales.includes(locale))
        .map((v) => ({ ...v, ...(tm(`video.items.${v.key}`) || {}) }))
    const [currentId, setCurrentId] = useState(videos[0].id)
    const [started, setStarted] = useState(false)
    const reported = useRef(new Set())
    const current = videos.find((v) => v.id === currentId) || videos[0]
    const Icon = current.icon

    const onPlay = () => {
        if (reported.current.has(current.id)) return
        reported.current.add(current.id)
        siteVideo(current.id)
        track('video_play', { video_id: current.id })
    }

    return (
        <section id="video" className="py-20 sm:py-24 relative overflow-hidden">
            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease }}
                    className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
                >
                    <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        {t('video.badge')}
                    </span>
                    <h2 className="font-accent text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        <Highlighted parts={tm('video.title')} />
                    </h2>
                    <p className="text-taupe text-lg leading-relaxed">{t('video.subtitle')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.15, ease }}
                    className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6 items-start max-w-6xl mx-auto"
                >
                    {/* Lista de vídeos: chips roláveis no celular, coluna no desktop */}
                    <div className="lg:order-2 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto lg:overflow-visible">
                        <div role="tablist" aria-label={t('video.tabsLabel')} className="flex lg:flex-col gap-2 w-max lg:w-auto pb-1">
                            {videos.map((v) => {
                                const active = v.id === current.id
                                const VIcon = v.icon
                                return (
                                    <button
                                        key={v.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        aria-controls="video-player"
                                        onClick={() => setCurrentId(v.id)}
                                        className={`flex items-center gap-3 text-left rounded-2xl border px-3.5 py-2.5 lg:py-3 transition-all shrink-0 ${active
                                            ? 'bg-espresso border-espresso text-white shadow-lg shadow-espresso/15'
                                            : 'bg-white border-sand/70 text-espresso hover:border-terracotta/40'}`}
                                    >
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-white/15' : 'bg-terracotta/10 text-terracotta'}`}>
                                            <VIcon size={16} aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-bold leading-tight whitespace-nowrap lg:whitespace-normal">{v.title}</span>
                                            <span className={`hidden lg:block text-xs mt-0.5 leading-snug ${active ? 'text-white/70' : 'text-taupe'}`}>{v.short}</span>
                                        </span>
                                        <span className={`ml-auto pl-2 text-xs font-semibold tabular-nums ${active ? 'text-white/70' : 'text-taupe/70'}`}>{v.duration}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Player */}
                    <div className="lg:order-1">
                        <div
                            id="video-player"
                            role="tabpanel"
                            className="relative rounded-2xl overflow-hidden bg-espresso shadow-2xl shadow-espresso/15 border border-sand/50"
                            style={{ aspectRatio: `${current.w} / ${current.h}` }}
                        >
                            {started ? (
                                <video
                                    key={current.id}
                                    src={current.src}
                                    poster={current.poster}
                                    controls
                                    autoPlay
                                    playsInline
                                    muted={!current.sound}
                                    preload="auto"
                                    onPlay={onPlay}
                                    className="absolute inset-0 w-full h-full bg-espresso"
                                    aria-label={current.title}
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setStarted(true)}
                                    className="group absolute inset-0 w-full h-full"
                                    aria-label={t('video.play', { title: current.title })}
                                >
                                    <img
                                        key={current.id}
                                        src={current.poster}
                                        alt=""
                                        width={current.w}
                                        height={current.h}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <span className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/10 to-transparent" />
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-terracotta text-white flex items-center justify-center shadow-xl shadow-terracotta/30 transition-transform group-hover:scale-110">
                                            <Play size={30} className="ml-1" fill="currentColor" aria-hidden="true" />
                                        </span>
                                    </span>
                                    <span className="absolute left-4 bottom-4 right-4 flex items-center gap-2 text-white text-sm font-semibold text-left">
                                        <Icon size={16} aria-hidden="true" />
                                        <span className="truncate">{current.title}</span>
                                        <span className="ml-auto bg-black/40 rounded-md px-2 py-0.5 text-xs tabular-nums">{current.duration}</span>
                                    </span>
                                </button>
                            )}
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-4 sm:justify-between">
                            <div>
                                <h3 className="font-accent font-bold text-lg text-espresso">{current.title}</h3>
                                <p className="text-taupe text-sm leading-relaxed max-w-xl">{current.description}</p>
                                <p className="text-taupe/70 text-xs mt-2">{t('video.note')}</p>
                            </div>
                            <a
                                href={links.register}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-track="video_cta"
                                className="shrink-0 inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-lg shadow-terracotta/20"
                            >
                                {t('video.cta')}
                                <ArrowRight size={16} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
