import React from "react";
import ApplicationForm from "../../components/Application/ApplicationForm";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

function Contact() {
  return (
    <div className="contact-page">
      <SectionContainer>
        <ApplicationForm showCondition={false} />
      </SectionContainer>
    </div>
  );
}

export default Contact;
