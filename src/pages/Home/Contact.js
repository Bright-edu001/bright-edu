import React from "react";
import "./Contact.css";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import ApplicationForm from "../../components/Application/ApplicationForm";

function Contact() {
  return (
    <div className="contact-page">
      <MbaAreasHero />
      <div className="empty"></div>
      <ApplicationForm showCondition={false} />
    </div>
  );
}

export default Contact;
