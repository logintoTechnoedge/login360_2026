import React, { useEffect } from 'react';  
import WhatsappFloat, { PhoneFloat } from '../components/float_icons.jsx';
import Footer from '../sections/footer.jsx';  
import Stats from '../sections/stats.jsx'; 
import ContactBanner from '../sections/contact_banner.jsx';
import HeroVideo from '../sections/hero_video.jsx';
import Placements from '../sections/placements.jsx';
import Feedback from '../sections/feedback.jsx';
import Classrooms from '../sections/classrooms.jsx';
import Projects from '../sections/projects.jsx';
import Branches from '../sections/branches.jsx';
import { usePopup } from '../hooks/usePopup.js';
import LeadForm from "../components/lead_form"; 
import Courses from '../sections/courses_enroll.jsx';
import { ToastMessagePlacements } from '../sections/notice_boards.jsx';

export default function HomePage() {
  const page = "Home Page";
  const { popup, openPopup, closePopup } = usePopup();
  useEffect(()=>{openPopup(true);},[])
  
  return (  
    <>    
      <ToastMessagePlacements message="100% Placement Support" actionText="Enroll now" openPopup={openPopup} page={page}/>
      <HeroVideo />
      <Stats page={page} openPopup={openPopup}/>
      <Courses page={page} openPopup={openPopup}/>
      <Placements />  
      <Feedback  /> 
      <Classrooms /> 
      <Projects page={page} openPopup={openPopup}/> 
      <Branches /> 
      <ContactBanner page={page} openPopup={openPopup}/>
      <WhatsappFloat />
      <PhoneFloat />
      
      {popup && (
        <LeadForm isPopup={true} config={popup} onClose={closePopup} page={page}/>
      )}
      
    </>
  );
}