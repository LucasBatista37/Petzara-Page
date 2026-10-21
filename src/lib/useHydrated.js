import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * false no servidor e durante a hidratação; true logo depois, no navegador.
 *
 * O HTML é pré-renderizado no build. Tudo que depende do navegador (UTM guardada, Android,
 * consentimento, ?origem=app, largura da tela) só pode mudar o que aparece DEPOIS da hidratação:
 * na hidratação o React não corrige atributos diferentes (ex.: o href com UTM ficaria errado).
 */
export function useHydrated() {
    return useSyncExternalStore(subscribe, () => true, () => false)
}
