/** Tamanho real dos prints (reserva o espaço antes de a imagem chegar: sem salto de layout). */
function printSize(src) {
    if (src.startsWith('/prints/v2/app/mobile/')) return { width: 900, height: 1948 }
    if (src.startsWith('/prints/v2/app/')) return { width: 1600, height: 960 }
    return {}
}

export default function OptimizedImage({ src, alt, className, style, loading = 'lazy', width, height, srcSet, sizes, fetchPriority }) {
    const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp')
    const size = printSize(src)
    return (
        <picture>
            <source srcSet={srcSet || webpSrc} sizes={srcSet ? sizes : undefined} type="image/webp" />
            <img
                src={src}
                alt={alt}
                className={className}
                style={style}
                loading={loading}
                decoding="async"
                fetchPriority={fetchPriority}
                width={width ?? size.width}
                height={height ?? size.height}
            />
        </picture>
    )
}
