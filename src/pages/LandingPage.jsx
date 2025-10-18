import Header from '../components/landing/Header';
import SideNav from '../components/landing/SideNav';
import HeroSection from '../components/landing/HeroSection';
import InfoCard from '../components/landing/InfoCard';
import ScrollIndicator from '../components/landing/ScrollIndicator';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <main>
        {/* Hero Section - Full viewport height */}
        <HeroSection onGetStarted={onGetStarted} />

        {/* Info Card Section */}
        <InfoCard />

        {/* Additional sections can go here */}
      </main>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
}
