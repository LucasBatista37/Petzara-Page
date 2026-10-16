import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SiteOverlays from './components/SiteOverlays'

// Páginas fora da home em chunks próprios: react-markdown/remark-gfm, os textos
// legais e os artigos do blog não pesam no carregamento da página inicial (L8).
const LegalPage = lazy(() => import('./pages/LegalPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const DownloadPage = lazy(() => import('./pages/DownloadPage'))

function PageFallback() {
    return <div className="min-h-screen bg-cream" />
}

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/download" element={<DownloadPage />} />
                    <Route path="/termos-de-uso" element={<LegalPage variant="terms" />} />
                    <Route path="/politica-de-privacidade" element={<LegalPage variant="privacy" />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                </Routes>
            </Suspense>
            <SiteOverlays />
        </BrowserRouter>
    )
}
