import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Curva de easing premium — usada em Framer, Linear, Vercel
export const ease = [0.25, 0.46, 0.45, 0.94]

// Fade + slide-up genérico
export const fadeUp = (delay = 0, duration = 0.55) => ({
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
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

// Word reveal — para headline word-by-word (usar com staggerContainer)
export const wordVariant = {
  initial: { opacity: 0, y: 16, rotateX: -20 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.38, ease } },
}

/**
 * Hook responsivo de scroll-reveal.
 *
 * Mobile  (< 768 px): margin -20px — dispara assim que o elemento
 *   toca o viewport, garantindo que usuários de touch vejam a animação.
 * Desktop (≥ 768 px): margin -80px — espaço suficiente para o efeito
 *   ser percebido enquanto o elemento "sobe" na tela.
 *
 * isMobile também é exposto para que os componentes ajustem stagger e
 * delays conforme o dispositivo.
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
