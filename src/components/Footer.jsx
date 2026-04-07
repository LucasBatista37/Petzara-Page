import { Link } from 'react-router-dom'
import { appLoginUrl, appRegisterUrl, SUPPORT_EMAIL } from '../siteConfig'

export default function Footer() {
    return (
        <footer className="bg-espresso text-white/60 py-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-terracotta/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2.5 mb-4">
                            <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M256 260C200 260 140 290 140 360C140 430 190 460 256 460C322 460 372 430 372 360C372 290 312 260 256 260Z" fill="#E07A5F" />
                                <circle cx="160" cy="220" r="45" fill="#81B29A" />
                                <circle cx="256" cy="170" r="50" fill="#E07A5F" />
                                <circle cx="352" cy="220" r="45" fill="#81B29A" />
                            </svg>
                            <span className="font-accent font-bold text-lg text-white">
                                Pet<span className="text-terracotta">zara</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            O sistema de gestão completo para petshops focados em banho e tosa.
                        </p>
                    </div>

                    {/* Produto */}
                    <div>
                        <h4 className="font-accent font-bold text-white text-sm mb-4">Produto</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><a href="#solucao" className="hover:text-terracotta transition-colors">Funcionalidades</a></li>
                            <li><a href="#beneficios" className="hover:text-terracotta transition-colors">Benefícios</a></li>
                            <li><a href="#demo" className="hover:text-terracotta transition-colors">Demonstração</a></li>
                            <li><a href="#como-funciona" className="hover:text-terracotta transition-colors">Como Funciona</a></li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div>
                        <h4 className="font-accent font-bold text-white text-sm mb-4">Suporte</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><a href={appLoginUrl} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">Entrar</a></li>
                            <li><a href={appRegisterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">Criar Conta</a></li>
                            <li><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-terracotta transition-colors">Contato</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-accent font-bold text-white text-sm mb-4">Legal</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/termos-de-uso" className="hover:text-terracotta transition-colors">Termos de Uso</Link></li>
                            <li><Link to="/politica-de-privacidade" className="hover:text-terracotta transition-colors">Política de Privacidade</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs">
                        © {new Date().getFullYear()} Petzara. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-terracotta/20 hover:text-terracotta transition-all"
                            aria-label="Instagram"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-sage/20 hover:text-sage transition-all"
                            aria-label="WhatsApp"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
