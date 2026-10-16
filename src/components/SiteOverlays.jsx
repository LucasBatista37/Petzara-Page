import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConsentBanner from './ConsentBanner'
import {
    analyticsConfigured,
    CONSENT_EVENT,
    getConsent,
    initAnalytics,
    trackPageView,
} from '../lib/analytics'

/**
 * Elementos fixos do site (faixa de cookies). Não aparecem nas páginas abertas
 * pelo app (?origem=app), que não devem levar ao site.
 */
export default function SiteOverlays() {
    const location = useLocation()
    const fromApp = new URLSearchParams(location.search).get('origem') === 'app'
    const [consent, setConsentState] = useState(() => getConsent())
    const [, setBannerHeight] = useState(0)
    const firstPath = useRef(location.pathname)

    useEffect(() => {
        if (fromApp) return
        initAnalytics()
        const onChange = (e) => setConsentState(e.detail ?? null)
        window.addEventListener(CONSENT_EVENT, onChange)
        return () => window.removeEventListener(CONSENT_EVENT, onChange)
    }, [fromApp])

    // PageView do Pixel nas navegações internas (o GA4 mede sozinho pelo histórico).
    useEffect(() => {
        if (location.pathname === firstPath.current) return
        firstPath.current = null
        trackPageView()
    }, [location.pathname])

    if (fromApp) return null

    const showBanner = analyticsConfigured && consent === null

    return (
        <>
            {showBanner && <ConsentBanner onHeight={setBannerHeight} />}
        </>
    )
}
