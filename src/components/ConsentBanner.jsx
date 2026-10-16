import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { setConsent } from '../lib/analytics'

/**
 * Faixa LGPD (L1). Só é montada quando há GA4/Pixel configurado e a pessoa ainda
 * não respondeu. "Recusar" é tão fácil quanto "Aceitar" e a escolha fica no localStorage.
 * onHeight informa a altura para o botão do WhatsApp não ficar por cima (L5).
 */
export default function ConsentBanner({ onHeight }) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el || !onHeight) return
        const report = () => onHeight(el.getBoundingClientRect().height)
        report()
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(report) : null
        ro?.observe(el)
        return () => { ro?.disconnect(); onHeight(0) }
    }, [onHeight])

    return (
        <div
            ref={ref}
            data-consent-banner
            role="region"
            aria-label="Aviso de cookies"
            className="fixed z-[60] bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-md bg-white border border-sand shadow-xl shadow-espresso/10 rounded-2xl p-4 sm:p-5"
        >
            <div className="flex items-start gap-3">
                <span className="shrink-0 w-9 h-9 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center" aria-hidden="true">
                    <Cookie size={18} />
                </span>
                <p className="text-sm text-espresso/80 leading-relaxed">
                    Usamos cookies para medir o uso do site.{' '}
                    <Link to="/politica-de-privacidade" className="underline underline-offset-2 text-taupe hover:text-terracotta">
                        Saiba mais
                    </Link>
                </p>
            </div>
            <div className="mt-3 flex gap-2 sm:pl-12">
                <button
                    type="button"
                    onClick={() => setConsent('declined')}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border-2 border-sand text-espresso font-bold text-sm hover:border-terracotta/40 transition-colors"
                >
                    Recusar
                </button>
                <button
                    type="button"
                    onClick={() => setConsent('accepted')}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm transition-colors"
                >
                    Aceitar
                </button>
            </div>
        </div>
    )
}
