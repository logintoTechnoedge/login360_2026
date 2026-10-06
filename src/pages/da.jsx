import React from 'react';  
import Hero from '../sections/hero.jsx'; 
import WhatsappFloat, { PhoneFloat } from '../components/float_icons.jsx'; 
import PainPoints from '../sections/pain_points.jsx';
import WhyLogin from '../sections/why_login.jsx';
import DACurriculam from '../courses/da_curriculam.jsx';
import PlacementSupport from '../sections/support.jsx';
import Stats from '../sections/stats.jsx';
import Pricing from '../courses/pricing.jsx';
import BatchDetails from '../courses/batch_detail.jsx';
import FAQ from '../courses/faq.jsx';
import ContactBanner from '../sections/contact_banner.jsx';
import { usePopup } from '../hooks/usePopup.js';

export default function DataAnalytics() {
  const page = "Data Analytics";
  const { popup, openPopup, closePopup } = usePopup();
  return (  
    <>  
      <Hero />
      <PainPoints /> 
      <WhyLogin /> 
      <DACurriculam />
      <PlacementSupport />
      <Stats />
      <Pricing page={page} openPopup={openPopup} />
      <BatchDetails />
      <FAQ /> 
      <ContactBanner page={page} openPopup={openPopup}/>
      <WhatsappFloat />
    </>
  );
}