import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import BenefitsSection from '../components/BenefitsSection'
import DemoSection from '../components/DemoSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            <main>
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <BenefitsSection />
                <DemoSection />
                <HowItWorksSection />
                <PricingSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
