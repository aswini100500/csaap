// Components/Home.js
import React from 'react';

import Testimonials from '../BuilderErp/Testimonials';

import Faq from '../BuilderErp/Faq';
import RealEstateBanner from '../BuilderErp/RealEstateBanner';
import RealEstate from '../BuilderErp/RealEstate';
import ERPdescription from '../BuilderErp/ERPdescription';
import LatestNews from '../BuilderErp/LattestNews';
import WhyChooseUs from '../BuilderErp/WhyChooseUs';


const Home = () => {
  return (
    <>
       <RealEstateBanner/>
      

      <RealEstate/>
      <ERPdescription/>
      <WhyChooseUs/>
      
      <Testimonials/> 
      <LatestNews/>
 
      <Faq/>
      {/* <AIAgent/> Add the AIAgent component */}
    </>
  );
};

export default Home;