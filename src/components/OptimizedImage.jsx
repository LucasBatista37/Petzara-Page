export default function OptimizedImage({ src, alt, className, style, loading = 'lazy', width, height }) {
    const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp')
    return (
        <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
                src={src}
                alt={alt}
                className={className}
                style={style}
                loading={loading}
                width={width}
                height={height}
            />
        </picture>
    )
}
