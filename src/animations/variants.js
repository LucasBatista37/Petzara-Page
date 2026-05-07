import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Curva de easing premium — usada em Framer, Linear, Vercel
export const ease = [0.25, 0.46, 0.45, 0.94]

// Fade + slide-up genérico
export const fadeUp = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease },
})

// Container que propaga stagger automático para filhos
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial: {},
  animate: { transition: { staggerChildren, delayChildren } },
})

// Card individual para uso dentro de staggerContainer
export const cardVariant = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

// Word reveal — para headline word-by-word (usar com staggerContainer)
export const wordVariant = {
  initial: { opacity: 0, y: 16, rotateX: -20 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.42, ease } },
}

/**
 * Viewport config para whileInView por elemento.
 *
 * Mobile  (< 768px): dispara 120px ANTES do elemento entrar na tela —
 *   assim a animação já terminou quando o usuário chega no elemento,
 *   mesmo em scroll rápido.
 * Desktop (≥ 768px): dispara 80px dentro do viewport para o efeito
 *   "subindo para a tela" que deixa a animação visível e deliberada.
 *
 * Chamado no render do componente; não reage a resize (aceitável em landing page).
 */
export function getCardViewport() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  return isMobile
    ? { once: true, margin: '0px 0px 120px 0px' }
    : { once: true, margin: '0px 0px -80px 0px' }
}

/**
 * Hook responsivo de scroll-reveal para CABEÇALHOS de seção.
 *
 * Mobile: dispara 150px antes do elemento entrar no viewport, dando
 *   tempo para a animação completar mesmo com scroll rápido.
 *   Inclui fallback: se o scroll foi tão rápido que o IntersectionObserver
 *   nunca disparou e o elemento já passou, força o estado animado após 600ms.
 *
 * Desktop: dispara 80px dentro do viewport para o reveal deliberado.
 */
export function useResponsiveInView() {
  const ref = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const isInView = useInView(ref, {
    once: true,
    margin: isMobile ? '0px 0px 150px 0px' : '0px 0px -80px 0px',
  })

  // Fallback para scroll ultra-rápido no mobile: se o observer não disparou
  // e o elemento já saiu do viewport pelo topo, força o estado animado.
  const [scrolledPast, setScrolledPast] = useState(false)
  useEffect(() => {
    if (isInView || !isMobile) return
    const id = setTimeout(() => {
      if (ref.current && ref.current.getBoundingClientRect().bottom < 0) {
        setScrolledPast(true)
      }
    }, 600)
    return () => clearTimeout(id)
  }, [isInView, isMobile])

  return { ref, isInView: isInView || scrolledPast, isMobile }
}
