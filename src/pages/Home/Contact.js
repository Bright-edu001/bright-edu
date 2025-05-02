import React from "react";
import "./Contact.css";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import ApplicationForm from "../../components/Application/ApplicationForm";

function Contact() {
  return (
    <div className="contact-page">
      <ImageTextSection
        title="聯絡表單"
        imageUrl="/media/MBA_Programs/college-dmission-bro.png"
        imageAlt="聯繫我們"
      />
      <div className="empty"></div>
      <ApplicationForm showCondition={false} />
    </div>
  );
}

export default Contact;
