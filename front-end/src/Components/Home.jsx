// Components/Home.js
import React from 'react';
import HeroSection from './HeroSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ProductsSection from './ProductsSection';
import ClientSection from './ClientSection';
import ServicesSection from './ServicesSection';
import CloudBased from './Cloudbased';
import BenefitsSection from './BenifitsSection';
import CloudBasedTab from './CloudBasedTab';
import QuickAccess from './QuickAccess';
import Workstep from './Workstep';
import IndustryComponent from './IndustryComponent';
import BusinessComponent from './BusinessComponent';
import Testimonials from './Testimonials';
import BookDemoSection from './BookDemoSection';
import Faq from './Faq';
import AIAgent from './Aiagent'; // Import the AIAgent component

const Home = () => {
  return (
    <>
      <HeroSection/>
      <KeyFeaturesSection/>
      <ProductsSection/>
      <ClientSection/>
      <ServicesSection/>
      <CloudBased/>
      <BenefitsSection/>
      <CloudBasedTab/>
      <QuickAccess/>
      <Workstep/>
      <IndustryComponent/>
      <BusinessComponent/>
      <Testimonials/> 
      <BookDemoSection/>
      <Faq/>
      {/* <AIAgent/> Add the AIAgent component */}
    </>
  );
};

export default Home;