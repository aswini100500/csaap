// Pages/HomePage.js
import React from 'react';
import IndustryImg from '../Components/IndustryImg';
import KeyFeaturesSection from '../Components/KeyFeaturesSection';
import ProductsSection from '../Components/ProductsSection';
import ClientSection from '../Components/ClientSection';
import ServicesSection from '../Components/ServicesSection';
import CloudBased from '../Components/Cloudbased';
import BenefitsSection from '../Components/BenifitsSection';
import CloudBasedTab from '../Components/CloudBasedTab';
import QuickAccess from '../Components/QuickAccess';
import Workstep from '../Components/Workstep';
import IndustryComponent from '../Components/IndustryComponent';
import BusinessComponent from '../Components/BusinessComponent';
import Testimonials from '../Components/Testimonials';
import BookDemoSection from '../Components/BookDemoSection';
import Faq from '../Components/Faq';
import  HeroSection from '../Components/HeroSection'

const HomePage = () => {
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
    </>
  );
};

export default HomePage;