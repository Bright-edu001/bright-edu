import React from "react";
import "./Contact.css";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import ApplicationForm from "../../components/Application/ApplicationForm";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

function Contact() {
  return (
    <div className="contact-page">
      <MbaAreasHero />
      <SectionContainer>
        <div className="empty"></div>
        <ApplicationForm showCondition={false} />
      </SectionContainer>
    </div>
  );
}

export default Contact;
