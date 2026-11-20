// Molduras de aparelho da landing. Proporções de aparelhos atuais: borda fina (≈2% da largura no celular),
// cantos bem arredondados, câmera em furo e barra de status — a tela do sistema fica inteira, sem nada por cima.
// Tudo em unidades do próprio quadro (cqw), então a moldura mantém a proporção em qualquer tamanho.

const BODY = '#161312'
const EDGE = '#4a4340'

function StatusBar({ color = '#1c1917' }) {
    return (
        <div
            className="relative flex items-center justify-between select-none"
            style={{ height: '9cqw', padding: '1.2cqw 6.5cqw 0', color, fontSize: '3.7cqw', fontWeight: 700, lineHeight: 1 }}
            aria-hidden="true"
        >
            <span style={{ letterSpacing: '-0.01em' }}>9:41</span>
            {/* câmera */}
            <span
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{ top: '2.6cqw', width: '3.6cqw', height: '3.6cqw', background: '#0c0a09', boxShadow: 'inset 0 0 0 0.5cqw #26211f' }}
            />
            <svg viewBox="0 0 64 20" style={{ height: '3.5cqw', width: 'auto' }} fill="currentColor">
                {/* sinal */}
                <rect x="0" y="12" width="3.4" height="6" rx="1" /><rect x="5.2" y="9" width="3.4" height="9" rx="1" />
                <rect x="10.4" y="5.5" width="3.4" height="12.5" rx="1" /><rect x="15.6" y="2" width="3.4" height="16" rx="1" />
                {/* wi-fi */}
                <path d="M33 5.2c3.4 0 6.5 1.3 8.8 3.5l-1.9 2A9.9 9.9 0 0 0 33 8c-2.7 0-5.1 1-6.9 2.7l-1.9-2A12.7 12.7 0 0 1 33 5.2Zm0 5.6c1.9 0 3.6.7 4.9 1.9l-1.9 2A4.3 4.3 0 0 0 33 13.6c-1.1 0-2.2.4-3 1.1l-1.9-2a7 7 0 0 1 4.9-1.9Zm0 5.4 2 2.1-2 2.1-2-2.1Z" />
                {/* bateria */}
                <rect x="46.5" y="3.5" width="14.5" height="13" rx="3.6" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.3" />
                <rect x="48.3" y="5.3" width="10.9" height="9.4" rx="2.2" /><rect x="62" y="7.5" width="1.8" height="5" rx=".9" fillOpacity=".5" />
            </svg>
        </div>
    )
}

/**
 * Celular. `children` é o conteúdo da tela (imagem do sistema). `className` no elemento externo define a largura.
 * `statusBg`: cor de fundo da barra de status (a mesma do topo da tela mostrada).
 */
export function PhoneFrame({ children, className = '', style, statusBg = '#ffffff', statusColor, shadow = '0 5cqw 9cqw -3cqw rgba(28,22,20,0.45)' }) {
    return (
        <div className={`relative ${className}`} style={{ containerType: 'inline-size', ...style }}>
            <div
                className="relative"
                style={{ borderRadius: '14cqw', padding: '2.1cqw', background: BODY, boxShadow: `inset 0 0 0 0.45cqw ${EDGE}, ${shadow}` }}
            >
                <div className="relative overflow-hidden" style={{ borderRadius: '12cqw', background: statusBg }}>
                    <StatusBar color={statusColor} />
                    {children}
                </div>
                {/* botões laterais */}
                <span className="absolute" style={{ right: '-0.7cqw', top: '34cqw', width: '0.8cqw', height: '15cqw', borderRadius: '0 0.5cqw 0.5cqw 0', background: EDGE }} aria-hidden="true" />
                <span className="absolute" style={{ left: '-0.7cqw', top: '27cqw', width: '0.8cqw', height: '8cqw', borderRadius: '0.5cqw 0 0 0.5cqw', background: EDGE }} aria-hidden="true" />
                <span className="absolute" style={{ left: '-0.7cqw', top: '38cqw', width: '0.8cqw', height: '8cqw', borderRadius: '0.5cqw 0 0 0.5cqw', background: EDGE }} aria-hidden="true" />
            </div>
        </div>
    )
}

/** Notebook: tampa de borda fina com câmera e base baixa, um pouco mais larga que a tela. */
export function LaptopFrame({ children, className = '', shadow = '0 4cqw 8cqw -3cqw rgba(28,22,20,0.35)' }) {
    return (
        <div className={`relative ${className}`} style={{ containerType: 'inline-size' }}>
            <div
                className="relative mx-[4%]"
                style={{ borderRadius: '2.2cqw 2.2cqw 0.4cqw 0.4cqw', padding: '1.5cqw 1.3cqw 1.6cqw', background: BODY, boxShadow: `inset 0 0 0 0.25cqw ${EDGE}, ${shadow}` }}
            >
                <span className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ top: '0.5cqw', width: '0.6cqw', height: '0.6cqw', background: '#3a3331' }} aria-hidden="true" />
                <div className="overflow-hidden" style={{ borderRadius: '0.8cqw' }}>{children}</div>
            </div>
            {/* base */}
            <div
                className="relative"
                style={{ height: '2.1cqw', borderRadius: '0.3cqw 0.3cqw 1.8cqw 1.8cqw', background: 'linear-gradient(180deg, #5a524e 0%, #3a3432 22%, #231f1d 100%)' }}
                aria-hidden="true"
            >
                <span className="absolute left-1/2 -translate-x-1/2 top-0" style={{ width: '13%', height: '0.7cqw', borderRadius: '0 0 0.8cqw 0.8cqw', background: '#1d1918' }} />
            </div>
        </div>
    )
}

/** Tablet deitado: borda fina e uniforme. */
export function TabletFrame({ children, className = '', shadow = '0 4cqw 8cqw -2cqw rgba(0,0,0,0.5)' }) {
    return (
        <div className={`relative ${className}`} style={{ containerType: 'inline-size' }}>
            <div className="relative" style={{ borderRadius: '4.2cqw', padding: '2.4cqw', background: BODY, boxShadow: `inset 0 0 0 0.3cqw ${EDGE}, ${shadow}` }}>
                <span className="absolute top-1/2 -translate-y-1/2 rounded-full" style={{ left: '0.9cqw', width: '0.7cqw', height: '0.7cqw', background: '#3a3331' }} aria-hidden="true" />
                <div className="overflow-hidden" style={{ borderRadius: '2cqw' }}>{children}</div>
            </div>
        </div>
    )
}
