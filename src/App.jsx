import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import DownloadPage from './pages/DownloadPage'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/termos-de-uso" element={<LegalPage variant="terms" />} />
                <Route path="/politica-de-privacidade" element={<LegalPage variant="privacy" />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
        </BrowserRouter>
    )
}
