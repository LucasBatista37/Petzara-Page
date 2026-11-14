import { useLinks } from '../lib/links'
import { useI18n } from '../i18n/I18nProvider.jsx'

/**
 * Selos oficiais do Google Play e da App Store, lado a lado.
 * O PNG do Google Play já vem com uma margem transparente em volta (cerca de 1/6 da altura em cima e
 * embaixo); o selo da Apple não tem. Por isso o da Apple usa 2/3 da altura do da Play: os dois ficam
 * com o mesmo tamanho visível. gap-3 (12 px) respeita o espaço livre mínimo da Apple (1/4 da altura do selo).
 *
 * size: 'lg' (hero, 60 px) ou 'md' (seção de dispositivos, 48 px). center: centraliza também no desktop.
 */
const SIZES = {
    lg: { play: 'h-[60px]', apple: 'h-[40px]', w: 155, h: 60, aw: 120, ah: 40 },
    md: { play: 'h-12', apple: 'h-8', w: 124, h: 48, aw: 96, ah: 32 },
}

export default function StoreBadges({ size = 'lg', playAlt, appStoreAlt, eager = false, center = false, trackPrefix, className = '' }) {
    const { meta } = useI18n()
    const links = useLinks()
    const s = SIZES[size] || SIZES.lg
    const loading = eager ? 'eager' : 'lazy'
    const link = 'inline-flex items-center justify-center transition-transform hover:-translate-y-0.5 active:translate-y-0'
    return (
        <div className={`flex flex-wrap items-center justify-center ${center ? '' : 'sm:justify-start'} gap-3 ${className}`}>
            <a
                href={links.play}
                target="_blank"
                rel="noopener noreferrer"
                data-track={trackPrefix ? `${trackPrefix}_play` : undefined}
                aria-label={playAlt}
                className={link}
            >
                <img src={meta.playBadge} alt={playAlt} width={s.w} height={s.h} className={`${s.play} w-auto`} loading={loading} />
            </a>
            <a
                href={links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                data-track={trackPrefix ? `${trackPrefix}_app_store` : undefined}
                aria-label={appStoreAlt}
                className={link}
            >
                <img src={links.appStoreBadge} alt={appStoreAlt} width={s.aw} height={s.ah} className={`${s.apple} w-auto`} loading={loading} />
            </a>
        </div>
    )
}
