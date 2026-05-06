import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import ColorPaletteSection from '../components/ColorPaletteSection'
import DemoSection from '../components/DemoSection'
import MultiDeviceSection from '../components/MultiDeviceSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <main className="bg-gradient-to-b from-cream via-cream-warm to-cream">
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <HowItWorksSection />
                <DemoSection />
                <MultiDeviceSection />
                <ColorPaletteSection />
                <PricingSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
