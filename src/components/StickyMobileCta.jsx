import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLinks } from '../lib/links'
import { useI18n } from '../i18n/I18nProvider.jsx'

export const STICKY_CTA_HEIGHT = 68

/**
 * Barra fixa de cadastro no celular (só na página inicial). Aparece depois que o botão do topo saiu da
 * tela e some perto do fim, onde já existe o botão final — nunca dois botões iguais à vista.
 */
export default function StickyMobileCta({ onVisible }) {
    const { t } = useI18n()
    const links = useLinks()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const hero = document.getElementById('hero')
        const end = document.getElementById('cta')
        if (!hero || typeof IntersectionObserver === 'undefined') return undefined
        let heroIn = true
        let endIn = false
        const update = () => setVisible(!heroIn && !endIn)
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.target === hero) heroIn = e.isIntersecting
                else endIn = e.isIntersecting
            }
            update()
        })
        io.observe(hero)
        if (end) io.observe(end)
        return () => io.disconnect()
    }, [])

    useEffect(() => { onVisible?.(visible) }, [visible, onVisible])

    return (
        <div
            data-sticky-cta
            aria-hidden={!visible}
            style={{ transform: visible ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 0.25s ease' }}
            className="sm:hidden fixed z-40 bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-sand px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-8px_rgba(44,36,33,0.18)]"
        >
            <a
                href={links.register}
                target="_blank"
                rel="noopener noreferrer"
                data-track="barra_fixa"
                tabIndex={visible ? 0 : -1}
                aria-label={t('sticky.aria')}
                className="flex items-center justify-center gap-2 bg-terracotta active:bg-terracotta-dark text-white font-bold text-base h-12 rounded-xl mr-[68px]"
            >
                <span className="whitespace-nowrap">{t('sticky.cta')}</span>
                <ArrowRight size={17} aria-hidden="true" />
            </a>
        </div>
    )
}
