import React from "react";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import ApplicationForm from "../../components/Application/ApplicationForm";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

function Contact() {
  return (
    <div className="contact-page">
      <MbaAreasHero />
      <SectionContainer>
        <ApplicationForm showCondition={false} />
      </SectionContainer>
    </div>
  );
}

export default Contact;
