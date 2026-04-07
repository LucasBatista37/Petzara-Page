import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import BenefitsSection from '../components/BenefitsSection'
import DemoSection from '../components/DemoSection'
import HowItWorksSection from '../components/HowItWorksSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import MobileStickyCTA from '../components/MobileStickyCTA'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-cream pb-[88px] md:pb-0">
            <Navbar />
            <main>
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <BenefitsSection />
                <DemoSection />
                <HowItWorksSection />
                <CTASection />
            </main>
            <Footer />
            <MobileStickyCTA />
        </div>
    )
}
