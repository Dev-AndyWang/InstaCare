import { useState, useEffect } from 'react';
import Header from '../components/landing/Header';
import SideNav from '../components/landing/SideNav';
import HeroSection from '../components/landing/HeroSection';
import InfoCard from '../components/landing/InfoCard';
import ScrollIndicator from '../components/landing/ScrollIndicator';
import ExpertiseSection from '../components/landing/ExpertiseSection';
import TechnologySection from '../components/landing/TechnologySection';
import ServicesSection from '../components/landing/ServicesSection';
import TeamSection from '../components/landing/TeamSection';

export default function LandingPage({ onGetStarted }) {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const sections = ['intro', 'expertise', 'technology', 'services', 'contacts'];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5D9F2] via-[#F5E6FF] via-[#FFE5F1] via-[#E5E5FF] to-[#F0E6FF]">
      {/* Fixed Header */}
      <Header />

      {/* Side Navigation with active section */}
      <SideNav activeSection={activeSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section - Full viewport height */}
        <HeroSection onGetStarted={onGetStarted} />

        {/* Info Card Section */}
        <InfoCard />

        {/* Expertise Section */}
        <ExpertiseSection />

        {/* Technology Section */}
        <TechnologySection />

        {/* Services Section */}
        <ServicesSection />

        {/* Team/Contacts Section */}
        <TeamSection />
      </main>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
}
