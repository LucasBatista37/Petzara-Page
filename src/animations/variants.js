import { useInView } from 'framer-motion'
import { useRef } from 'react'

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
 * Mobile  (< 768px): dispara no momento em que qualquer parte do elemento
 *   toca o viewport — o scroll já funciona como stagger natural.
 * Desktop (≥ 768px): dispara 80px dentro do viewport para o efeito
 *   "subindo para a tela" que deixa a animação visível e deliberada.
 *
 * Chamado no render do componente; não reage a resize (aceitável em landing page).
 */
export function getCardViewport() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  return isMobile
    ? { once: true, margin: '0px 0px 0px 0px' }
    : { once: true, margin: '0px 0px -80px 0px' }
}

/**
 * Hook responsivo de scroll-reveal para CABEÇALHOS de seção.
 * O ref fica no container da seção — adequado para títulos que ficam
 * no topo de cada seção e ficam visíveis quando ela entra na tela.
 *
 * Para cards individuais dentro de grids/listas, use whileInView + getCardViewport()
 * em cada card, não este hook — assim cada card anima quando ELE entra na tela.
 */
export function useResponsiveInView() {
  const ref = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isInView = useInView(ref, {
    once: true,
    margin: isMobile ? '-20px' : '-80px',
  })
  return { ref, isInView, isMobile }
}
