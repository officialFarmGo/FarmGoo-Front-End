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
    <div>
      <Header 
        onScrollToSection={scrollToSection}
        refs={{ homeRef, aboutRef, howItWorksRef, featuresRef, contactRef }}
      />
      
      <div ref={homeRef}><HeroSection /></div>
      <Detail />
      <DetailTwo />
      <div ref={howItWorksRef}><HowItWorks /></div>
      <div ref={aboutRef}><AboutUs /></div>
      <OurValues />
      <BuiltForEveryOne />
      <div ref={contactRef}><ContactUs /></div>
      <div ref={featuresRef}><PlatFormFeatures /></div>
      <PaymentsTrust />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPageComponents