import React, { useRef } from 'react'
import HeroSection from '../HeroSection'
import Detail from '../Detail'
import DetailTwo from '../DetailTwo'
import HowItWorks from '../HowItWorks'
import AboutUs from '../AboutUs'
import OurValues from '../OurValues'
import BuiltForEveryOne from '../BuiltForEveryOne'
import ContactUs from '../ContactUs'
import PlatFormFeatures from '../PlatFormFeatures'
import PaymentsTrust from '../PaymentTrust'
import Testimonials from '../Testimonials'
import CTASection from '../CTASection'
import Header from '../Header'
import Footer from '../Footer'

const LandingPageComponents = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <Header 
        onScrollToSection={scrollToSection}
        refs={{ homeRef, aboutRef, howItWorksRef, featuresRef, contactRef }}
      />
      
      <div ref={homeRef}>
        <HeroSection />
      </div>

      <div style={{  width: '100%' }}>
        <Detail />
      </div>

      <div style={{ padding: '100px 0', backgroundColor: '#f9f9f9', width: '100%' }}>
        <DetailTwo />
      </div>

      <div ref={howItWorksRef} style={{ padding: '20px 0', width: '100%' }}>
        <HowItWorks />
      </div>

      <div ref={aboutRef} style={{ padding: '100px 0', backgroundColor: '#f9f9f9', width: '100%' }}>
        <AboutUs />
      </div>

      <div style={{ padding: '30px 0', width: '100%' }}>
        <OurValues />
      </div>

      <div style={{ padding: '30px 0', backgroundColor: '#f9f9f9', width: '100%' }}>
        <BuiltForEveryOne />
      </div>

      <div ref={contactRef} style={{ padding: '30px 0', width: '100%' }}>
        <ContactUs />
      </div>

      <div ref={featuresRef} style={{ padding: '100px 0', backgroundColor: '#f9f9f9', width: '100%' }}>
        <PlatFormFeatures />
      </div>

      <div style={{ padding: '80px 0', width: '100%' }}>
        <PaymentsTrust />
      </div>

      <div style={{ padding: '30px 0', backgroundColor: '#f9f9f9', width: '100%' }}>
        <Testimonials />
      </div>

      <div style={{  width: '100%' }}>
        <CTASection />
      </div>

      <Footer />
    </div>
  )
}

export default LandingPageComponents;