import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/termos-de-uso" element={<LegalPage variant="terms" />} />
                <Route path="/politica-de-privacidade" element={<LegalPage variant="privacy" />} />
            </Routes>
        </BrowserRouter>
    )
}
